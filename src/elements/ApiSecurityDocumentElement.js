/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import { MarkdownStyles } from '@advanced-rest-client/highlight';
import '@advanced-rest-client/highlight/arc-marked.js';
import '@anypoint-web-components/awc/anypoint-tab.js';
import '@anypoint-web-components/awc/anypoint-tabs.js';
import { ns } from '../helpers/Namespace.js';
import { 
  ApiDocumentationBase, 
  paramsSectionTemplate, 
  schemaItemTemplate,
  descriptionTemplate,
} from './ApiDocumentationBase.js';
import { Events } from '../events/Events.js';
import commonStyles from './styles/Common.js';
import elementStyles from './styles/ApiSecurityDocument.js';
import schemaStyles from './styles/SchemaCommon.js';
import '../../define/api-parameter-document.js';
import '../../define/api-response-document.js'

/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('../helpers/api').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('../helpers/api').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('../helpers/api').ApiSecurityApiKeySettings} ApiSecurityApiKeySettings */
/** @typedef {import('../helpers/api').ApiSecurityOpenIdConnectSettings} ApiSecurityOpenIdConnectSettings */
/** @typedef {import('../helpers/api').ApiSecurityOAuth2Settings} ApiSecurityOAuth2Settings */
/** @typedef {import('../helpers/api').ApiSecurityOAuth1Settings} ApiSecurityOAuth1Settings */
/** @typedef {import('../helpers/api').ApiSecurityOAuth2Flow} ApiSecurityOAuth2Flow */
/** @typedef {import('../helpers/api').ApiSecurityScope} ApiSecurityScope */
/** @typedef {import('../helpers/api').ApiResponse} ApiResponse */
/** @typedef {import('../helpers/amf').DomainElement} DomainElement */
/** @typedef {import('../helpers/amf').SecurityRequirement} SecurityRequirement */
/** @typedef {import('@anypoint-web-components/awc').AnypointTabsElement} AnypointTabs */

export const querySecurity = Symbol('querySecurity');
export const processSecurity = Symbol('processSecurity');
export const securityValue = Symbol('securityValue');
export const titleTemplate = Symbol('titleTemplate');
export const queryParamsTemplate = Symbol('queryParamsTemplate');
export const headersTemplate = Symbol('headersTemplate');
export const responsesValue = Symbol('responsesValue');
export const preselectResponse = Symbol('preselectResponse');
export const responseContentTemplate = Symbol('responseContentTemplate');
export const responseTabsTemplate = Symbol('responseTabsTemplate');
export const responseTemplate = Symbol('responseTemplate');
export const statusCodeHandler = Symbol('statusCodeHandler');
export const settingsTemplate = Symbol('settingsTemplate');
export const apiKeySettingsTemplate = Symbol('apiKeySettingsTemplate');
export const openIdConnectSettingsTemplate = Symbol('openIdConnectSettingsTemplate');
export const oAuth2SettingsTemplate = Symbol('oAuth2SettingsTemplate');
export const apiKeyHeaderExample = Symbol('apiKeyHeaderExample');
export const apiKeyCookieExample = Symbol('apiKeyCookieExample');
export const apiKeyQueryExample = Symbol('apiKeyQueryExample');
export const exampleTemplate = Symbol('exampleTemplate');
export const oAuth2FlowsTemplate = Symbol('oAuth2FlowsTemplate');
export const oAuth2GrantsTemplate = Symbol('oAuth2GrantsTemplate');
export const oAuth2FlowTemplate = Symbol('oAuth2FlowTemplate');
export const getLabelForGrant = Symbol('getLabelForGrant');
export const accessTokenUriTemplate = Symbol('accessTokenUriTemplate');
export const authorizationUriTemplate = Symbol('authorizationUriTemplate');
export const refreshUriTemplate = Symbol('refreshUriTemplate');
export const scopesTemplate = Symbol('scopesTemplate');
export const scopeTemplate = Symbol('scopeTemplate');
export const grantTitleTemplate = Symbol('grantTitleTemplate');
export const oAuth1SettingsTemplate = Symbol('oAuth1SettingsTemplate');
export const tokenCredentialsUriTemplate = Symbol('tokenCredentialsUriTemplate');
export const signaturesTemplate = Symbol('signaturesTemplate');

/**
 * A web component that renders the documentation page for an API response object.
 */
export default class ApiSecurityDocumentElement extends ApiDocumentationBase {
  get styles() {
    return [commonStyles, elementStyles, MarkdownStyles, schemaStyles];
  }

  static get properties() {
    return {
      /** 
       * When set it opens the parameters section
       */
      parametersOpened: { type: Boolean, reflect: true },
      /** 
       * When set it opens the headers section
       */
      headersOpened: { type: Boolean, reflect: true },
      /** 
       * When set it opens the response section
       */
      responsesOpened: { type: Boolean, reflect: true },
      /** 
       * When set it opens the settings section
       */
      settingsOpened: { type: Boolean, reflect: true },
      /** 
       * The selected status code in the responses section.
       */
      selectedStatus: { type: String },
    };
  }

  /** 
   * @returns {ApiSecurityScheme|undefined}
   */
  get securityScheme() {
    return this[securityValue];
  }

  /** 
   * @param {ApiSecurityScheme} value
   */
  set securityScheme(value) {
    const old = this[securityValue];
    if (old === value) {
      return;
    }
    this[securityValue] = value;
    this[processSecurity]();
    this.requestUpdate();
  }

  constructor() {
    super();
    /**
     * @type {ApiSecurityScheme}
     */
    this[securityValue] = undefined;
    /**
     * @type {ApiResponse[]}
     */
    this[responsesValue] = undefined;
    /**
     * @type {string}
     */
    this.selectedStatus = undefined;

    this.headersOpened = false;
    this.parametersOpened = false;
    this.settingsOpened = false;
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
    if (this[securityValue] && this[securityValue].id === domainId) {
      // in case the security model was provided via the property setter.
      return;
    }
    try {
      const info = await Events.Security.get(this, domainId);
      this[securityValue] = info;
    } catch (e) {
      this[securityValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for API operation data: ${e.message}`, this.localName);
    }
  }

  async [processSecurity]() {
    const scheme = this[securityValue];
    if (!scheme) {
      this[responsesValue] = undefined;
      return;
    }
    const { responses=[] } = scheme;
    this[responsesValue] = responses;
    this[preselectResponse]();
  }

  /**
   * Updates the `selectedStatus` if not selected or the current selection doesn't 
   * exists in the current list of responses.
   */
  [preselectResponse]() {
    const responses = this[responsesValue];
    if (!Array.isArray(responses) || !responses.length) {
      return;
    }
    const { selectedStatus } = this;
    if (!selectedStatus) {
      this.selectedStatus = responses[0].statusCode;
      return;
    }
    const selected = responses.find((item) => item.statusCode === selectedStatus);
    if (selected) {
      return;
    }
    this.selectedStatus = responses[0].statusCode;
  }

  /**
   * A handler for the status code tab selection.
   * @param {Event} e
   */
  [statusCodeHandler](e) {
    const tabs = /** @type AnypointTabs */ (e.target);
    this.selectedStatus = String(tabs.selected);
  }

  /**
   * @param {string} grant The oauth2 grant (flow) name
   * @returns {string} Friendly name for the grant.
   */
  [getLabelForGrant](grant) {
    switch (grant) {
      case "implicit":
        return "Implicit";
      case "authorization_code":
      case "authorizationCode":
        return "Authorization code";
      case "password":
        return "Password";
      case "client_credentials":
      case "clientCredentials":
        return "Client credentials";
      default:
        return grant;
    }
  }

  render() {
    const scheme = this[securityValue];
    if (!scheme) {
      return html``;
    }
    return html`
    <style>${this.styles}</style>
    ${this[titleTemplate]()}
    ${this[descriptionTemplate](scheme.description)}
    ${this[queryParamsTemplate]()}
    ${this[headersTemplate]()}
    ${this[responseTemplate]()}
    ${this[settingsTemplate]()}
    `;
  }

  [titleTemplate]() {
    const scheme = this[securityValue];
    const { name, type, displayName } = scheme;
    const title = displayName || name;
    return html`
    <div class="security-header">
      <div class="security-title">
        <span class="label text-selectable">${title}</span>
      </div>
      <p class="sub-header text-selectable">${type}</p>
    </div>
    `;
  }

  /**
   * @return {TemplateResult|string} The template for the query parameters
   */
  [queryParamsTemplate]() {
    const scheme = this[securityValue];
    if (!Array.isArray(scheme.queryParameters) || !scheme.queryParameters.length) {
      return '';
    }
    const content = scheme.queryParameters.map((param) => this[schemaItemTemplate](param, 'query'));
    return this[paramsSectionTemplate]('Parameters', 'parametersOpened', content);
  }

  /**
   * @return {TemplateResult|string} The template for the headers
   */
  [headersTemplate]() {
    const scheme = this[securityValue];
    if (!Array.isArray(scheme.headers) || !scheme.headers.length) {
      return '';
    }
    const content = scheme.headers.map((param) => this[schemaItemTemplate](param, 'header'));
    return this[paramsSectionTemplate]('Headers', 'headersOpened', content);
  }

  [responseTemplate]() {
    const responses = this[responsesValue];
    if (!Array.isArray(responses) || !responses.length) {
      return '';
    }
    const content = html`
    ${this[responseTabsTemplate](responses)}
    ${this[responseContentTemplate](responses)}
    `;
    return this[paramsSectionTemplate]('Responses', 'responsesOpened', content);
  }

  /**
   * @param {ApiResponse[]} responses The responses to render.
   * @returns {TemplateResult} The template for the responses selector.
   */
  [responseTabsTemplate](responses) {
    const { selectedStatus, anypoint } = this;
    const filtered = responses.filter((item) => !!item.statusCode);
    return html`
    <div class="status-codes-selector">
      <anypoint-tabs
        scrollable
        .selected="${selectedStatus}"
        attrForSelected="data-status"
        @selected="${this[statusCodeHandler]}"
        ?anypoint="${anypoint}"
      >
        ${filtered.map((item) => html`<anypoint-tab data-status="${item.statusCode}" ?anypoint="${anypoint}">${item.statusCode}</anypoint-tab>`)}
      </anypoint-tabs>
      <div class="codes-selector-divider"></div>
    </div>
    `;
  }

  /**
   * @param {ApiResponse[]} responses The responses to render.
   * @returns {TemplateResult} The template for the currently selected response.
   */
  [responseContentTemplate](responses) {
    const { selectedStatus } = this;
    const response = responses.find((item) => item.statusCode === selectedStatus);
    if (!response) {
      return html`<div class="empty-info text-selectable">Select a response to render the documentation.</div>`;
    }
    return html`
    <api-response-document .response="${response}" ?anypoint="${this.anypoint}" headersOpened payloadOpened></api-response-document>
    `;
  }

  /**
   * @returns {TemplateResult|string} The template for the security settings, when required.
   */
  [settingsTemplate]() {
    const scheme = this[securityValue];
    const { settings } = scheme;
    if (!settings) {
      return '';
    }
    const { types } = settings;
    if (types.includes(ns.aml.vocabularies.security.ApiKeySettings)) {
      return this[apiKeySettingsTemplate](settings);
    }
    if (types.includes(ns.aml.vocabularies.security.OpenIdConnectSettings)) {
      return this[openIdConnectSettingsTemplate](settings);
    }
    if (types.includes(ns.aml.vocabularies.security.OAuth2Settings)) {
      return this[oAuth2SettingsTemplate](/** @type ApiSecurityOAuth2Settings */ (settings));
    }
    if (types.includes(ns.aml.vocabularies.security.OAuth1Settings)) {
      return this[oAuth1SettingsTemplate](/** @type ApiSecurityOAuth1Settings */ (settings));
    }
    return '';
  }

  /**
   * @param {ApiSecurityApiKeySettings} settings
   * @returns {TemplateResult} The template for API Key security definition.
   */
  [apiKeySettingsTemplate](settings) {
    const { in: paramLocation='Unknown', name } = settings;
    const content = html`
    <div class="param-info">
      <div class="location text-selectable">Location: ${paramLocation}</div>
      ${name ? html`<div class="label text-selectable">Parameter: ${name}</div>` : ''}
    </div>
    ${paramLocation === 'header' ? this[apiKeyHeaderExample](name) : ''}
    ${paramLocation === 'cookie' ? this[apiKeyCookieExample](name) : ''}
    ${paramLocation === 'query' ? this[apiKeyQueryExample](name) : ''}
    `;
    return this[paramsSectionTemplate]('Settings', 'settingsOpened', content);
  }

  /**
   * @param {string} name The name of the API Key parameter
   * @returns {TemplateResult} The template for API Key header example
   */
  [apiKeyHeaderExample](name) {
    const value = `${name}: abcdef12345`;
    return this[exampleTemplate](value);
  }

  /**
   * @param {string} name The name of the API Key parameter
   * @returns {TemplateResult} The template for API Key cookie example
   */
  [apiKeyCookieExample](name) {
    const value = `Cookie: ${name}=abcdef12345`;
    return this[exampleTemplate](value);
  }

  /**
   * @param {string} name The name of the API Key parameter
   * @returns {TemplateResult} The template for API Key query parameter example
   */
  [apiKeyQueryExample](name) {
    const value = `GET /api?${name}=abcdef12345`;
    return this[exampleTemplate](value);
  }

  /**
   * @param {string} value
   * @returns {TemplateResult} The template for a single example
   */
  [exampleTemplate](value) {
    return html`
    <details class="schema-example" open>
      <summary>Example</summary>
      <div class="example-content">
        <pre class="code-value text-selectable"><code>${value}</code></pre>
      </div>
    </details>
    `;
  }

  /**
   * @param {ApiSecurityOpenIdConnectSettings} settings
   * @returns {TemplateResult|string} The template for API Key security definition.
   */
  [openIdConnectSettingsTemplate](settings) {
    const { url } = settings;
    if (!url) {
      return '';
    }
    const content = html`
    <div class="param-info">
      <div class="location">OpenID Connect Discovery URL</div>
      <div class="example-content">
        <pre class="code-value text-selectable"><code>${url}</code></pre>
      </div>
    </div>
    `;
    return this[paramsSectionTemplate]('Settings', 'settingsOpened', content);
  }

  /**
   * @param {ApiSecurityOAuth2Settings} settings
   * @returns {TemplateResult|string} The template for OAuth 2 security definition.
   */
  [oAuth2SettingsTemplate](settings) {
    const { authorizationGrants=[], flows=[] } = settings;
    if (!authorizationGrants.length && !flows.length) {
      return '';
    }
    const content = [];
    const grants = this[oAuth2GrantsTemplate](authorizationGrants);
    const flowsContent = this[oAuth2FlowsTemplate](flows);
    if (grants) {
      content.push(/** @type TemplateResult */(grants));
    }
    if (flowsContent) {
      content.push(/** @type TemplateResult */(flowsContent));
    }
    return this[paramsSectionTemplate]('Settings', 'settingsOpened', content);
  }

  /**
   * @param {string[]} grants
   * @returns {TemplateResult|string} The template for OAuth 2 flows list.
   */
  [oAuth2GrantsTemplate](grants) {
    if (!grants.length) {
      return '';
    }
    return html`
    <h4 data-type="authorization-grants" class="value-title">Authorization grants</h4>
    <ul>
    ${grants.map(grant => html`<li data-type="authorization-grant" class="settings-list-value">${grant}</li>`)}
    </ul>
    `;
  }

  /**
   * @param {ApiSecurityOAuth2Flow[]} flows
   * @returns {TemplateResult|string} The template for OAuth 2 flows list.
   */
  [oAuth2FlowsTemplate](flows) {
    if (!flows.length) {
      return '';
    }
    return html`
    ${flows.map((flow) => this[oAuth2FlowTemplate](flow))}
    `;
  }

  /**
   * @param {ApiSecurityOAuth2Flow} flow
   * @returns {TemplateResult} The template for an OAuth 2 flow.
   */
  [oAuth2FlowTemplate](flow) {
    const { scopes, accessTokenUri, authorizationUri, refreshUri, flow: grant } = flow;
    return html`
    <div class="flow-description">
      ${this[grantTitleTemplate](grant)}
      ${this[accessTokenUriTemplate](accessTokenUri)}
      ${this[authorizationUriTemplate](authorizationUri)}
      ${this[refreshUriTemplate](refreshUri)}
      ${this[scopesTemplate](scopes)}
    </div>
    `;
  }

  /**
   * @param {string} grant The grant name
   * @returns {TemplateResult|string} The template for OAuth 2 grant title.
   */
  [grantTitleTemplate](grant) {
    if (!grant) {
      return '';
    }
    return html`
    <div>
      <h4 class="grant-title">${this[getLabelForGrant](grant)}</h4>
    </div>`;
  }

  /**
   * @param {string} uri The access token URI
   * @returns {TemplateResult|string} The template for the access token URI
   */
  [accessTokenUriTemplate](uri) {
    if (!uri) {
      return '';
    }
    return html`
    <div class="flow-section">
      <h5 data-type="token-uri" class="value-title">Access token URI</h5>
      <div class="example-content">
        <pre class="code-value text-selectable"><code>${uri}</code></pre>
      </div>
    </div>`;
  }

  /**
   * @param {string} uri The access token URI
   * @returns {TemplateResult|string} The template for the authorization endpoint URI
   */
  [authorizationUriTemplate](uri) {
    if (!uri) {
      return '';
    }
    return html`
    <div class="flow-section">
      <h5 data-type="authorization-uri" class="value-title">Authorization URI</h5>
      <div class="example-content">
        <pre class="code-value text-selectable"><code>${uri}</code></pre>
      </div>
    </div>`;
  }

  /**
   * @param {string} uri The access token URI
   * @returns {TemplateResult|string} The template for the refresh token endpoint URI
   */
  [refreshUriTemplate](uri) {
    if (!uri) {
      return '';
    }
    return html`
    <div class="flow-section">
      <h5 data-type="refresh-uri" class="value-title">Token refresh URI</h5>
      <div class="example-content">
        <pre class="code-value text-selectable"><code>${uri}</code></pre>
      </div>
    </div>`;
  }

  /**
   * @param {ApiSecurityScope[]} scopes The oauth scopes
   * @returns {TemplateResult|string} The template for the scopes list
   */
  [scopesTemplate](scopes) {
    if (!Array.isArray(scopes) || !scopes.length) {
      return '';
    }
    return html`
    <div class="flow-section">
      <h5 data-type="authorization-scopes" class="value-title">Authorization scopes</h5>
      <ul class="scopes-list">
        ${scopes.map((scope) => this[scopeTemplate](scope))}
      </ul>
    </div>`;
  }

  /**
   * @param {ApiSecurityScope} scope The access token URI
   * @returns {TemplateResult} The template for an oauth scope
   */
  [scopeTemplate](scope) {
    const { name, description } = scope;
    return html`
    <li class="scope-value">
      <span class="scope-name text-selectable">${name}</span>
      ${description ? html`<span class="scope-description text-selectable">${description}</span>` : ''}
    </li>
    `;
  }

  /**
   * @param {ApiSecurityOAuth1Settings} settings
   * @returns {TemplateResult|string} The template for OAuth 1 security definition.
   */
  [oAuth1SettingsTemplate](settings) {
    const { signatures=[], authorizationUri, requestTokenUri, tokenCredentialsUri } = settings;
    const content = /** @type TemplateResult[] */ ([]);
    if (authorizationUri) {
      content.push(/** @type TemplateResult */ (this[authorizationUriTemplate](authorizationUri)));
    }
    if (requestTokenUri) {
      content.push(/** @type TemplateResult */ (this[accessTokenUriTemplate](requestTokenUri)));
    }
    if (tokenCredentialsUri) {
      content.push(/** @type TemplateResult */ (this[tokenCredentialsUriTemplate](tokenCredentialsUri)));
    }
    if (signatures.length) {
      content.push(this[signaturesTemplate](signatures));
    }
    return this[paramsSectionTemplate]('Settings', 'settingsOpened', content);
  }

  /**
   * @param {string} uri The token credentials URI
   * @returns {TemplateResult|string} The template for the token credentials URI
   */
  [tokenCredentialsUriTemplate](uri) {
    if (!uri) {
      return '';
    }
    return html`
    <div class="flow-section">
      <h5 data-type="token-credentials-uri" class="value-title text-selectable">Token credentials URI</h5>
      <div class="example-content">
        <pre class="code-value text-selectable"><code>${uri}</code></pre>
      </div>
    </div>`;
  }

  /**
   * @param {string[]} signatures The OAuth1 signatures.
   * @returns {TemplateResult} The template for the OAuth1 signatures.
   */
  [signaturesTemplate](signatures) {
    return html`
    <div class="flow-section">
      <h5 data-type="signatures" class="value-title">Supported signatures</h5>
      <ul>
      ${signatures.map((item) => html`<li><pre class="code-value text-selectable"><code>${item}</code></pre></li>`)}
      </ul>
    </div>`;
  }
}
