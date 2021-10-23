/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import commonStyles from './styles/Common.js';
import elementStyles from './styles/ApiPayload.js';
import { 
  ApiDocumentationBase,
  evaluateExamples,
  examplesTemplate,
  examplesValue,
} from './ApiDocumentationBase.js';
import { Events } from '../events/Events.js';
import '../../define/api-schema-document.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('../helpers/api').ApiPayload} ApiPayload */
/** @typedef {import('../helpers/api').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('../helpers/api').ApiExample} ApiExample */
/** @typedef {import('../types').SchemaExample} SchemaExample */

export const queryPayload = Symbol('queryPayload');
export const queryExamples = Symbol('queryExamples');
export const payloadValue = Symbol('payloadValue');
export const processPayload = Symbol('processPayload');
export const mediaTypeTemplate = Symbol('mediaTypeTemplate');
export const nameTemplate = Symbol('nameTemplate');
export const schemaTemplate = Symbol('schemaTemplate');

export default class ApiPayloadDocumentElement extends ApiDocumentationBase {
  get styles() {
    return [commonStyles, elementStyles];
  }

  /**
   * @returns {ApiPayload}
   */
  get payload() {
    return this[payloadValue];
  }

  /**
   * @param {ApiPayload} value
   */
  set payload(value) {
    const old = this[payloadValue];
    if (old === value) {
      return;
    }
    this[payloadValue] = value;
    this.processGraph();
  }

  constructor() {
    super();
    /**
     * @type {ApiPayload}
     */
    this[payloadValue] = undefined;
  }

  /**
   * Queries the graph store for the API Payload data.
   * @returns {Promise<void>}
   */
  async processGraph() {
    await this[queryPayload]();
    await this[processPayload]();
    await this.requestUpdate();
  }

  /**
   * Queries the store for the payload data, when needed.
   * @returns {Promise<void>}
   */
  async [queryPayload]() {
    const { domainId } = this;
    if (!domainId) {
      // this[requestValue] = undefined;
      return;
    }
    if (this[payloadValue] && this[payloadValue].id === domainId) {
      // in case the request model was provided via the property setter.
      return;
    }
    try {
      const info = await Events.Payload.get(this, domainId);
      this[payloadValue] = info;
    } catch (e) {
      this[payloadValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for API payload data: ${e.message}`, this.localName);
    }
  }

  async [processPayload]() {
    this[examplesValue] = undefined;
    const { payload } = this;
    if (!payload) {
      return;
    }
    const { mediaType='' } = payload;
    const { examples } = payload;
    if (Array.isArray(examples) && examples.length) {
      this[examplesValue] = this[evaluateExamples](examples, mediaType);
    }
  }

  render() {
    const { payload } = this;
    if (!payload) {
      return html``;
    }
    return html`
    <style>${this.styles}</style>
    ${this[nameTemplate]()}
    ${this[mediaTypeTemplate]()}
    ${this[examplesTemplate]()}
    ${this[schemaTemplate]()}
    `;
  }

  /**
   * @return {TemplateResult|string} The template for the payload mime type.
   */
  [mediaTypeTemplate]() {
    const { payload } = this;
    const { mediaType } = payload;
    if (!mediaType) {
      return '';
    }
    return html`
    <div class="media-type">
      <label>Media type:</label>
      <span>${mediaType}</span>
    </div>
    `;
  }

  /**
   * @return {TemplateResult|string} The template for the payload name
   */
  [nameTemplate]() {
    const { payload } = this;
    const { name } = payload;
    if (!name) {
      return '';
    }
    return html`
    <div class="payload-name text-selectable">${name}</div>
    `;
  }

  /**
   * @return {TemplateResult} The template for the payload's schema
   */
  [schemaTemplate]() {
    const { payload } = this;
    const { schema, mediaType } = payload;
    if (!schema) {
      return html`<div class="empty-info">Schema is not defined for this payload.</div>`;
    }
    return html`
    <api-schema-document class="schema-renderer" .schema="${schema}" .mimeType="${mediaType}" ?anypoint="${this.anypoint}" forceExamples schemaTitle></api-schema-document>
    `;
  }
}
