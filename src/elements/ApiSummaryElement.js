/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { MarkdownStyles } from '@advanced-rest-client/highlight';
import '@advanced-rest-client/highlight/arc-marked.js';
import { HttpStyles } from '@advanced-rest-client/app';
import elementStyles from './styles/ApiSummary.js';
import commonStyles from './styles/Common.js';
import { 
  ApiDocumentationBase, 
  descriptionTemplate, 
  processDebounce,
  // serializerValue,
} from './ApiDocumentationBase.js';
import { sanitizeHTML } from '../lib/Utils.js';
import * as UrlLib from '../lib/UrlUtils.js';
import { NavigationEvents } from '../events/NavigationEvents.js';
import { ApiEvents } from '../events/ApiEvents.js';
import { ReportingEvents } from '../events/ReportingEvents.js';
import { TelemetryEvents } from '../events/TelemetryEvents.js';
import { ServerEvents } from '../events/ServerEvents.js';
import { EndpointEvents } from '../events/EndpointEvents.js';
import { ns } from '../helpers/Namespace.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('../helpers/api').ApiDocumentation} ApiDocumentation */
/** @typedef {import('../helpers/amf').CreativeWork} CreativeWork */
/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../helpers/api').ApiServer} ApiServer */
/** @typedef {import('../helpers/amf').AsyncApi} AsyncApi */
/** @typedef {import('../helpers/amf').WebApi} WebApi */
/** @typedef {import('../helpers/amf').EndPoint} EndPoint */
/** @typedef {import('../types').SelectionType} SelectionType */
/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../types').ApiOperationListItem} ApiOperationListItem */

export const summaryValue = Symbol('summaryValue');
export const serversValue = Symbol('serversValue');
export const endpointsValue = Symbol('endpointsValue');
export const querySummary = Symbol('querySummary');
export const processSummary = Symbol('processSummary');
export const queryServers = Symbol('queryServers');
export const queryEndpoints = Symbol('queryEndpoints');
export const isAsyncValue = Symbol('isAsyncValue');
export const baseUriValue = Symbol('baseUriValue');
export const navigateHandler = Symbol('navigateHandler');
export const titleTemplate = Symbol('titleTemplate');
export const versionTemplate = Symbol('versionTemplate');
export const serversTemplate = Symbol('serversTemplate');
export const baseUriTemplate = Symbol('baseUriTemplate');
export const serverTemplate = Symbol('serverTemplate');
export const protocolsTemplate = Symbol('protocolsTemplate');
export const contactInfoTemplate = Symbol('contactInfoTemplate');
export const licenseTemplate = Symbol('licenseTemplate');
export const termsOfServiceTemplate = Symbol('termsOfServiceTemplate');
export const endpointsTemplate = Symbol('endpointsTemplate');
export const endpointTemplate = Symbol('endpointTemplate');
export const endpointPathTemplate = Symbol('endpointPathTemplate');
export const endpointNameTemplate = Symbol('endpointNameTemplate');
export const methodTemplate = Symbol('methodTemplate');

/**
 * A web component that renders the documentation page for an API documentation (like in RAML documentations) built from 
 * the AMF graph model.
 */
export default class ApiSummaryElement extends ApiDocumentationBase {
  get styles() {
    return [elementStyles, commonStyles, HttpStyles.default, MarkdownStyles];
  }

  /**
   * @returns {ApiSummary}
   * @readonly
   */
  get summary() {
    return this[summaryValue];
  }

  /**
   * @returns {ApiServer[]}
   * @readonly
   */
  get servers() {
    return this[serversValue];
  }

  static get properties() {
    return {
      /**
       * A property to set to override AMF's model base URI information.
       * When this property is set, the `endpointUri` property is recalculated.
       */
      baseUri: { type: String },
      /**
       * API title header level in value range from 1 to 6.
       * This is made for accessibility. It the component is used in a context
       * where headers order matters then this property is to be set to
       * arrange headers in the right order.
       *
       * @default 2
       */
      titleLevel: { type: Number },
      /**
       * A property to hide the table of contents list of endpoints.
       */
      hideToc: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.titleLevel = 2;
    /** @type {string[]} */
    this.protocols = undefined;
    /** @type {boolean} */
    this.hideToc = undefined;
    /** @type {string} */
    this.baseUri = undefined;
    /** @type {ApiSummary} */
    this[summaryValue] = undefined;
    /** @type {ApiServer[]} */
    this[serversValue] = undefined;
    /** @type {ApiEndPointWithOperationsListItem[]} */
    this[endpointsValue] = undefined;
    /** @type {boolean} */
    this[isAsyncValue] = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this[processDebounce]();
  }

  /**
   * Queries the graph store for the API data.
   * @returns {Promise<void>}
   */
  async processGraph() {
    await this[querySummary]();
    await this[queryServers]();
    await this[queryEndpoints]();
    await this[processSummary]();
    this.requestUpdate();
  }

  /**
   * Queries the API store for the API summary object.
   */
  async [querySummary]() {
    this[summaryValue] = undefined;
    try {
      const info = await ApiEvents.summary(this);
      this[summaryValue] = info;
    } catch (e) {
      TelemetryEvents.exception(this, e.message, false);
      ReportingEvents.error(this, e, `Unable to query for API summary data: ${e.message}`, this.localName);
    }
  }

  /**
   * Queries the API store for the API summary object.
   */
  async [queryServers]() {
    this[serversValue] = undefined;
    try {
      const info = await ServerEvents.query(this);
      this[serversValue] = info;
    } catch (e) {
      TelemetryEvents.exception(this, e.message, false);
      ReportingEvents.error(this, e, `Unable to query for API servers: ${e.message}`, this.localName);
    }
  }

  /**
   * Logic executed after the summary is requested from the store.
   */
  async [processSummary]() {
    this[isAsyncValue] = undefined;
    const { summary } = this;
    if (!summary) {
      return;
    }
    this[isAsyncValue] = summary.types.includes(ns.aml.vocabularies.apiContract.AsyncAPI);
  }

  /**
   * Queries the API endpoints and methods.
   */
  async [queryEndpoints]() {
    this[endpointsValue] = undefined;
    try {
      const info = await EndpointEvents.list(this);
      this[endpointsValue] = info;
    } catch (e) {
      TelemetryEvents.exception(this, e.message, false);
      ReportingEvents.error(this, e, `Unable to query for API endpoints: ${e.message}`, this.localName);
    }
  }

  /**
   * @param {Event} e
   */
  [navigateHandler](e) {
    e.preventDefault();
    const target = /** @type HTMLElement */ (e.composedPath()[0]);
    const data = target.dataset;
    if (!data.id || !data.shapeType) {
      return;
    }
    NavigationEvents.apiNavigate(this, data.id, /** @type SelectionType */ (data.shapeType), data.parent);
  }

  render() {
    const { summary } = this;
    if (!summary) {
      return html``;
    }
    return html`
    <style>${this.styles}</style>
    ${this[titleTemplate]()}
    ${this[versionTemplate]()}
    ${this[descriptionTemplate](summary.description)}
    ${this[serversTemplate]()}
    ${this[protocolsTemplate]()}
    ${this[contactInfoTemplate]()}
    ${this[licenseTemplate]()}
    ${this[termsOfServiceTemplate]()}
    ${this[endpointsTemplate]()}
    `;
  }

  /**
   * @returns {TemplateResult|string} 
   */
  [titleTemplate]() {
    const { summary, titleLevel } = this;
    if (!summary || !summary.name) {
      return '';
    }
    return html`
    <div class="api-title" role="heading" aria-level="${titleLevel}" part="api-title">
      <label part="api-title-label">API title:</label>
      <span class="text-selectable">${summary.name}</span>
    </div>`;
  }

  /**
   * @returns {TemplateResult|string} 
   */
  [versionTemplate]() {
    const { summary } = this;
    if (!summary || !summary.version) {
      return '';
    }
    return html`
    <p class="inline-description version" part="api-version">
      <label>Version:</label>
      <span class="text-selectable">${summary.version}</span>
    </p>`;
  }

  /**
   * @return {TemplateResult|String} A template for a server, servers, or no servers
   * whether it's defined in the main API definition or not.
   */
  [serversTemplate]() {
    const { servers, baseUri } = this;
    if (baseUri) {
      return this[baseUriTemplate](undefined);
    }
    if (!servers || !servers.length) {
      return '';
    }
    if (servers.length === 1) {
      return this[baseUriTemplate](servers[0]);
    }
    return html`
    <div class="servers" slot="markdown-html">
      <p class="servers-label">API servers</p>
      <ul class="server-lists">
        ${servers.map((server) => this[serverTemplate](server))}
      </ul>
    </div>`;
  }

  /**
   * @param {ApiServer} server Server definition
   * @return {TemplateResult} A template for a single server in the main API definition
   */
  [baseUriTemplate](server) {
    const { baseUri, protocols } = this;
    const uri = UrlLib.computeApiBaseUri({ baseUri, server, protocols, });
    return html`
    <div class="endpoint-url">
      <div class="url-value">${uri}</div>
    </div>
    `;
  }

  /**
   * @param {ApiServer} server Server definition
   * @return {TemplateResult} Template for a server list items when there is more
   * than one server.
   */
  [serverTemplate](server) {
    const { baseUri, protocols } = this;
    const uri = UrlLib.computeApiBaseUri({ baseUri, server, protocols, });
    const { description } = server;
    return html`
    <li class="text-selectable">
      ${uri}
      ${description ? html`<arc-marked .markdown=${description} class="server-description"></arc-marked>` : ''}
    </li>`;
  }

  /**
   * @return {TemplateResult|String}
   */
  [protocolsTemplate]() {
    const { summary } = this;
    if (!summary || !summary.schemes || !summary.schemes.length) {
      return '';
    }
    const result = summary.schemes.map((item) => html`<span class="chip text-selectable">${item}</span>`);

    return html`
    <label class="section">Supported protocols</label>
    <div class="protocol-chips">${result}</div>`;
  }

  [contactInfoTemplate]() {
    const { summary } = this;
    if (!summary || !summary.provider || !summary.provider.name) {
      return '';
    }
    const { name='', email, url } = summary.provider;
    const link = url ? sanitizeHTML(
      `<a href="${url}" target="_blank" class="app-link provider-url text-selectable">${url}</a>`,
    ) : '';
    return html`
    <section role="contentinfo" class="docs-section" part="info-section">
      <label class="section">Contact information</label>
      <p class="inline-description" part="info-inline-desc">
        <span class="provider-name text-selectable">${name}</span>
        ${email ? html`<a class="app-link link-padding provider-email text-selectable" href="mailto:${email}">${email}</a>` : ''}
      </p>
      ${url ? html` <p class="inline-description text-selectable" part="info-inline-desc">${unsafeHTML(link)}</p>` : ''}
    </section>`;
  }

  [licenseTemplate]() {
    const { summary } = this;
    if (!summary || !summary.license) {
      return '';
    }
    const { url, name } = summary.license;
    if (!url || !name) {
      return '';
    }
    const link = sanitizeHTML(
      `<a href="${url}" target="_blank" class="app-link text-selectable">${name}</a>`,
    );
    return html`
    <section aria-labelledby="licenseLabel" class="docs-section" part="license-section">
      <label class="section" id="licenseLabel">License</label>
      <p class="inline-description">
        ${unsafeHTML(link)}
      </p>
    </section>`;
  }

  [termsOfServiceTemplate]() {
    const { summary } = this;
    if (!summary || !summary.termsOfService || !summary.termsOfService.length) {
      return '';
    }
    return html`
    <section aria-labelledby="tocLabel" class="docs-section">
      <label class="section" id="tocLabel">Terms of service</label>
      <arc-marked .markdown="${summary.termsOfService}" sanitize>
        <div slot="markdown-html" class="markdown-body text-selectable"></div>
      </arc-marked>
    </section>`;
  }

  [endpointsTemplate]() {
    if (this.hideToc) {
      return '';
    }
    const endpoints = /** @type {ApiEndPointWithOperationsListItem[]} */ (this[endpointsValue]);
    if (!endpoints || !endpoints.length) {
      return '';
    }
    const result = endpoints.map((item) => this[endpointTemplate](item));
    const pathLabel = this[isAsyncValue] ? 'channels' : 'endpoints';
    return html`
    <div class="separator" part="separator"></div>
    <div class="toc" part="toc">
      <label class="section endpoints-title">API ${pathLabel}</label>
      ${result}
    </div>
    `;
  }

  /**
   * @param {ApiEndPointWithOperationsListItem} item
   * @returns {TemplateResult} 
   */
  [endpointTemplate](item) {
    const { operations=[] } = item;
    const ops = operations.length ? operations.map((op) => this[methodTemplate](op, item)) : '';
    return html`
    <div class="endpoint-item" @click="${this[navigateHandler]}" @keydown="${() => {}}">
      ${item.name ? this[endpointNameTemplate](item) : this[endpointPathTemplate](item)}
      <div class="endpoint-header">
        ${ops}
      </div>
    </div>`;
  }

  /**
   * @param {ApiEndPointWithOperationsListItem} item
   * @returns {TemplateResult} 
   */
  [endpointPathTemplate](item) {
    return html`
    <a
      class="endpoint-path text-selectable"
      href="#${item.path}"
      data-id="${item.id}"
      data-shape-type="resource"
      title="Open endpoint documentation">${item.path}</a>
    `;
  }

  /**
   * @param {ApiEndPointWithOperationsListItem} item
   * @returns {TemplateResult|string} 
   */
  [endpointNameTemplate](item) {
    if (!item.name) {
      return '';
    }
    return html`
    <a
      class="endpoint-path text-selectable"
      href="#${item.path}"
      data-id="${item.id}"
      data-shape-type="resource"
      title="Open endpoint documentation">${item.name}</a>
    <p class="endpoint-path-name">${item.path}</p>
    `;
  }

  /**
   * @param {ApiOperationListItem} item
   * @param {ApiEndPointWithOperationsListItem} endpoint
   * @returns {TemplateResult} 
   */
  [methodTemplate](item, endpoint) {
    return html`
      <a
        href="#${`${endpoint.path}/${item.method}`}"
        class="method-label"
        data-method="${item.method}"
        data-id="${item.id}"
        data-shape-type="operation"
        data-parent="${endpoint.id}"
        title="Open method documentation">${item.method}</a>
    `;
  }
}
