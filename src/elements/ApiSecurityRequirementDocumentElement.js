/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import { 
  ApiDocumentationBase,
  serializerValue,
} from './ApiDocumentationBase.js';
import elementStyles from './styles/ApiSecurityRequirement.js';
import '../../define/api-parametrized-security-scheme.js';

/** @typedef {import('../helpers/api').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('../helpers/amf').SecurityRequirement} SecurityRequirement */

export const securityRequirementValue = Symbol('securityRequirementValue');
export const findOperationSecurity = Symbol('findOperationSecurity');

export default class ApiSecurityRequirementDocumentElement extends ApiDocumentationBase {
  get styles() {
    return [elementStyles];
  }

  constructor() {
    super();
    /** @type {ApiSecurityRequirement} */
    this[securityRequirementValue] = undefined;
    /** @type {SecurityRequirement} */
    this.domainModel = undefined;
  }

  /**
   * @returns {ApiSecurityRequirement}
   */
  get securityRequirement() {
    return this[securityRequirementValue];
  }

  /**
   * @param {ApiSecurityRequirement} value
   */
  set securityRequirement(value) {
    const old = this[securityRequirementValue];
    if (old === value) {
      return;
    }
    this[securityRequirementValue] = value;
    this.processGraph();
  }

  /**
   * @returns {Promise<void>}
   */
  async processGraph() {
    const { domainModel, domainId } = this;
    let processModel = domainModel;
    if (!processModel && domainId) {
      if (!this[securityRequirementValue] || this[securityRequirementValue].id !== domainId) {
        processModel = this[findOperationSecurity](domainId);
      }
    }
    if (processModel) {
      this[securityRequirementValue] = this[serializerValue].securityRequirement(processModel);
    }
    await this.requestUpdate();
  }

  /**
   * @param {string} id
   * @returns {SecurityRequirement|undefined} 
   */
  [findOperationSecurity](id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const wa = this._computeApi(amf);
    if (!wa) {
      return undefined;
    }
    const endpoints = wa[this._getAmfKey(this.ns.aml.vocabularies.apiContract.endpoint)];
    if (!Array.isArray(endpoints)) {
      return undefined;
    }
    for (const endpoint of endpoints) {
      const operations = endpoint[this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation)];
      if (Array.isArray(operations)) {
        for (const operation of operations) {
          const securityList = operation[this._getAmfKey(this.ns.aml.vocabularies.security.security)];
          if (Array.isArray(securityList)) {
            for (const security of securityList) {
              if (security['@id'] === id) {
                return security;
              }
            }
          }
        }
      }
    }
    return undefined;
  }

  render() {
    const scheme = this[securityRequirementValue];
    if (!scheme || !scheme.schemes || !scheme.schemes.length) {
      return html``;
    }
    return html`
    <style>${this.styles}</style>
    <div class="security-requirements">
      ${scheme.schemes.map((item) => html`
        <api-parametrized-security-scheme 
          .amf="${this.amf}"
          .securityScheme="${item.scheme}" 
          .settings="${item.settings}"
          ?anypoint="${this.anypoint}"
          settingsOpened
        ></api-parametrized-security-scheme>`)}
    </div>
    `;
  }
}
