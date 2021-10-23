/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import { 
  ApiDocumentationBase,
} from './ApiDocumentationBase.js';
import { Events } from '../events/Events.js';
import elementStyles from './styles/ApiSecurityRequirement.js';
import '../../define/api-parametrized-security-scheme.js';

/** @typedef {import('../helpers/api').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('../helpers/amf').SecurityRequirement} SecurityRequirement */

export const securityRequirementValue = Symbol('securityRequirementValue');
export const querySecurity = Symbol('querySecurity');

export default class ApiSecurityRequirementDocumentElement extends ApiDocumentationBase {
  get styles() {
    return [elementStyles];
  }

  constructor() {
    super();
    /** @type {ApiSecurityRequirement} */
    this[securityRequirementValue] = undefined;
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
    await this[querySecurity]();
    this.requestUpdate();
  }

  /**
   * Queries for the security requirements object.
   */
  async [querySecurity]() {
    const { domainId } = this;
    if (!domainId) {
      // this[securityValue] = undefined;
      return;
    }
    if (this[securityRequirementValue] && this[securityRequirementValue].id === domainId) {
      // in case the security model was provided via the property setter.
      return;
    }
    try {
      const info = await Events.Security.getRequirement(this, domainId);
      this[securityRequirementValue] = info;
    } catch (e) {
      this[securityRequirementValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for API operation data: ${e.message}`, this.localName);
    }
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
          .securityScheme="${item.scheme}" 
          .settings="${item.settings}"
          ?anypoint="${this.anypoint}"
          settingsOpened
        ></api-parametrized-security-scheme>`)}
    </div>
    `;
  }
}
