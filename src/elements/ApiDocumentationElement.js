/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import '@anypoint-web-components/awc/anypoint-radio-button.js';
import '@anypoint-web-components/awc/anypoint-radio-group.js';
import elementStyles from './styles/ApiDocumentation.js';
import { 
  ApiDocumentationBase,
  processDebounce,
  domainIdValue,
} from './ApiDocumentationBase.js';
import { EventTypes } from '../events/EventTypes.js';
import { Events } from '../events/Events.js';
import { ns } from '../helpers/Namespace.js';
import '../../define/api-summary.js'
import '../../define/api-operation-document.js'
import '../../define/api-resource-document.js';
import '../../define/api-security-document.js';
import '../../define/api-documentation-document.js';
import '../../define/api-schema-document.js';
import '../../define/api-server-selector.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../types').ServerType} ServerType */
/** @typedef {import('../types').SelectionType} SelectionType */
/** @typedef {import('../types').DocumentMeta} DocumentMeta */
/** @typedef {import('../events/NavigationEvents').ApiNavigationEvent} ApiNavigationEvent */
/** @typedef {import('../events/ServerEvents').ServerCountChangeEvent} ServerCountChangeEvent */
/** @typedef {import('../events/ServerEvents').ServerChangeEvent} ServerChangeEvent */
/** @typedef {import('@anypoint-web-components/awc').AnypointRadioGroupElement} AnypointRadioGroupElement */

export const operationIdValue = Symbol('operationIdValue');
export const domainTypeValue = Symbol('domainTypeValue');
export const navigationHandler = Symbol('navigationHandler');
export const navEventsRegistered = Symbol('navEventsRegistered');
export const registerNavigationEvents = Symbol('registerNavigationEvents');
export const unregisterNavigationEvents = Symbol('unregisterNavigationEvents');
export const handleNavigationEventsValue = Symbol('handleNavigationEventsValue');
export const processApiSpecSelection = Symbol('processApiSpecSelection');
export const processLibrarySelection = Symbol('processLibrarySelection');
export const renderedViewValue = Symbol('renderedViewValue');
export const processFragment = Symbol('processFragment');
export const processPartial = Symbol('processPartial');
export const processEndpointPartial = Symbol('processEndpointPartial');
export const apiSummaryValue = Symbol('apiSummaryValue');
export const serverSelectorTemplate = Symbol('serverSelectorTemplate');
export const serversCountHandler = Symbol('serversCountHandler');
export const serverChangeHandler = Symbol('serverChangeHandler');
export const modelTemplate = Symbol('modelTemplate');
export const summaryTemplate = Symbol('summaryTemplate');
export const securityTemplate = Symbol('securityTemplate');
export const documentationTemplate = Symbol('documentationTemplate');
export const schemaTemplate = Symbol('schemaTemplate');
export const resourceTemplate = Symbol('resourceTemplate');
export const schemaMediaSelectorTemplate = Symbol('schemaMediaSelectorTemplate');
export const mediaTypeSelectHandler = Symbol('mediaTypeSelectHandler');
export const queryDocumentMeta = Symbol('queryDocumentMeta');
export const documentMetaValue = Symbol('documentMetaValue');
export const queryApiSummary = Symbol('queryApiSummary');

/**
 * A main documentation view for an AMF model representing a sync or an async API.
 * 
 * This element works with the [AMF](https://github.com/mulesoft/amf) data model.
 */
export default class ApiDocumentationElement extends ApiDocumentationBase {
  get styles() {
    return elementStyles;
  }

  static get properties() {
    return {
      /**
       * Type of the selected domain item.
       */
      domainType: { type: String },
      /** 
       * The domain id of the currently rendered API operation.
       * When selecting an operation the `domainId` is the id if the parent endpoint.
       */
      operationId: { type: String },
      /**
       * By default application hosting the element must set `domainId` and
       * `domainType` properties. When using `api-navigation` element
       * by setting this property the element listens for navigation events
       * and updates the state
       */
      handleNavigationEvents: { type: Boolean },
      /**
       * A property to set to override AMF's model base URI information.
       */
      baseUri: { type: String },
      /** 
       * When set it renders the "try it" button that dispatches the `tryit` event.
       */
      tryItButton: { type: Boolean, reflect: true },
      /** 
       * When set it renders the "try it" panel next to the operation documentation.
       * Setting this automatically disables the `tryItButton` property.
       * 
       * Note, use this only when there's enough space on the screen to render 2 panels side-by-side.
       */
      tryItPanel: { type: Boolean, reflect: true },
      /**
       * OAuth2 redirect URI.
       * This value **must** be set in order for OAuth 1/2 to work properly.
       * This is only required in inline mode (`inlineMethods`).
       */
      redirectUri: { type: String },
      /** 
       * When set it renders the URL input above the URL parameters in the HTTP editor.
       */
      httpUrlEditor: { type: Boolean, reflect: true },
      /** 
       * When set it applies the authorization values to the request dispatched
       * with the API request event.
       * If possible, it applies the authorization values to query parameter or headers
       * depending on the configuration.
       * 
       * When the values arr applied to the request the authorization config is kept in the
       * request object, but its `enabled` state is always `false`, meaning other potential
       * processors should ignore this values.
       * 
       * If this property is not set then the application hosting this component should
       * process the authorization data and apply them to the request.
       */
      httpApplyAuthorization: { type: Boolean, reflect: true },
      /**
       * List of credentials source passed to the HTTP editor
       */
      httpCredentialsSource: { type: Array },
      /**
       * Optional property to set on the request editor. 
       * When true, the server selector is not rendered
       */
      noServerSelector: { type: Boolean },
      /**
       * When set it renders "add custom" item button in the HTTP request editor.
       * If the element is to be used without AMF model this should always
       * be enabled. Otherwise users won't be able to add a parameter.
       */
      httpAllowCustom: { type: Boolean },
      /**
       * Optional property to set on the request editor. 
       * If true, the server selector custom base URI option is rendered
       */
      allowCustomBaseUri: { type: Boolean },
      /**
       * The URI of the server currently selected in the server selector
       */
      serverValue: { type: String },
      /**
       * The type of the server currently selected in the server selector
       */
      serverType: { type: String },
      /**
       * The mime type of the currently selected schema.
       */
      schemaMimeType: { type: String },
    };
  }

  /** 
   * @returns {SelectionType|undefined} The domain id of the object to render.
   */
  get domainType() {
    return this[domainTypeValue];
  }

  /** 
   * @returns {SelectionType|undefined} The domain id of the object to render.
   */
  set domainType(value) {
    const old = this[domainTypeValue];
    if (old === value) {
      return;
    }
    this[domainTypeValue] = value;
    this.requestUpdate('domainType', old);
    if (value) {
      this[processDebounce]();
    }
  }

  /** 
   * @returns {string|undefined} The domain id of the object to render.
   */
  get operationId() {
    return this[operationIdValue];
  }

  /** 
   * @returns {string|undefined} The domain id of the object to render.
   */
  set operationId(value) {
    const old = this[operationIdValue];
    if (old === value) {
      return;
    }
    this[operationIdValue] = value;
    this.requestUpdate('operationId', old);
    if (value) {
      this[processDebounce]();
    }
  }

  /** @returns {boolean} */
  get handleNavigationEvents() {
    return this[handleNavigationEventsValue];
  }

  /** @param {boolean} value */
  set handleNavigationEvents(value) {
    const old = this[handleNavigationEventsValue];
    if (old === value) {
      return;
    }
    this[handleNavigationEventsValue] = value;
    if (value) {
      this[registerNavigationEvents]();
    } else {
      this[unregisterNavigationEvents]();
    }
  }

  /**
   * Former `effectiveBaseUri`.
   * @returns {string|undefined} The URI for the API defined by the `baseUri` property or the `serverValue`.
   */
  get apiBaseUri() {
    const { baseUri, serverValue } = this;
    return baseUri || serverValue;
  }

  /**
   * @deprecated Use `apiBaseUri` instead.
   */
  get effectiveBaseUri() {
    return this.apiBaseUri;
  }

  /** @returns {string} The domain type of the rendered view. */
  get renderedView() {
    return this[renderedViewValue];
  }

  /** @returns {boolean} */
  get renderSelector() {
    const { domainType, serversCount, allowCustomBaseUri } = this;
		const isOperationOrEndpoint = !!domainType && (['operation', 'resource'].includes(domainType));
		const moreThanOneServer = serversCount >= 2;
		if (isOperationOrEndpoint) {
			return allowCustomBaseUri || moreThanOneServer;
		}
		return false;
  }

  /**
   * This is a computed value from the AMF model.
   * @returns {boolean} true when whe currently loaded API is an async API.
   */
  get isAsync() {
    const { documentMeta } = this;
    if (!documentMeta) {
      return false;
    }
    return documentMeta.isAsync;
  }

  /**
   * @returns {string|undefined} The mime type of the schema that is being rendered.
   */
  get schemaMime() {
    const { schemaMimeType } = this;
    if (schemaMimeType) {
      return schemaMimeType;
    }
    const summary = this[apiSummaryValue];
    if (!summary) {
      return undefined;
    }
    const { accepts=[] } = summary;
    if (!accepts.length) {
      return undefined;
    }
    return accepts[0];
  }

  /** @type DocumentMeta */
  get documentMeta() {
    return this[documentMetaValue];
  }

  constructor() {
    super();
    /** @type {SelectionType} */
    this.domainType = undefined;
    /** @type {string} */
    this.operationId = undefined;
    /** @type {string} */
    this.baseUri = undefined;
    /** @type {boolean} */
    this.tryItButton = undefined;
    /** @type {boolean} */
    this.tryItPanel = undefined;
    /** @type {boolean} */
    this.httpUrlEditor = undefined;
    /** @type {boolean} */
    this.noServerSelector = undefined;
    /** @type {boolean} */
    this.allowCustomBaseUri = undefined;
    /** @type {boolean} */
    this.httpAllowCustom = undefined;
    /** @type {string} */
    this.redirectUri = undefined;
    /** @type {ServerType} */
    this.serverType = undefined;
    /** @type {string} */
    this.serverValue = undefined;
    /** @type {number} */
    this.serversCount = undefined;
    /** @type {boolean} */
    this.httpApplyAuthorization = undefined;
    this.httpCredentialsSource = undefined;
    /** @type {ApiSummary} */
    this[apiSummaryValue] = undefined;
    /** @type {string} */
    this.schemaMimeType = undefined;

    this[navigationHandler] = this[navigationHandler].bind(this);
    this[navEventsRegistered] = false;
    /** @type DocumentMeta */
    this[documentMetaValue] = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this[processDebounce]();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this[navEventsRegistered]) {
      this[unregisterNavigationEvents]();
    }
  }

  /**
   * Registers the api navigation event listener handler
   * on the window object.
   */
  [registerNavigationEvents]() {
    this[navEventsRegistered] = true;
    window.addEventListener(EventTypes.Navigation.apiNavigate, this[navigationHandler]);
  }

  /**
   * Removes event listener from window object for the API navigation event.
   */
  [unregisterNavigationEvents]() {
    this[navEventsRegistered] = false;
    window.removeEventListener(EventTypes.Navigation.apiNavigate, this[navigationHandler]);
  }

  /**
   * Handler for the API navigation event.
   * 
   * Note, when the current type is set to `operation` then the `operationId` is
   * set instead of `domainId`, which is set to the parent endpoint id.
   *
   * @param {ApiNavigationEvent} e
   */
  [navigationHandler](e) {
    const { domainId, domainType, parentId, passive } = e.detail;
    if (passive === true) {
      return;
    }
    this.domainType = domainType;
    if (domainType === 'operation') {
      this.operationId = domainId;
      this.domainId = parentId;  
    } else {
      this.operationId = undefined;
      this.domainId = domainId;
    }
    this.processGraph();
  }

  /**
   * @returns {Promise<void>}
   */
  async processGraph() {
    this.schemaMimeType = undefined;
    await this[queryDocumentMeta]();
    const { documentMeta } = this;
    if (!documentMeta) {
      this.requestUpdate();
      return;
    }
    if (documentMeta.isApi) {
      await this[queryApiSummary]();
      this[processApiSpecSelection]();
      return;
    }
    if (documentMeta.isLibrary) {
      this[processLibrarySelection]();
      return;
    }
    const { isFragment, types } = documentMeta;
    
    if (isFragment) {
      /** @type SelectionType */
      let type;
      if (types.includes(ns.aml.vocabularies.security.SecuritySchemeFragment)) {
        type = 'security';
      } else if (types.includes(ns.aml.vocabularies.apiContract.UserDocumentationFragment)) {
        type = 'documentation';
      } else if (types.includes(ns.aml.vocabularies.shapes.DataTypeFragment)) {
        type = 'schema';
      }
      this[processFragment](type);
      return;
    }

    //
    // partial models
    // 

    if (types.includes(ns.aml.vocabularies.apiContract.EndPoint)) {
      this[processEndpointPartial]();
      return;
    }

    /** @type SelectionType */
    let type;
    if (types.includes(ns.aml.vocabularies.core.CreativeWork)) {
      type = 'documentation';
    } else if (types.includes(ns.aml.vocabularies.security.SecurityScheme)) {
      type = 'security';
    } else if (types.includes(ns.w3.shacl.Shape)) {
      type = 'schema';
    }
    this[processPartial](type);
  }

  /**
   * Reads the currently loaded document meta data from the store.
   */
  async [queryDocumentMeta]() {
    this[documentMetaValue] = undefined;
    try {
      const info = await Events.Api.documentMeta(this);
      this[documentMetaValue] = info;
    } catch (e) {
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for the document meta data: ${e.message}`, this.localName);
    }
  }

  /**
   * Reads the API summary.
   * Called only when the currently loaded document is an API.
   */
  async [queryApiSummary]() {
    try {
      const info = await Events.Api.summary(this);
      this[apiSummaryValue] = info;
    } catch (e) {
      this[apiSummaryValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for the API summary data: ${e.message}`, this.localName);
    }
  }

  /**
   * Processes selection for the web API data model. It ignores the input if
   * `domainId` or `domainType` is not set.
   */
  [processApiSpecSelection]() {
    const { domainId, tryItPanel } = this;
    let { domainType } = this;
    if (!domainId || !domainType) {
      // Not all required properties were set.
      return;
    }
    if (domainType === 'operation' && tryItPanel) {
      domainType = 'resource';
    }
    this[renderedViewValue] = domainType;
    this.requestUpdate();
  }

  /**
   * Processes selection for a library data model. It ignores the input if
   * `domainId` or `domainType` is not set.
   */
  [processLibrarySelection]() {
    const { domainId, domainType } = this;
    if (!domainId || !domainType) {
      // Not all required properties were set.
      return;
    }
    this[renderedViewValue] = domainType;
    this.requestUpdate();
  }

  /**
   * Processes fragment model and sets current selection and the model.
   * 
   * @param {SelectionType} domainType The selected domain type.
   */
  [processFragment](domainType) {
    this[domainIdValue] = this.documentMeta.encodesId;
    this[renderedViewValue] = domainType;
    this.requestUpdate();
  }

  /**
   * Sets the partial model to be rendered.
   * 
   * @param {SelectionType} domainType The domain type representing the partial model.
   */
  [processPartial](domainType) {
    this[renderedViewValue] = domainType;
    this.requestUpdate();
  }

  /**
   * Processes endpoint data from partial model definition.
   * It sets models that are used by the docs.
   *
   * If `selected` or `selectedType` is not set then it automatically selects
   */
  [processEndpointPartial]() {
    const { tryItPanel } = this;
    let { domainType } = this;
		if (!domainType || tryItPanel) {
			domainType = 'resource';
		}
    if (!['operation', 'resource'].includes(domainType)) {
      domainType = 'resource';
    }
		this[renderedViewValue] = domainType;
    this.requestUpdate();
  }

  /**
   * @param {ServerCountChangeEvent} e
   */
  [serversCountHandler](e) {
    this.serversCount = e.detail.value;
  }

  /**
   * @param {ServerChangeEvent} e
   */
  [serverChangeHandler](e) {
    this.serverValue = e.detail.value;
    this.serverType = e.detail.type;
  }

  /**
   * @param {Event} e
   */
  [mediaTypeSelectHandler](e) {
    const group = /** @type AnypointRadioGroupElement */ (e.target);
    const { selectedItem } = group;
    if (!selectedItem) {
      return;
    }
    const mime = selectedItem.dataset.value;
    this.schemaMimeType = mime;
  }

  render() {
    return html`<style>${this.styles}</style>
    ${this[serverSelectorTemplate]()}
    ${this[modelTemplate]()}`;
  }

  /**
   * @returns {TemplateResult|string} The template for the server selector.
   */
  [serverSelectorTemplate]() {
    if (this.noServerSelector) {
      return '';
    }
    const { anypoint, serverType, serverValue, allowCustomBaseUri, renderSelector, domainId, domainType } = this;
    const id = domainType === 'operation' ? this.operationId : domainId;
    return html`
      <api-server-selector
        class="server-selector"
        .domainId="${id}"
        .domainType="${domainType}"
        .value="${serverValue}"
        .type="${serverType}"
        ?hidden="${!renderSelector}"
        ?allowCustom="${allowCustomBaseUri}"
        ?anypoint="${anypoint}"
        autoSelect
        @serverscountchanged="${this[serversCountHandler]}"
        @apiserverchanged="${this[serverChangeHandler]}"
      >
        <slot name="custom-base-uri" slot="custom-base-uri"></slot>
      </api-server-selector>`;
  }

  /**
   * @returns {TemplateResult|string} The template for the server selector.
   */
  [modelTemplate]() {
    switch (this[renderedViewValue]) {
      case 'summary': return this[summaryTemplate]();
      case 'security': return this[securityTemplate]();
      case 'documentation': return this[documentationTemplate]();
      case 'schema': return this[schemaTemplate]();
      case 'resource':
      case 'operation':
        return this[resourceTemplate]();
      default: return '';
    }
  }

  /**
   * @returns {TemplateResult|string} The template for the API summary page.
   */
  [summaryTemplate]() {
    const { baseUri, anypoint } = this;
    return html`
    <api-summary .baseUri="${baseUri}" .anypoint="${anypoint}"></api-summary>`;
  }

  /**
   * @returns {TemplateResult|string} The template for the API security definition page.
   */
  [securityTemplate]() {
    const { domainId, anypoint } = this;
    return html`<api-security-document
      .domainId="${domainId}"
      .anypoint="${anypoint}"
      settingsOpened
    ></api-security-document>`;
  }

  /**
   * @returns {TemplateResult|string} The template for the RAML's documentation page.
   */
  [documentationTemplate]() {
    const { domainId, anypoint } = this;
    return html`<api-documentation-document
      .domainId="${domainId}"
      .anypoint="${anypoint}"></api-documentation-document>`;
  }

  /**
   * @returns {TemplateResult|string} The template for the API schema page.
   */
  [schemaTemplate]() {
    const { anypoint, schemaMime, domainId } = this;
    return html`
    ${this[schemaMediaSelectorTemplate]()}
    <api-schema-document
      .domainId="${domainId}"
      .mimeType="${schemaMime}"
      .anypoint="${anypoint}"
      forceExamples
    ></api-schema-document>`;
  }

  /**
   * @returns {TemplateResult|string} The template for the API endpoint page.
   */
  [resourceTemplate]() {
    const { domainId, operationId, isAsync } = this;
    return html`<api-resource-document
      .domainId="${domainId}"
      .operationId="${operationId}"
      .redirectUri="${this.redirectUri}"
      .serverType="${this.serverType}"
      .serverValue="${this.serverValue}"
      .baseUri="${this.apiBaseUri}"
      ?tryItButton="${this.tryItButton}"
      ?tryItPanel="${this.tryItPanel}"
      ?anypoint="${this.anypoint}"
      ?httpUrlEditor="${this.httpUrlEditor}"
      httpNoServerSelector
      ?asyncApi="${isAsync}"
    ></api-resource-document>`;
  }

  /**
   * This is a part of schema rendering.
   * When the current API defines the media types then this shows the selector 
   * to render examples with a specific mime.
   * @returns {TemplateResult|string}
   */
  [schemaMediaSelectorTemplate]() {
    const { documentMeta } = this;
    // only APIs have top level media types (?)
    const summary = this[apiSummaryValue];
    if (!summary || !documentMeta || !documentMeta.isApi) {
      return '';
    }
    const { accepts=[] } = summary;
    if (accepts.length < 2) {
      // if there's a single mime then we render the one we have. No selector needed.
      return '';
    }
    const mimeType = this.schemaMimeType || accepts[0];
    return html`
    <div class="media-type-selector">
      <label>Schema content type</label>
      <anypoint-radio-group 
        @select="${this[mediaTypeSelectHandler]}" 
        attrForSelected="data-value" 
        .selected="${mimeType}"
      >
        ${accepts.map((item) => 
          html`<anypoint-radio-button class="schema-toggle" name="schemaMime" data-value="${item}">${item}</anypoint-radio-button>`)}
      </anypoint-radio-group>
    </div>
    `;
  }
}
