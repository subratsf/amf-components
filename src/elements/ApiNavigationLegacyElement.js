/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/awc/anypoint-icon-button.js';
import '@anypoint-web-components/awc/anypoint-collapse.js';
import { keyboardArrowDown, openInNew, } from '@advanced-rest-client/icons/ArcIcons.js';
import { HttpStyles } from '@advanced-rest-client/app';
import { AmfHelperMixin } from '../helpers/AmfHelperMixin.js';
import navStyles from './styles/Navigation.js';
import { EventTypes } from '../events/EventTypes.js'
import { NavigationEvents } from '../events/NavigationEvents.js';

/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */

/** @typedef {import('@anypoint-web-components/awc').AnypointCollapseElement} AnypointCollapseElement */
/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('./ApiNavigationLegacyElement').MethodItem} MethodItem */
/** @typedef {import('./ApiNavigationLegacyElement').EndpointItem} EndpointItem */
/** @typedef {import('./ApiNavigationLegacyElement').SecurityItem} SecurityItem */
/** @typedef {import('./ApiNavigationLegacyElement').TypeItem} TypeItem */
/** @typedef {import('./ApiNavigationLegacyElement').DocumentationItem} DocumentationItem */
/** @typedef {import('./ApiNavigationLegacyElement').TargetModel} TargetModel */
/** @typedef {import('./ApiNavigationLegacyElement').NavigationItem} NavigationItem */
/** @typedef {import('../types').SelectionType} SelectionType */
/** @typedef {import('../helpers/amf').EndPoint} EndPoint */
/** @typedef {import('../helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../events/NavigationEvents').ApiNavigationEvent} ApiNavigationEvent */
/** @typedef {import('../events/NavigationEvents').ApiNavigationEventDetail} ApiNavigationEventDetail */

export const openedOperationsValue = Symbol('openedOperationsValue');
export const collectData = Symbol('collectData');
export const queryValue = Symbol('queryValue');
export const queryDebouncer = Symbol('queryDebouncer');
export const hasPassiveSelection = Symbol('hasPassiveSelection');
export const getFilteredType = Symbol('getFilteredType');
export const docsValue = Symbol('docsValue');
export const typesValue = Symbol('typesValue');
export const securityValue = Symbol('securityValue');
export const endpointsValue = Symbol('endpointsValue');
export const endpointsTemplate = Symbol('endpointsTemplate');
export const documentationTemplate = Symbol('documentationTemplate');
export const typesTemplate = Symbol('typesTemplate');
export const securityTemplate = Symbol('securityTemplate');
export const overviewTemplate = Symbol('overviewTemplate');
export const endpointPathTemplate = Symbol('endpointPathTemplate');
export const endpointTemplate = Symbol('endpointTemplate');
export const methodTemplate = Symbol('methodTemplate');
export const documentationItemTemplate = Symbol('documentationItemTemplate');
export const isFragmentValue = Symbol('isFragmentValue');
export const selectedItemValue = Symbol('selectedItemValue');
export const updatedOpenedOperations = Symbol('updatedOpenedOperations');
export const domainIdValue = Symbol('domainIdValue');
export const domainTypeValue = Symbol('domainTypeValue');
export const selectedChanged = Symbol('selectedChanged');
export const selectionChanged = Symbol('selectionChanged');
export const operationsOpened = Symbol('operationsOpened');
export const addOpenedOperations = Symbol('addOpenedOperations');
export const shiftTabPressed = Symbol('shiftTabPressed');
export const focusedItemPrivate = Symbol('focusedItemPrivate');
export const focusedItemValue = Symbol('focusedItemValue');
export const summaryTemplate = Symbol('summaryTemplate');
export const itemClickHandler = Symbol('itemClickHandler');
export const queryChanged = Symbol('queryChanged');
export const flushQuery = Symbol('flushQuery');
export const queryValue2 = Symbol('queryValue2');
export const noOverviewValue = Symbol('noOverviewValue');
export const rearrangeEndpointsValue = Symbol('rearrangeEndpointsValue');
export const renderFullPathsValue = Symbol('renderFullPathsValue');
export const itemsValue = Symbol('itemsValue');
export const resetTabindices = Symbol('resetTabindices');
export const navigationHandler = Symbol('navigationHandler');
export const focusHandler = Symbol('focusHandler');
export const keydownHandler = Symbol('keydownHandler');
export const collectSecurityData = Symbol('collectSecurityData');
export const collectDocumentationData = Symbol('collectDocumentationData');
export const collectTypeData = Symbol('collectTypeData');
export const traverseDeclarations = Symbol('traverseDeclarations');
export const traverseReferences = Symbol('traverseReferences');
export const traverseEncodes = Symbol('traverseEncodes');
export const rearrangeEndpoints = Symbol('rearrangeEndpoints');
export const closeCollapses = Symbol('closeCollapses');
export const appendSecurityItem = Symbol('appendSecurityItem');
export const appendTypeItem = Symbol('appendTypeItem');
export const validUrl = Symbol('validUrl');
export const appendDocumentationItem = Symbol('appendDocumentationItem');
export const appendEndpointItem = Symbol('appendEndpointItem');
export const appendModelItem = Symbol('appendModelItem');
export const createOperationModel = Symbol('createOperationModel');
export const toggleSectionHandler = Symbol('toggleSectionHandler');
export const toggleSection = Symbol('toggleSection');
export const selectItem = Symbol('selectItem');
export const addSelection = Symbol('addSelection');
export const clearSelection = Symbol('clearSelection');
export const cleanPassiveSelection = Symbol('cleanPassiveSelection');
export const handlePassiveNavigation = Symbol('handlePassiveNavigation');
export const selectMethodPassive = Symbol('selectMethodPassive');
export const toggleEndpoint = Symbol('toggleEndpoint');
export const toggleEndpointDocumentation = Symbol('toggleEndpointDocumentation');
export const toggleEndpointButton = Symbol('toggleEndpointButton');
export const computeEndpointPadding = Symbol('computeEndpointPadding');
export const computeEndpointPaddingLeft = Symbol('computeEndpointPaddingLeft');
export const computeMethodPadding = Symbol('computeMethodPadding');
export const computeOperationPaddingLeft = Symbol('computeOperationPaddingLeft');
export const getFilteredEndpoints = Symbol('getFilteredEndpoints');
export const listActiveItems = Symbol('listActiveItems');
export const listSectionActiveNodes = Symbol('listSectionActiveNodes');
export const onUpKey = Symbol('onUpKey');
export const onDownKey = Symbol('onDownKey');
export const onEscKey = Symbol('onEscKey');
export const onSpace = Symbol('onSpace');
export const onShiftTabDown = Symbol('onShiftTabDown');

/**
 * Maps authorization scheme name to a label
 * @param {string} name
 * @return {string}
 */
function mapAuthName(name) {
  switch (name) {
    case 'http':
      return 'HTTP';
    case 'openIdConnect':
      return 'OpenID Connect';
    default:
      return name;
  }
}

/**
 * Discretely updates tabindex values among menu items as the focused item
 * changes.
 *
 * @param {HTMLElement} focusedItem The element that is currently focused.
 * @param {HTMLElement=} old The last element that was considered focused, if
 * applicable.
 */
function focusedItemChanged(focusedItem, old) {
  if (old) {
    old.setAttribute('tabindex', '-1');
  }
  if (focusedItem && !focusedItem.hasAttribute('disabled')) {
    focusedItem.setAttribute('tabindex', '0');
    focusedItem.focus();
  }
}

/**
 * Computes label for an endpoint when name is missing and the endpoint
 * is indented, hence name should be truncated.
 * @param {string} currentPath Endpoint's path
 * @param {string[]} parts Path parts
 * @param {number} indent Endpoint indentation
 * @param {string[]} basePaths List of base paths already used.
 * @return {string} Name of the path to render.
 */
export function computePathName(currentPath, parts, indent, basePaths) {
  let path = '';
  const latestBasePath = basePaths[basePaths.length - 1];
  for (let i = 0, len = parts.length - 1; i < len; i++) {
    path += `/${parts[i]}`;
    if (!latestBasePath || latestBasePath.indexOf(`${path}/`) !== -1) {
      indent--;
    }
    if (indent === 0) {
      break;
    }
  }
  return currentPath.replace(path, '');
}

/**
 * Computes condition value to render path label.
 * @param {boolean} allowPaths Component configuration property.
 * @param {boolean} renderPath Endpoint property
 * @return {boolean} True if both arguments are truly.
 */
export function computeRenderPath(allowPaths, renderPath) {
  return !!(allowPaths && renderPath);
}

/**
 * `api-navigation`
 * A navigation for an API spec using AMF model.
 *
 * This element is to replace deprecated `raml-path-selector`.
 * It is lightweight and much less complex in comparison.
 *
 * The element works with [AMF](https://github.com/mulesoft/amf)
 * json/ld model. When the model is set it computes list of documentation
 * nodes, types, endpoints, methods and security schemas.
 * As a result user can select any of the items in the UI and the application
 * is informed about user choice via custom event.
 *
 * The selection is a selected API shape `@id`. The application is responsible
 * for computing the model selected by the user.
 * 
 * Note, this element does not contain polyfills for Array platform features.
 * Use `arc-polyfills` to add support for IE and Safari 9.
 *
 * ## Passive navigation
 *
 * Passive navigation means that a navigation event occurred but it wasn't
 * invoked by intentional user interaction. For example
 * `api-endpoint-documentation` component renders list of documentations for
 * HTTP methods. While scrolling through the list navigation context
 * changes (user reads documentation of a method) but the navigation never
 * was caused by user intentional interaction.
 * This event, annotated with `passive: true` property in the detail object
 * prohibits other element from taking a navigation action but some
 * may reflect the change in the UI.
 */
export default class ApiNavigationElement extends AmfHelperMixin(LitElement) {
  static get properties() {
    return {
      /**
       * A model `@id` of selected documentation part.
       * Special case is for `summary` view. It's not part of an API
       * but most applications has some kins of summary view for the
       * API.
       */
      domainId: { type: String, reflect: true },
      /**
       * Type of the domain item.
       * One of `documentation`, `schema`, `security`, `resource`, `operation`
       * or `summary`.
       *
       * This property is set after `domainId` property.
       */
      domainType: { type: String, reflect: true },
      /**
       * If set it renders `API summary` menu option.
       * It will allow to set `domainId` and `domainType` to `summary`
       * when this option is set.
       */
      summary: { type: Boolean, reflect: true },
      /**
       * A label for the `summary` section.
       */
      summaryLabel: { type: String, reflect: true },
      /**
       * Determines and changes state of documentation panel.
       */
      docsOpened: { type: Boolean, reflect: true },
      
      /**
       * Determines and changes state of types panel.
       */
      typesOpened: { type: Boolean, reflect: true },
      /**
       * Determines and changes state of security panel.
       */
      securityOpened: { type: Boolean, reflect: true },
      /**
       * Determines and changes state of endpoints panel.
       */
      endpointsOpened: { type: Boolean, reflect: true },
      /**
       * If true, the element will not produce a ripple effect when interacted with via the pointer.
       */
      noink: { type: Boolean, reflect: true },
      /**
       * Filters list elements by this value when set.
       * Clear the value to reset the search.
       *
       * This is not currently exposed in element's UI due
       * to complexity of search and performance.
       */
      query: { type: String, reflect: true },
      /**
       * Size of endpoint indentation for nested resources.
       * In pixels.
       *
       * The attribute name for this property is `indent-size`. Note, that this
       * will change to web consistent name `indentSize` in the future.
       */
      indentSize: { type: Number, reflect: true },
      /**
       * When set it renders full path below endpoint name if the endpoint has
       * a name (different than the path).
       * This is not always recommended to use this option as some complex APIs
       * may render this component difficult to understand.
       */
      allowPaths: { type: Boolean },
      /**
       * If this value is set, then the navigation component will sort the list
       * of endpoints alphabetically based on the `path` value of the endpoint
       */
      rearrangeEndpoints: { type: Boolean },
      /**
       * Enables Anypoint platform styles.
       */
      anypoint: { type: Boolean },
      /**
       * Determines and changes state of endpoints.
       */
      operationsOpened: { type: Boolean, reflect: true },
      /**
       * No overview as a separated node. 
       * Overview can be seen by clicking the endpoint label.
       */
      noOverview: { type: Boolean },
      /**
       * When set, avoids truncating and indentation of endpoint paths.
       * Instead, the full path for each endpoint will be rendered.
       */
      renderFullPaths: { type: Boolean },
    };
  }

  get styles() {
    return [navStyles, HttpStyles.default];
  }

  /** @returns {string} */
  get domainId() {
    return this[domainIdValue];
  }

  /** @param {string} value */
  set domainId(value) {
    const old = this[domainIdValue];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[domainIdValue] = value;
    this.requestUpdate('domainId', old);
    this[selectedChanged](value);
    this[selectionChanged](value, this.domainType);
  }

  /** @returns {SelectionType} */
  get domainType() {
    return this[domainTypeValue];
  }

  /** @param {SelectionType} value */
  set domainType(value) {
    const old = this[domainTypeValue];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[domainTypeValue] = value;
    this.requestUpdate('domainType', old);
    this[selectionChanged](this.domainId, value);
  }

  /** @param {boolean} value */
  set operationsOpened(value) {
    const old = this[operationsOpened];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[operationsOpened] = value;

    if (value === undefined) {
      return;
    }

    this[updatedOpenedOperations] = !value;
    if (!value) {
      this[openedOperationsValue] = /** @type string[] */ ([]);
    } else {
      this[addOpenedOperations](this[endpointsValue]);
    }
  }

  /** @returns {boolean} */
  get operationsOpened() {
    return this[operationsOpened];
  }

  /**
   * @return {boolean} true when `[docsValue]` property is set with values
   */
  get hasDocs() {
    const items = this[docsValue];
    return Array.isArray(items) && !!items.length;
  }

  /**
   * @return {boolean} true when `[typesValue]` property is set with values
   */
  get hasTypes() {
    const items = this[typesValue];
    return Array.isArray(items) && !!items.length;
  }

  /**
   * @return {boolean} true when `[securityValue]` property is set with values
   */
  get hasSecurity() {
    const items = this[securityValue];
    return Array.isArray(items) && !!items.length;
  }

  /**
   * @return {boolean} true when `[endpointsValue]` property is set with values
   */
  get hasEndpoints() {
    const items = this[endpointsValue];
    return Array.isArray(items) && !!items.length;
  }

  /**
   * @return {boolean} True when summary should be rendered.
   * Summary should be rendered only when `summary` is set and
   * current model is not a RAML fragment.
   */
  get summaryRendered() {
    const { summary } = this;
    return !!(summary && !this[isFragmentValue]);
  }

  get query() {
    return this[queryValue2];
  }

  set query(value) {
    const old = this[queryValue2];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[queryValue2] = value;
    this.requestUpdate('query', old);
    this[queryChanged]();
  }

  /**
   * @return {HTMLElement=} A reference to currently selected node.
   */
  get selectedItem() {
    return this[selectedItemValue];
  }

  /**
   * @return {HTMLElement=} The currently focused item.
   */
  get focusedItem() {
    return this[focusedItemPrivate];
  }

  get [focusedItemPrivate]() {
    return this[focusedItemValue];
  }

  set [focusedItemPrivate](value) {
    const old = this[focusedItemValue];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[focusedItemValue] = value;
    focusedItemChanged(value, old);
  }

  /** @returns {boolean} */
  get noOverview() {
    return this[noOverviewValue];
  }

  /** @param {boolean} value */
  set noOverview(value) {
    const old = this[noOverviewValue];
    if (old === value) {
      return;
    }
    this[noOverviewValue] = value;
    this.requestUpdate('noOverview', old);
    this[itemsValue] = null;
  }

  /** @param {boolean} value */
  set rearrangeEndpoints(value) {
    const old = this[rearrangeEndpointsValue];
    if (old === value) {
      return;
    }
    this[rearrangeEndpointsValue] = value;
    this.requestUpdate('rearrangeEndpoints', old);
    this.__amfChanged(this.amf);
  }

  /** @returns {boolean} */
  get rearrangeEndpoints() {
    return this[rearrangeEndpointsValue];
  }

  /** @param {boolean} value */
  set renderFullPaths(value) {
    const old = this[renderFullPathsValue];
    if (old === value) {
      return;
    }
    this[renderFullPathsValue] = value;
    this.requestUpdate('renderFullPaths', old);
    this.__amfChanged(this.amf);
  }

  /** @returns {boolean} */
  get renderFullPaths() {
    return this[renderFullPathsValue];
  }

  constructor() {
    super();

    this.summaryLabel = 'Summary';
    /**
     * Flag set when passed AMF model is a RAML fragment.
     * @type boolean
     */
    this[isFragmentValue] = false;
    this.summary = false;
    this.noink = false;
    this.allowPaths = false;
    this.anypoint = false;
    this.rearrangeEndpoints = false;
    this.indentSize = 8;
    /**
     * @type HTMLElement
     */
    this[selectedItemValue] = null;
    /**
     * List of opened operation ids
     * @type {string[]}
     */
    this[openedOperationsValue] = [];
    this[updatedOpenedOperations] = true;
    this.noOverview = false;
    this.renderFullPaths = false;
    /** @type {string} */
    this[queryValue] = undefined;
    /**
     * Computed list of documentation items in the API.
     * @type {DocumentationItem[]}
     */
    this[docsValue] = undefined;
    /**
     * Computed list of "type" items in the API.
     * @type {TypeItem[]}
     */
    this[typesValue] = undefined;
    /**
     * Computed list of Security schemes items in the API.
     * @type {SecurityItem[]}
     */
    this[securityValue] = undefined;
    /**
     * Computed list of endpoint items in the API.
     * @type {EndpointItem[]}
     */
    this[endpointsValue] = undefined;
    /** @type {Element[]} */
    this[itemsValue] = undefined;

    this[navigationHandler] = this[navigationHandler].bind(this);
    this[focusHandler] = this[focusHandler].bind(this);
    this[keydownHandler] = this[keydownHandler].bind(this);
  }

  /**
   * Ensures aria role attribute is in place.
   * Attaches element's listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    // @ts-ignore
    if (window.ShadyCSS) {
      // @ts-ignore
      window.ShadyCSS.styleElement(this);
    }
    // Pawel: This role requires children to be present in the DOM, but in this case none is rendered
    // in the light DOM but rather in the shadow DOM. Therefore the element cannot have this role.
    // if (!this.getAttribute('role')) {
    //   this.setAttribute('role', 'menubar');
    // }
    if (!this.getAttribute('aria-label')) {
      this.setAttribute('aria-label', 'API structure');
    }
    if (!this.getAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    window.addEventListener(EventTypes.Navigation.apiNavigate, this[navigationHandler]);
    this.addEventListener('focus', this[focusHandler]);
    this.addEventListener('keydown', this[keydownHandler]);

    this[resetTabindices]();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(EventTypes.Navigation.apiNavigate, this[navigationHandler]);
    this.removeEventListener('focus', this[focusHandler]);
    this.removeEventListener('keydown', this[keydownHandler]);
    this[itemsValue] = null;
  }

  /**
   * @param {EndpointItem[]} endpoints 
   */
  [addOpenedOperations](endpoints) {
    if (!this[updatedOpenedOperations] && endpoints) {
      this[openedOperationsValue] = endpoints.map(e => e.id);
      this[updatedOpenedOperations] = true;
    }
  }

  /**
   * Overrides `AmfHelperMixin.__amfChanged()`
   * @param {AmfDocument} api AMF model
   * @override
   */
  __amfChanged(api) {
    if (!api) {
      return;
    }
    let model = api;
    if (Array.isArray(model)) {
      [model] = model;
    }
    let data = {};
    let isFragment = true;
    this[itemsValue] = null;

    const { vocabularies } = this.ns.aml;
    const moduleKey = this._getAmfKey(vocabularies.document.Module);
    if (this._hasType(model, vocabularies.document.Document)) {
      isFragment = false;
      model = this._ensureAmfModel(model);
      data = this[collectData](model);
    } else if (this._hasType(model, vocabularies.security.SecuritySchemeFragment) ) {
      data = this[collectSecurityData](model);
      this.securityOpened = true;
    } else if (this._hasType(model, vocabularies.apiContract.UserDocumentationFragment)) {
      data = this[collectDocumentationData](model);
      this.docsOpened = true;
    } else if (this._hasType(model, vocabularies.shapes.DataTypeFragment)) {
      data = this[collectTypeData](model);
      this.typesOpened = true;
    } else if (model['@type'] && moduleKey === model['@type'][0]) {
      data = this[collectData](model);
    }
    if (this[isFragmentValue] !== isFragment) {
      this[isFragmentValue] = isFragment;
    }
    this[docsValue] = data.documentation;
    this[typesValue] = data.types;
    this[securityValue] = data.securitySchemes;
    this[endpointsValue] = data.endpoints;
    this.requestUpdate();
    this[closeCollapses]();
    setTimeout(() => {
      this[selectedChanged](this.domainId);
      this[resetTabindices]();
      this[addOpenedOperations](data.endpoints)
    });
  }

  /**
   * Collects the information about the API and creates data model
   * for the navigation element
   *
   * @param {AmfDocument} model
   * @return {TargetModel} Data model for the API navigation
   */
  [collectData](model) {
    const result = {
      documentation: [],
      types: [],
      securitySchemes: [],
      endpoints: [],
    };
    if (!model) {
      return result;
    }
    result._typeIds = [];
    result._basePaths = [];
    this[traverseDeclarations](model, result);
    this[traverseReferences](model, result);
    this[traverseEncodes](model, result);
    delete result._typeIds;
    delete result._basePaths;
    return result;
  }

  /**
   * Collects the data from the security fragment
   * @param {AmfDocument} model Security fragment model
   * @return {TargetModel|undefined}
   */
  [collectSecurityData](model) {
    const result = {
      securitySchemes: [],
    };
    const encodes = this._computeEncodes(model);
    if (!encodes) {
      return undefined;
    }
    this[appendSecurityItem](encodes, result);
    return result;
  }

  /**
   * Collects the data from the documentation fragment
   * @param {AmfDocument} model Documentation fragment model
   * @return {TargetModel|undefined}
   */
  [collectDocumentationData](model) {
    const result = {
      documentation: [],
    };
    const encodes = this._computeEncodes(model);
    if (!encodes) {
      return undefined;
    }
    this[appendDocumentationItem](encodes, result);
    return result;
  }

  /**
   * Collects the data from the type fragment
   * @param {AmfDocument} model Type fragment model
   * @return {TargetModel|undefined}
   */
  [collectTypeData](model) {
    const result = {
      types: [],
      _typeIds: [],
    };
    const encodes = this._computeEncodes(model);
    if (!encodes) {
      return undefined;
    }
    this[appendTypeItem](encodes, result);
    delete result._typeIds;
    return result;
  }

  /**
   * Traverses the `http://raml.org/vocabularies/document#declares`
   * node to find types and security schemes.
   *
   * @param {object} model AMF model
   * @param {TargetModel} target Target object where to put data.
   */
  [traverseDeclarations](model, target) {
    const declares = this._computeDeclares(model);
    if (!declares) {
      return;
    }
    declares.forEach(item => this[appendModelItem](item, target));
  }

  /**
   * Traverses the `http://raml.org/vocabularies/document#references`
   *
   * @param {object} model AMF model
   * @param {TargetModel} target Target object where to put data.
   */
  [traverseReferences](model, target) {
    const refs = this._computeReferences(model);
    if (!refs) {
      return;
    }
    refs.forEach((item) => {
      if (!this._hasType(item, this.ns.aml.vocabularies.document.Module)) {
        return;
      }
      this[traverseDeclarations](item, target);
    });
  }

  /**
   * Traverses the `http://raml.org/vocabularies/document#encodes`
   * node to find documentation and endpoints.
   *
   * @param {object} model AMF model
   * @param {TargetModel} target Target object where to put data.
   */
  [traverseEncodes](model, target) {
    const data = this._computeApi(model);
    if (!data) {
      return;
    }
    const eKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.endpoint);
    let endpoint = /** @type EndPoint[] */ (this._ensureArray(data[eKey]));
    if (this.rearrangeEndpoints) {
      endpoint = this[rearrangeEndpoints](endpoint);
    }
    if (endpoint) {
      endpoint.forEach(item => this[appendModelItem](item, target));
    }
    const dKey = this._getAmfKey(this.ns.aml.vocabularies.core.documentation);
    const documentation = this._ensureArray(data[dKey]);
    if (documentation) {
      documentation.forEach(item => this[appendModelItem](item, target));
    }
  }

  /**
   * Sort endpoints alphabetically based on path
   * @param {EndPoint[]} endpoints
   * @return {EndPoint[]}
   */
  [rearrangeEndpoints](endpoints) {
    if (!endpoints) {
      return null;
    }
    const pathKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.path);
    return [...endpoints].sort((a,b) => {
      const pathA = this._getValue(a, pathKey);
      const pathB = this._getValue(b, pathKey);

      if (pathA < pathB){
        return -1;
      }

      if (pathA > pathB){
        return 1;
      }

      return 0;
    });
  }

  /**
   * Appends declaration of navigation data model to the target if
   * it matches documentation or security types.
   *
   * @param {Object} item AMF model item to check for data.
   * @param {TargetModel} target The target to which append values.
   */
  [appendModelItem](item, target) {
    if (this._hasType(item, this.ns.w3.shacl.Shape)) {
      this[appendTypeItem](item, target);
    } else if (
      this._hasType(item, this.ns.aml.vocabularies.security.SecurityScheme)
    ) {
      this[appendSecurityItem](item, target);
    } else if (
      this._hasType(item, this.ns.aml.vocabularies.core.CreativeWork)
    ) {
      this[appendDocumentationItem](item, target);
    } else if (
      this._hasType(item, this.ns.aml.vocabularies.apiContract.EndPoint)
    ) {
      this[appendEndpointItem](item, target);
    }
  }

  /**
   * Appends "type" item to the results.
   *
   * @param {Object} item Type item declaration
   * @param {TargetModel} target
   */
  [appendTypeItem](item, target) {
    const w3name = /** @type string */ (this._getValue(item, this.ns.w3.shacl.name));
    if (w3name && w3name.indexOf('amf_inline_type') === 0) {
      // https://www.mulesoft.org/jira/browse/APIMF-972
      return;
    }
    let name = /** @type string */ (this._getValue(item, this.ns.aml.vocabularies.core.name));
    if (!name && w3name) {
      name = w3name;
    } else if (!name) {
      return;
    }
    const id = item['@id'];
    if (!id) {
      return;
    }
    const rfIdKey = this._getAmfKey(this.ns.aml.vocabularies.document.referenceId);
    const compareId = item['@id'];
    const refNode = this._ensureArray(item[rfIdKey]);
    const refId = refNode ? refNode[0]['@id'] : undefined;
    const idIndex = target._typeIds.indexOf(compareId);
    const refIndex = refId ? target._typeIds.indexOf(refId) : -1;
    if (idIndex === -1 && refIndex === -1) {
      target._typeIds[target._typeIds.length] = id;
      if (refId) {
        target._typeIds[target._typeIds.length] = refId;
      }
      target.types.push({
        label: name,
        id,
      });
    }
  }

  /**
   * Appends "security" item to the results.
   *
   * @param {Object} item Type item declaration
   * @param {TargetModel} target
   */
  [appendSecurityItem](item, target) {
    const voc = this.ns.aml.vocabularies;
    let name = this._getValue(item, voc.core.displayName);
    const secType = /** @type string */ (this._getValue(item, voc.security.type));
    if (!secType) {
      // this is a case when the security scheme is referenced from a library.
      // This creates an entry in the graph model but there is no actual definition of the 
      // security.
      // The definition will be discovered when scanning references.
      return;
    }
    if (!name) {
      name = this._getValue(item, voc.security.name);
    }
    if (!name) {
      name = this._getValue(item, voc.core.name);
    }
    name = `${name || ''} - ${mapAuthName(secType)}`
    const id = item['@id'];
    target.securitySchemes.push({
      label: String(name),
      id,
    });
  }

  /**
   * @param {string} url 
   * @returns {string}
   */
  [validUrl](url) {
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : 'about:blank';
  }

  /**
   * Appends "documentation" item to the results.
   *
   * @param {Object} item Type item declaration
   * @param {TargetModel} target
   */
  [appendDocumentationItem](item, target) {
    const { core } = this.ns.aml.vocabularies;
    const id = item['@id'];
    const urlNode = item[this._getAmfKey(core.url)];
    const title = this._getValue(item, core.title);
    const description = this._getValue(item, core.description);
    const label = title ? String(title) : String(description);
    let isExternal = false;
    let url = urlNode ? (urlNode[0] || urlNode)['@id'] : undefined;
    if (url) {
      url = this[validUrl](url);
      isExternal = true;
    }
    const result = {
      id,
      label,
      isExternal,
      url,
    };
    target.documentation.push(result);
  }

  /**
   * Appends "endpoint" item to the results.
   * This also iterates over methods to extract method data.
   *
   * @param {any} item Endpoint item declaration
   * @param {TargetModel} target
   */
  [appendEndpointItem](item, target) {
    const result = {};
    const { vocabularies } = this.ns.aml;
    let name = this._getValue(item, vocabularies.core.name);
    const path = /** @type string */ (this._getValue(item, vocabularies.apiContract.path));
    result.path = path;

    let tmpPath = path;
    if (tmpPath[0] === '/') {
      tmpPath = tmpPath.substr(1);
    }
    const parts = tmpPath.split('/');
    let indent = 0;
    target._basePaths[target._basePaths.length] = path;
    if (parts.length > 1 && !this.renderFullPaths) {
      const lowerParts = parts.slice(0, parts.length - 1);
      if (lowerParts.length) {
        for (let i = lowerParts.length - 1; i >= 0; i--) {
          const currentPath = `/${lowerParts.slice(0, i + 1).join('/')}`;
          const previousBasePathItem =
            target._basePaths[target._basePaths.length - 2];
          if (
            previousBasePathItem &&
            (previousBasePathItem === currentPath ||
              previousBasePathItem.startsWith(`${currentPath}/`))
          ) {
            indent++;
          }
        }
      }
    }
    if (!name) {
      result.renderPath = false;
      if (indent > 0) {
        try {
          name = computePathName(path, parts, indent, target._basePaths);
        } catch (_) {
          name = path;
        }
      } else {
        name = path;
      }
    } else {
      result.renderPath = true;
    }
    const id = item['@id'];
    const key = this._getAmfKey(vocabularies.apiContract.supportedOperation);
    const operations = this._ensureArray(item[key]) || [];
    const methods = operations.map(op => this[createOperationModel](op));
    result.label = String(name);
    result.id = id;
    result.indent = indent;
    result.methods = methods;
    target.endpoints.push(result);
  }

  /**
   * Creates the view model for an optation.
   *
   * @param {any} item Operation AMF model
   * @return {MethodItem} Method view model
   */
  [createOperationModel](item) {
    const label = /** @type string */ (this._getValue(item, this.ns.aml.vocabularies.core.name));
    const methodKey = this.ns.aml.vocabularies.apiContract.method;
    const id = item['@id'];
    const method = /** @type string */ (this._getValue(item, methodKey));
    return {
      label,
      id,
      method,
    };
  }

  /**
   * Click handler for section name item.
   * Toggles the view.
   *
   * @param {MouseEvent} e
   */
  [toggleSectionHandler](e) {
    // @ts-ignore: this is for polyfills
    const path = e.composedPath();
    /** @type HTMLElement */
    let node;
    const test = true;
    while (test) {
      node = /** @type HTMLElement */ (path.shift());
      if (!node) {
        return;
      }
      if (node.dataset && node.dataset.section) {
        break;
      }
    }
    this[toggleSection](node);
  }

  /**
   * @param {HTMLElement} node 
   */
  [toggleSection](node) {
    const { section } = node.dataset;
    const openedKey = `${section}Opened`;
    this[openedKey] = !this[openedKey];
  }

  /**
   * Selects new item in the menu.
   *
   * @param {HTMLElement} node
   */
  [selectItem](node) {
    const id = node.dataset.apiId;
    const { shape } = node.dataset;
    this.domainType = undefined; // cancels event firing
    this.domainId = id;
    this.domainType = /** @type SelectionType */ (shape); // now fire event
    this[selectedItemValue] = node;
    this[focusedItemPrivate] = node;
  }

  /**
   * Toggles selection state of a node that has `data-api-id` set to
   * `id`.
   *
   * @param {string} id Selected node id.
   * @return {string|undefined} Type of selected node.
   */
  [addSelection](id) {
    if (!this.shadowRoot) {
      return undefined;
    }
    let node = /** @type HTMLElement */ (this.shadowRoot.querySelector(`[data-api-id="${id}"]`));
    if (!node) {
      return undefined;
    }
    if (node.localName === 'anypoint-collapse') {
      node = this.shadowRoot.querySelector(`.operation[data-api-id="${id}"]`);
    } else if (node.className === 'endpoint-name-overview' && this.noOverview) {
      node = this.shadowRoot.querySelector(`.endpoint[data-endpoint-id="${id}"]`);
    }
    if (!node) {
      return undefined;
    }
    node.classList.add('selected');
    if (node.part && node.part.add) {
      node.part.add('api-navigation-list-item-selected');
    }
    let collapse;
    switch (node.dataset.shape) {
      case 'operation':
        collapse = /** @type AnypointCollapseElement */ (node.parentElement);
        this.endpointsOpened = true;
        break;
      case 'endpoint':
        collapse = /** @type AnypointCollapseElement */ (node.parentElement);
        break;
      case 'type':
      case 'documentation':
      case 'security':
        collapse = /** @type AnypointCollapseElement */ (node.parentElement
          .parentElement);
        break;
      default:
        collapse = undefined;
    }
    if (node.dataset.shape === 'operation' || node.dataset.shape === 'endpoint') {
      if (!this[openedOperationsValue].includes(id)) {
        this.toggleOperations(id)
      }
      if (collapse && !this[openedOperationsValue].includes(collapse.dataset.apiId)) {
        this.toggleOperations(collapse.dataset.apiId);
      }
    } else if (collapse && !collapse.opened) {
      collapse.opened = true;
    }
    return node.dataset.shape;
  }

  /**
   * Removes any current selection that may exist.
   */
  [clearSelection]() {
    if (!this.shadowRoot) {
      return;
    }
    const nodes = this.shadowRoot.querySelectorAll('.selected');
    for (let i = 0, len = nodes.length; i < len; i++) {
      const node = nodes[i];
      node.classList.remove('selected');
      // @ts-ignore
      if (node.part && node.part.remove) {
        // @ts-ignore
        node.part.remove('api-navigation-list-item-selected');
      }
    }
  }

  /**
   * Toggles endpoint operations list.
   *
   * @param {string} id ID of the endpoint.
   */
  toggleOperations(id) {
    const operationIndex = this[openedOperationsValue].indexOf(id);
    if (operationIndex !== -1) {
      this[openedOperationsValue].splice(operationIndex, 1)
    } else {
      this[openedOperationsValue].push(id)
    }
    this.requestUpdate();
  }

  /**
   * Updates the state of selected element when `selected` changes.
   *
   * @param {string} current New selection
   */
  [selectedChanged](current) {
    this[clearSelection]();
    this[cleanPassiveSelection]();
    if (current) {
      this[addSelection](current);
    }
  }

  /**
   * When `query` property change it runs the filter function
   * in a debouncer set for ~50 ms.
   */
  [queryChanged]() {
    if (this[queryDebouncer]) {
      return;
    }
    this[queryDebouncer] = true;
    setTimeout(() => {
      this[flushQuery]();
      this[queryDebouncer] = false;
    });
  }

  /**
   * Calls `render()` function on each data repeater that have filterable
   * items.
   * It set's `[queryValue]` property on the element that is beyond
   * Polymer's data binding system so it skips 2 function calls each time
   * it is read. In a repeater filter function that can be a lot.
   *
   * Also the `[queryValue]` is transformed to perform text search.
   */
  [flushQuery]() {
    let q = this.query;
    if (q) {
      q = q.toLowerCase();
    }
    this[queryValue] = q;
    this.requestUpdate();
  }

  /**
   * Dispatches the navigation event when selection change.
   *
   * @param {string} domainId Selected id
   * @param {SelectionType} domainType Type of AMF shape
   */
  [selectionChanged](domainId, domainType) {
    if (!domainType || this.__cancelNavigationEvent) {
      return;
    }
    let endpointId;
    if (domainType === 'operation' && domainId) {
      const node = /** @type HTMLElement */ (this.shadowRoot.querySelector(`.operation[data-api-id="${domainId}"]`));
      if (node) {
        endpointId = node.dataset.parentId;
      }
    }
    NavigationEvents.apiNavigate(this, domainId, domainType, endpointId);
  }

  /**
   * Navigation item click handler.
   * It used to be common function for all clicks inside the element
   * but in tests not all events were handled.
   *
   * @param {MouseEvent} e
   */
  [itemClickHandler](e) {
    const eTarget = /** @type HTMLElement */ (e.target);
    let target;
    if (e.currentTarget) {
      target = /** @type HTMLElement */ (e.currentTarget);
    } else if (eTarget.classList.contains('method-label')) {
      target = /** @type HTMLElement */ (eTarget.parentNode);
    } else {
      target = eTarget;
    }
    this[selectItem](target);
  }

  /**
   * Handler for the navigation event. Updates the selection if dispatched from other element.
   * @param {ApiNavigationEvent} e
   */
  [navigationHandler](e) {
    const path = e.composedPath();
    if (path[0] === this) {
      return;
    }
    this[cleanPassiveSelection]();
    if (e.detail.passive === true) {
      this[handlePassiveNavigation](e.detail);
      return;
    }
    if (this.domainId !== e.detail.domainId) {
      this.__cancelNavigationEvent = true;
      this.domainId = e.detail.domainId;
      this.domainType = e.detail.domainType;
      this.__cancelNavigationEvent = false;
      this.requestUpdate();
    }
  }

  /**
   * @param {ApiNavigationEventDetail} detail 
   */
  [handlePassiveNavigation](detail) {
    if (detail.domainType === 'operation') {
      this[selectMethodPassive](detail.domainId);
    }
  }

  [cleanPassiveSelection]() {
    // Very simple optimization to not query local DOM if we are sure
    // that there's no selection.
    if (!this[hasPassiveSelection]) {
      return;
    }
    const nodes = this.shadowRoot.querySelectorAll('.passive-selected');
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove('passive-selected');
    }
    this[hasPassiveSelection] = false;
  }

  /**
   * @param {string} id 
   */
  [selectMethodPassive](id) {
    const selector = `[data-api-id="${id}"]`;
    const node = this.shadowRoot.querySelector(selector);
    if (!node) {
      return;
    }
    node.classList.add('passive-selected');
    this[hasPassiveSelection] = true;
    const collapse = /** @type AnypointCollapseElement */ (node.parentElement);
    if (!collapse.opened) {
      collapse.opened = true;
    }
  }

  /**
   * Endpoint label click handler.
   * Toggles endpoint's methods list.
   *
   * @param {MouseEvent} e
   */
  [toggleEndpoint](e) {
    // @ts-ignore
    const path = (e.composedPath && e.composedPath()) || e.path;
    const test = true;
    while (test) {
      const node = path.shift();
      if (!node) {
        return;
      }
      if (node.nodeType !== 1) {
        continue;
      }
      if (!node.dataset.endpointId) {
        continue;
      }
      this.toggleOperations(node.dataset.endpointId);
      break;
    }
  }

  /**
   * @param {MouseEvent} e 
   */
  [toggleEndpointDocumentation](e) {
    if (!this.noOverview) {
      return this[toggleEndpoint](e)
    }
  }

  /**
   * @param {MouseEvent} e 
   */
  [toggleEndpointButton](e) {
    if (this.noOverview) {
      return this[toggleEndpoint](e)
    }
  }

  /**
   * Computes `style` attribute value for endpoint item.
   * It sets padding-left property to indent resources.
   * See https://github.com/mulesoft/api-console/issues/571.
   *
   * @param {number} factor Computed indent factor for the resource
   * @param {number} size The size of indentation in pixels.
   * @returns {string} Style attribute value for the item.
   */
  [computeEndpointPadding](factor, size) {
    const padding = this[computeEndpointPaddingLeft]();
    if (factor < 1) {
      return `padding-left: ${padding}px`;
    }
    const result = factor * size + padding;
    return `padding-left: ${result}px`;
  }

  /**
   * @param {number} factor 
   * @param {number} size 
   * @returns {string}
   */
  [computeMethodPadding](factor, size) {
    const padding = this[computeOperationPaddingLeft]();
    if (factor < 1) {
      return `padding-left: ${padding}px`;
    }
    const result = factor * size + padding;
    return `padding-left: ${result}px`;
  }

  /**
   * Computes operation list item left padding from CSS variables.
   * @return {number}
   */
  [computeOperationPaddingLeft]() {
    let paddingLeft;
    const prop = '--api-navigation-operation-item-padding-left';
    const defaultPadding = 24;
    // @ts-ignore
    if (window.ShadyCSS) {
      // @ts-ignore
      paddingLeft = window.ShadyCSS.getComputedStyleValue(this, prop);
    } else {
      paddingLeft = getComputedStyle(this).getPropertyValue(prop);
    }
    if (!paddingLeft) {
      return defaultPadding;
    }
    paddingLeft = paddingLeft.replace('px', '').trim();
    const result = Number(paddingLeft);
    if (Number.isNaN(result)) {
      return defaultPadding;
    }
    return result;
  }

  /**
   * Computes endpoint list item left padding from CSS variables.
   * @return {Number}
   */
  [computeEndpointPaddingLeft]() {
    let padding;
    const prop = '--api-navigation-list-item-padding';
    const defaultPadding = 16;
    // @ts-ignore
    if (window.ShadyCSS) {
      // @ts-ignore
      padding = window.ShadyCSS.getComputedStyleValue(this, prop);
    } else {
      padding = getComputedStyle(this).getPropertyValue(prop);
    }
    if (!padding) {
      return defaultPadding;
    }
    const parts = padding.split(' ');
    let paddingLeftValue;
    switch (parts.length) {
      case 1:
        paddingLeftValue = parts[0];
        break;
      case 2:
        paddingLeftValue = parts[1];
        break;
      case 3:
        paddingLeftValue = parts[1];
        break;
      case 4:
        paddingLeftValue = parts[3];
        break;
      default:
        return defaultPadding;
    }
    if (!paddingLeftValue) {
      return defaultPadding;
    }
    paddingLeftValue = paddingLeftValue.replace('px', '').trim();
    const result = Number(paddingLeftValue);
    if (Number.isNaN(result)) {
      return defaultPadding;
    }
    return result;
  }

  /**
   * Returns filtered list of items to render in the menu list.
   * When `query` is set it tests `label` property of each item if it contains
   * the query. Otherwise it returns all items.
   * @param {NavigationItem[]} items Name of the source property keeping array values to render.
   * @returns {Array<TypeItem|DocumentationItem|SecurityItem|EndpointItem>|undefined}
   */
  [getFilteredType](items) {
    if (!Array.isArray(items) || !items.length) {
      return undefined;
    }
    const q = this[queryValue];
    if (!q) {
      return items;
    }
    return items.filter(item => {
      if (typeof item.label !== 'string') {
        return false;
      }
      return item.label.toLowerCase().indexOf(q) !== -1;
    });
  }

  /**
   * Returns a list of endpoints to render.
   * When `query` is set it returns filtered list of endpoints for given query.
   * Otherwise it returns all endpoints.
   * @returns {EndpointItem[]|undefined} Filtered list of endpoints
   */
  [getFilteredEndpoints]() {
    const value = this[endpointsValue];
    if (!value || !value.length) {
      return undefined;
    }
    const q = this[queryValue];
    if (!q) {
      return value;
    }

    const result = [];
    for (let i = 0, len = value.length; i < len; i++) {
      const endpoint = value[i];
      // If the endpoint's path or label matches the query include whole item
      if (
        (endpoint.path || '').toLowerCase().indexOf(q) !== -1 ||
        (endpoint.label || '').toLowerCase().indexOf(q) !== -1
      ) {
        result[result.length] = endpoint;
        continue;
      }
      // otherwise check all methods and only include matched methods. If none match
      // then do not include endpoint.
      const eMethods = endpoint.methods;
      if (!eMethods || !eMethods.length) {
        continue;
      }
      const methods = [];
      for (let j = 0, mLen = eMethods.length; j < mLen; j++) {
        const method = eMethods[j];
        if (
          (method.label || '').toLowerCase().indexOf(q) !== -1 ||
          method.method.indexOf(q) !== -1
        ) {
          methods[methods.length] = method;
        }
      }
      if (methods.length) {
        const copy = { ...endpoint };
        copy.methods = methods;
        result[result.length] = copy;
      }
    }
    return result;
  }

  /**
   * Closes all `anypoint-collapse` elements
   */
  [closeCollapses]() {
    if (this[openedOperationsValue].length > 0) {
      this[openedOperationsValue] = /** @type string[] */ ([]);
      this.requestUpdate();
    }
  }

  /**
   * A handler for the focus event on this element.
   * @param {FocusEvent} e
   */
  [focusHandler](e) {
    if (this[shiftTabPressed]) {
      // do not focus the menu itself
      return;
    }
    // @ts-ignore
    const path = (e.composedPath && e.composedPath()) || e.path;
    const rootTarget = path[0];
    if (
      rootTarget !== this &&
      typeof rootTarget.tabIndex !== 'undefined' &&
      !this.contains(rootTarget)
    ) {
      return;
    }
    this[focusedItemPrivate] = null;
    if (this.selectedItem) {
      this.selectedItem.focus();
      this[focusedItemPrivate] = this.selectedItem;
    } else {
      this.focusNext();
    }
  }

  /**
   * Focuses on the previous item in the navigation.
   */
  focusPrevious() {
    const items = this[listActiveItems]();
    const { length } = items;
    const curFocusIndex = items.indexOf(this[focusedItemPrivate]);
    for (let i = 1; i < length + 1; i++) {
      const item = items[(curFocusIndex - i + length) % length];
      if (!item.hasAttribute('disabled')) {
        const owner = (item.getRootNode && item.getRootNode()) || document;
        this[focusedItemPrivate] = item;
        // Focus might not have worked, if the element was hidden or not
        // focusable. In that case, try again.
        // @ts-ignore
        if (owner.activeElement === item) {
          return;
        }
      }
    }
  }

  /**
   * Focuses on the next item in the navigation.
   */
  focusNext() {
    const items = this[listActiveItems]();
    const { length } = items;
    const curFocusIndex = items.indexOf(this[focusedItemPrivate]);
    for (let i = 1; i < length + 1; i++) {
      const item = items[(curFocusIndex + i) % length];
      if (!item.hasAttribute('disabled')) {
        const owner = (item.getRootNode && item.getRootNode()) || document;
        this[focusedItemPrivate] = item;
        // Focus might not have worked, if the element was hidden or not
        // focusable. In that case, try again.
        // @ts-ignore
        if (owner.activeElement === item) {
          return;
        }
      }
    }
  }

  /**
   * Resets all tabindex attributes to the appropriate value based on the
   * current selection state. The appropriate value is `0` (focusable) for
   * the default selected item, and `-1` (not keyboard focusable) for all
   * other items. Also sets the correct initial values for aria-selected
   * attribute, true for default selected item and false for others.
   */
  [resetTabindices]() {
    const { selectedItem } = this;
    const items = this[listActiveItems]();
    items.forEach(item => {
      item.setAttribute('tabindex', item === selectedItem ? '0' : '-1');
    });
  }

  /**
   * Lists all HTML elements that are currently rendered in the view.
   * @return {Element[]} Currently rendered items.
   */
  [listActiveItems]() {
    if (this[itemsValue]) {
      return this[itemsValue];
    }
    let result = [];
    if (this.summary) {
      const node = this.shadowRoot.querySelector('.list-item.summary');
      if (node) {
        result[result.length] = node;
      }
    }
    if (this.hasEndpoints) {
      const node = this.shadowRoot.querySelector('.endpoints .section-title');
      if (node) {
        result[result.length] = node;
      }
      let nodes;
      if (this.noOverview) {
        nodes = this.shadowRoot.querySelectorAll(
          '.endpoints .list-item.endpoint .path-details,.endpoint-toggle-button'
        );
      } else {
        nodes = this.shadowRoot.querySelectorAll(
          '.endpoints .list-item.endpoint'
        );
      }
      for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];
        result[result.length] = item;
        const collapse = this.noOverview ? item.parentElement.nextElementSibling : item.nextElementSibling;
        if (collapse.localName !== 'anypoint-collapse') {
          continue;
        }
        if (!item.classList.contains('path-details')) {
          const children = collapse.querySelectorAll('.list-item.operation');
          if (children.length) {
            result = result.concat(Array.from(children));
          }
        }
      }
    }
    if (this.hasDocs) {
      const children = this[listSectionActiveNodes]('.documentation');
      result = result.concat(Array.from(children));
    }
    if (this.hasTypes) {
      const children = this[listSectionActiveNodes]('.types');
      result = result.concat(Array.from(children));
    }
    if (this.hasSecurity) {
      const children = this[listSectionActiveNodes]('.security');
      result = result.concat(Array.from(children));
    }
    this[itemsValue] = result.length ? result : undefined;
    return result;
  }

  /**
   * @param {string} selector The prefix for the query selector
   * @return {Element[]} Nodes returned from query function.
   */
  [listSectionActiveNodes](selector) {
    let result = [];
    const node = this.shadowRoot.querySelector(`${selector} .section-title`);
    if (node) {
      result[result.length] = node;
      const collapse = node.nextElementSibling;
      if (collapse) {
        const children = collapse.querySelectorAll('.list-item');
        if (children.length) {
          result = result.concat(Array.from(children));
        }
      }
    }
    return result;
  }

  /**
   * Handler for the keydown event.
   * @param {KeyboardEvent} e
   */
  [keydownHandler](e) {
    if (e.key === 'ArrowDown') {
      this[onDownKey](e);
    } else if (e.key === 'ArrowUp') {
      this[onUpKey](e);
    } else if (e.key === 'Tab' && e.shiftKey) {
      this[onShiftTabDown]();
    } else if (e.key === 'Escape') {
      this[onEscKey]();
    } else if (e.key === ' ' || e.code === 'Space') {
      this[onSpace](e);
    } else if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      this[onSpace](e);
    }
    e.stopPropagation();
  }

  /**
   * Handler that is called when the up key is pressed.
   *
   * @param {KeyboardEvent} e A key combination event.
   */
  [onUpKey](e) {
    this.focusPrevious();
    e.preventDefault();
  }

  /**
   * Handler that is called when the down key is pressed.
   *
   * @param {KeyboardEvent} e A key combination event.
   */
  [onDownKey](e) {
    e.preventDefault();
    e.stopPropagation();
    this.focusNext();
  }

  /**
   * Handler that is called when the esc key is pressed.
   */
  [onEscKey]() {
    const { focusedItem } = this;
    if (focusedItem) {
      focusedItem.blur();
    }
  }

  /**
   * A handler for the space bar key down.
   * @param {KeyboardEvent} e
   */
  [onSpace](e) {
    e.preventDefault();
    e.stopPropagation();
    // @ts-ignore
    const path = (e.composedPath && e.composedPath()) || e.path;
    const target = /** @type HTMLElement */ (path && path[0]);
    if (!target) {
      return;
    }
    const { classList } = target;
    if (classList.contains('section-title')) {
      this[toggleSection](target);
    } else if (
      classList.contains('list-item') &&
      classList.contains('endpoint')
    ) {
      this.toggleOperations(target.dataset.endpointId);
    } else if (classList.contains('list-item')) {
      this[selectItem](target);
    }
  }

  /**
   * Handler that is called when a shift+tab keypress is detected by the menu.
   */
  [onShiftTabDown]() {
    const oldTabIndex = this.getAttribute('tabindex');
    this[shiftTabPressed] = true;
    this[focusedItemPrivate] = null;
    this.setAttribute('tabindex', '-1');
    setTimeout(() => {
      this.setAttribute('tabindex', oldTabIndex);
      this[shiftTabPressed] = false;
    }, 1);
  }

  render() {
    const { styles } = this;
    return html`
    <style>${styles}</style>
    <div class="wrapper" role="menu" aria-label="Navigate the API">
      ${this[summaryTemplate]()}
      ${this[endpointsTemplate]()} 
      ${this[documentationTemplate]()}
      ${this[typesTemplate]()} 
      ${this[securityTemplate]()}
    </div> `;
  }

  /**
   * @return {TemplateResult|string} The template for the summary entry.
   */
  [summaryTemplate]() {
    if (!this.summaryRendered) {
      return '';
    }
    return html`
    <section class="summary">
      <div
        part="api-navigation-list-item"
        class="list-item summary"
        role="menuitem"
        tabindex="0"
        data-api-id="summary"
        data-shape="summary"
        @click="${this[itemClickHandler]}"
      >
        ${this.summaryLabel}
      </div>
    </section>
    `;
  }

  /**
   * Renders a template for endpoints and methods list.
   * @return {TemplateResult|string}
   */
  [endpointsTemplate]() {
    if (!this.hasEndpoints) {
      return '';
    }
    const items = this[getFilteredEndpoints]();
    if (!items || !items.length) {
      return '';
    }

    const sectionLabel = this._isWebAPI(this.amf) ? 'Endpoints' : 'Channels';
    const lowercaseSectionLabel = sectionLabel.toLowerCase();

    return html` <section
      class="endpoints"
      ?data-opened="${this.endpointsOpened}"
    >
      <div
        class="section-title"
        data-section="endpoints"
        @click="${this[toggleSectionHandler]}"
        title="Toggle ${lowercaseSectionLabel} list"
        aria-haspopup="true"
        role="menuitem"
      >
        <div class="title-h3">${sectionLabel}</div>
        <anypoint-icon-button
          part="toggle-button"
          class="toggle-button"
          aria-label="Toggle ${lowercaseSectionLabel}"
          .noink="${this.noink}"
          ?anypoint="${this.anypoint}"
          tabindex="-1"
          data-toggle="endpoints"
        >
          <span class="icon">${keyboardArrowDown}</span>
        </anypoint-icon-button>
      </div>
      <anypoint-collapse
        .opened="${this.endpointsOpened}"
        aria-hidden="${this.endpointsOpened ? 'false' : 'true'}"
        role="menu"
      >
        <div class="children">
          ${items.map(item => this[endpointTemplate](item))}
        </div>
      </anypoint-collapse>
    </section>`;
  }

  /**
   * @param {EndpointItem} item
   * @return {TemplateResult|string} Template for an endpoint overview.
   */
  [overviewTemplate](item) {
    if (this.noOverview) {
      return '';
    }
    const style = /** @type string */ (this[computeMethodPadding](item.indent, this.indentSize));
    return html`
    <div
      part="api-navigation-list-item"
      class="list-item operation"
      role="menuitem"
      tabindex="0"
      data-api-id="${item.id}"
      data-shape="resource"
      data-endpoint-overview="${item.path}"
      @click="${this[itemClickHandler]}"
      style="${style}"
    >
      Overview
    </div>`
  }

  /**
   * @param {EndpointItem} item
   * @return {TemplateResult} Template for an endpoint path.
   */
  [endpointPathTemplate](item) {
    const { noOverview } = this;
    return html`<div class="path-details">
        ${noOverview ?
      html`<div class="endpoint-name-overview" @click="${this[itemClickHandler]}" data-api-id="${item.id}" data-shape="resource">${item.label}</div>`
      : html`<div class="endpoint-name">${item.label}</div>`}
        ${computeRenderPath(this.allowPaths, item.renderPath)
      ? html`<div class="path-name">${item.path}</div>`
      : undefined}
      </div>`;
  }

    /**
   * @param {EndpointItem} item
   * @return {TemplateResult} Template for an endpoint item.
   */
  [endpointTemplate](item) {
    const isEndpointOpened = this[openedOperationsValue].includes(item.id);
    return html`
    <div
      part="api-navigation-list-item"
      class="list-item endpoint"
      data-endpoint-id="${item.id}"
      data-endpoint-path="${item.path}"
      ?data-endpoint-opened="${isEndpointOpened}"
      @click="${this[toggleEndpointDocumentation]}"
      title="Toggle endpoint documentation"
      style="${/** @type string */ (this[computeEndpointPadding](item.indent, this.indentSize))}"
      role="menuitem"
      aria-haspopup="true"
    >
      ${this[endpointPathTemplate](item)}
      <anypoint-icon-button
        part="api-navigation-endpoint-toggle-button toggle-button"
        class="endpoint-toggle-button"
        aria-label="Toggle endpoint"
        .noink="${this.noink}"
        ?anypoint="${this.anypoint}"
        tabindex="-1"
        @click="${this[toggleEndpointButton]}"
      >
        <span class="icon">${keyboardArrowDown}</span>
      </anypoint-icon-button>
    </div>
    <anypoint-collapse
      part="api-navigation-operation-collapse"
      class="operation-collapse"
      data-api-id="${item.id}"
      ?data-endpoint-opened="${isEndpointOpened}"
      role="menu"
      .opened="${isEndpointOpened}"
    >
      ${this[overviewTemplate](item)}
      ${item.methods.map(methodItem =>
        this[methodTemplate](item, methodItem)
      )}
    </anypoint-collapse>`;
  }

  /**
   * @param {EndpointItem} endpointItem
   * @param {MethodItem} operation
   * @return {TemplateResult}
   */
  [methodTemplate](endpointItem, operation) {
    const style = /** @type string */ (this[computeMethodPadding](endpointItem.indent, this.indentSize));
    return html`<div
      part="api-navigation-list-item"
      class="list-item operation"
      role="menuitem"
      tabindex="0"
      data-api-id="${operation.id}"
      data-parent-id="${endpointItem.id}"
      data-shape="operation"
      @click="${this[itemClickHandler]}"
      style="${style}"
    >
      <span class="method-label" data-method="${operation.method}"
        >${operation.method}</span
      >
      ${operation.label}
    </div>`;
  }

  /**
   * Renders a template for documentation list.
   * @return {TemplateResult|string}
   */
  [documentationTemplate]() {    
    if (!this.hasDocs) {
      return '';
    }
    const items = /** @type DocumentationItem[] */ (this[getFilteredType](this[docsValue]));
    if (!items || !items.length) {
      return '';
    }

    return html`
      <section class="documentation" ?data-opened="${this.docsOpened}">
        <div
          class="section-title"
          data-section="docs"
          @click="${this[toggleSectionHandler]}"
          title="Toggle documentation list"
        >
          <div class="title-h3">Documentation</div>
          <anypoint-icon-button
            part="toggle-button"
            class="toggle-button"
            noink="${this.noink}"
            @click="${this[itemClickHandler]}"
            aria-label="Toggle documents"
            ?anypoint="${this.anypoint}"
            tabindex="-1"
          >
            <span class="icon">${keyboardArrowDown}</span>
          </anypoint-icon-button>
        </div>
        <anypoint-collapse .opened="${this.docsOpened}">
          <div class="children">
            ${items.map(item => this[documentationItemTemplate](item))}
          </div>
        </anypoint-collapse>
      </section>
    `;
  }

  /**
   * @param {DocumentationItem} item
   * @return {TemplateResult} Template for an docs item
   */
  [documentationItemTemplate](item) {
    if (item.isExternal) {
      return html`<a
        href="${item.url}"
        target="_blank"
        part="api-navigation-list-item"
        class="list-item"
        tabindex="0"
        data-api-id="${item.id}"
        data-shape="documentation"
      >
        ${item.label}
        <span class="icon new-tab" title="Opens in a new tab"
          >${openInNew}</span
        >
      </a>`;
    }
    return html`<div
      part="api-navigation-list-item"
      class="list-item"
      role="menuitem"
      tabindex="0"
      data-api-id="${item.id}"
      data-shape="documentation"
      @click="${this[itemClickHandler]}"
    >
      ${item.label}
    </div>`;
  }

  /**
   * Renders a template for types list.
   * @return {TemplateResult|string}
   */
  [typesTemplate]() {
    if (!this.hasTypes) {
      return '';
    }
    const items = this[getFilteredType](this[typesValue]);
    if (!items || !items.length) {
      return '';
    }

    return html`
      <section class="types" ?data-opened="${this.typesOpened}">
        <div
          class="section-title"
          data-section="types"
          @click="${this[toggleSectionHandler]}"
          title="Toggle types list"
        >
          <div class="title-h3">Types</div>
          <anypoint-icon-button
            part="toggle-button"
            class="toggle-button"
            noink="${this.noink}"
            aria-label="Toggle types"
            ?anypoint="${this.anypoint}"
            tabindex="-1"
            data-toggle="types"
          >
            <span class="icon">${keyboardArrowDown}</span>
          </anypoint-icon-button>
        </div>
        <anypoint-collapse .opened="${this.typesOpened}">
          <div class="children">
            ${items.map(
              item =>
                html`<div
                  part="api-navigation-list-item"
                  class="list-item"
                  role="menuitem"
                  tabindex="0"
                  data-api-id="${item.id}"
                  data-shape="schema"
                  data-type-name="${item.label}"
                  @click="${this[itemClickHandler]}"
                >
                  ${item.label}
                </div>`
            )}
          </div>
        </anypoint-collapse>
      </section>
    `;
  }

  /**
   * @return {TemplateResult|string} template for security schemes list.
   */
  [securityTemplate]() {
    if (!this.hasSecurity) {
      return '';
    }
    const items = this[getFilteredType](this[securityValue]);
    if (!items || !items.length) {
      return '';
    }

    return html` <section
      class="security"
      ?data-opened="${this.securityOpened}"
    >
      <div
        class="section-title"
        data-section="security"
        @click="${this[toggleSectionHandler]}"
        title="Toggle security list"
      >
        <div class="title-h3">Security</div>
        <anypoint-icon-button
          part="toggle-button"
          class="toggle-button"
          noink="${this.noink}"
          aria-label="Toggle security"
          ?anypoint="${this.anypoint}"
          tabindex="-1"
          data-toggle="security"
        >
          <span class="icon">${keyboardArrowDown}</span>
        </anypoint-icon-button>
      </div>
      <anypoint-collapse .opened="${this.securityOpened}">
        <div class="children">
          ${items.map(
            item => html`<div
              part="api-navigation-list-item"
              class="list-item"
              role="menuitem"
              tabindex="0"
              data-api-id="${item.id}"
              data-shape="security"
              data-security-name="${item.label}"
              @click="${this[itemClickHandler]}"
            >
              ${item.label}
            </div>`
          )}
        </div>
      </anypoint-collapse>
    </section>`;
  }
}
