/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import { MarkdownStyles } from '@advanced-rest-client/highlight';
import { HttpStyles } from '@advanced-rest-client/app';
import elementStyles from './styles/ApiDocumentationDocument.js';
import commonStyles from './styles/Common.js';
import { ApiDocumentationBase, descriptionTemplate } from './ApiDocumentationBase.js';
import { Events } from '../events/Events.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('../helpers/api').ApiDocumentation} ApiDocumentation */

export const documentationValue = Symbol('documentationValue');
export const titleTemplate = Symbol('titleTemplate');
export const queryDocument = Symbol('queryDocument');

/**
 * A web component that renders the documentation page for an API documentation (like in RAML documentations) built from 
 * the AMF graph model.
 */
export default class ApiDocumentationDocumentElement extends ApiDocumentationBase {
  get styles() {
    return [elementStyles, commonStyles, HttpStyles.default, MarkdownStyles];
  }

  /**
   * @returns {ApiDocumentation|undefined} The serialized to a JS object graph model
   */
  get documentation() {
    return this[documentationValue];
  }

  /**
   * @param {ApiDocumentation} value The serialized to a JS object graph model
   */
  set documentation(value) {
    const old = this[documentationValue];
    if (old === value) {
      return;
    }
    this[documentationValue] = value;
    this.processGraph();
  }

  constructor() {
    super();
    /** @type {ApiDocumentation} */
    this[documentationValue] = undefined;
  }

  /**
   * Queries the graph store for the API Documentation data.
   * @returns {Promise<void>}
   */
  async processGraph() {
    await this[queryDocument]();
    await this.requestUpdate();
  }

  /**
   * Queries for the documentation model.
   * @returns {Promise<void>} 
   */
  async [queryDocument]() {
    const { domainId } = this;
    if (!domainId) {
      return;
    }
    if (this[documentationValue] && this[documentationValue].id === domainId) {
      // in case it was set by the parent via the property
      return;
    }
    try {
      const info = await Events.Documentation.get(this, domainId);
      this[documentationValue] = info;
    } catch (e) {
      this[documentationValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for API documentation data: ${e.message}`, this.localName);
    }
  }

  render() {
    if (!this[documentationValue]) {
      return html``;
    }
    return html`
    <style>${this.styles}</style>
    ${this[titleTemplate]()}
    ${this[descriptionTemplate](this[documentationValue].description)}
    `;
  }

  /**
   * @returns {TemplateResult|string} The template for the Documentation title.
   */
  [titleTemplate]() {
    const docs = this[documentationValue];
    const { title } = docs;
    if (!title) {
      return '';
    }
    return html`
    <div class="documentation-header">
      <div class="documentation-title">
        <span class="label text-selectable">${title}</span>
      </div>
    </div>
    `;
  }
}
