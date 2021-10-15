import { html } from 'lit-html';
import { DemoPage } from "@advanced-rest-client/arc-demo-helper";
import { MonacoLoader } from "@advanced-rest-client/monaco-support";
import '@anypoint-web-components/anypoint-dropdown-menu/anypoint-dropdown-menu.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import { DomEventsAmfStore } from "../../src/store/DomEventsAmfStore.js";
import { AmfHelperMixin } from "../../src/helpers/AmfHelperMixin.js";
import { EventTypes } from '../../src/events/EventTypes.js';
import { navigate, findRoute } from './route.js';
import '../../api-navigation.js';
import './ApiStyles.js';

/** @typedef {import('lit-html').TemplateResult} TemplateResult */
/** @typedef {import('@anypoint-web-components/anypoint-listbox').AnypointListbox} AnypointListbox */
/** @typedef {import('../../src/events/NavigationEvents').ApiNavigationEvent} ApiNavigationEvent */

const routes = [
  {
    name: 'api-file',
    pattern: 'file/(?<file>[^/]*)'
  },
];

/**
 * Base class for API components demo page.
 * It creates a skeleton for an API demo page.
 */
export class AmfDemoBase extends AmfHelperMixin(DemoPage) {
  get amf() {
    return super.amf;
  }

  set amf(value) {
    super.amf = value;
    this.render();
  }

  constructor() {
    super();
    this.initObservableProperties(["initialized", "loaded", 'selectedFile']);
    this.loaded = false;
    this.initialized = false;
    this.renderViewControls = true;
    /**
     * When set the endpoint section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.endpointsOpened = true;

    /**
     * When set the documentation section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.docsOpened = false;

    /**
     * When set the types section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.typesOpened = false;

    /**
     * When set the security section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.securityOpened = false;

    /**
     * AMF model read from the API model file downloaded after initialization.
     * @type {any}
     */
    this.amf = null;

    /**
     * When set the API Navigation element won't be rendered.
     * @type {Boolean}
     * @default false
     */
    this.noApiNavigation = false;
    /** 
     * Currently loaded file.
     * @type {string}
     */
    this.selectedFile = undefined;
    window.addEventListener(EventTypes.Navigation.apiNavigate, this._navChanged.bind(this));

    document.body.classList.add('api');
    this.autoLoad();
  }

  async autoLoad() {
    await this.loadMonaco();
    this.onRoute();
    window.onpopstate = () => {
      this.onRoute();
    };
    this.initialized = true;
  }

  async loadMonaco() {
    const base = `../node_modules/monaco-editor/`;
    MonacoLoader.createEnvironment(base);
    await MonacoLoader.loadMonaco(base);
    await MonacoLoader.monacoReady();
  }

  /**
   * Called when route change
   */
  onRoute() {
    const url = new URL(window.location.href);
    const hash = url.hash.replace('#', '');
    const result = findRoute(routes, hash);
    if (!result || result.route.name !== 'api-file') {
      return;
    }
    const { file } = result.params;
    if (!file) {
      return;
    }
    this.selectedFile = file;
    this._loadFile(file);
  }

  /**
   * Sets default API selection when the view is rendered.
   */
  firstRender() {
    const url = new URL(window.location.href);
    const hash = url.hash.replace('#', '');
    if (hash && hash.includes('file/')) {
      // had the file already.
      return;
    }
    const node = /** @type any */ (document.getElementById('apiList'));
    if (!node) {
      return;
    }
    node.selected = 0;
  }

  /**
   * Handler for the API selection change
   * @param {Event} e
   */
  _apiChanged(e) {
    const node = /** @type AnypointListbox */ (e.target);
    const item = /** @type HTMLElement */ (node.selectedItem);
    const file = item.dataset.src;
    navigate('file', file);
  }

  /** @param {string} file */
  async _loadFile(file) {
    this.loaded = false;
    const response = await fetch(`./${file}`);
    const data = await response.json();
    this.amf = data;
    if (this.store) {
      // @ts-ignore
      this.store.unlisten();
    }
    this.store = new DomEventsAmfStore(this.amf);
    // @ts-ignore
    this.store.listen();
    this.loaded = true;
  }

  /**
   * This method to be overridden in child class to handle navigation.
   * @param {ApiNavigationEvent} e Dispatched navigation event
   */
   _navChanged(e) {
    const { domainId, domainType } = e.detail;
    // eslint-disable-next-line no-console
    console.log(`Navigation changed. Type: ${domainId}, selected: ${domainType}`);
  }

  /**
   * This method to be overridden in child class to render API options.
   * @return {TemplateResult[]} HTML template for apis dropdown options.
   */
  _apiListTemplate() {
    return [
      ['demo-api', 'Demo API'],
    ].map(([file, label]) => html`
      <anypoint-item data-src="models/${file}-compact.json">${label} - compact model</anypoint-item>
    `);
  }

  /**
   * @return {TemplateResult|string} Template for API navigation element
   */
   _apiNavigationTemplate() {
    if (this.noApiNavigation) {
      return '';
    }
    return html`
    <api-navigation
      summary
      noOverview
      .amf="${this.amf}"
      ?endpointsOpened="${this.endpointsOpened}"
      ?docsOpened="${this.docsOpened}"
      ?typesOpened="${this.typesOpened}"
      ?securityOpened="${this.securityOpened}"
    ></api-navigation>`;
  }
  
  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return {TemplateResult} HTML template for demo header
   */
  headerTemplate() {
    const { componentName, selectedFile } = this;
    return html`
    <header>
      <a href="./index.html" class="header-link"><arc-icon icon="arrowBack"></arc-icon>Demo index</a>
      <anypoint-dropdown-menu
        aria-label="Activate to select demo API"
        aria-expanded="false"
      >
        <label slot="label">Select demo API</label>
        <anypoint-listbox 
          slot="dropdown-content" 
          id="apiList"
          .selected="${selectedFile}"
          @selected-changed="${this._apiChanged}"
          attrForSelected="data-src"
        >
          ${this._apiListTemplate()}
        </anypoint-listbox>
      </anypoint-dropdown-menu>
      ${componentName ? html`<h1 class="api-title">${componentName}</h1>` : ''}
    </header>`;
  }

  /**
   * The page render function. Usually you don't need to use it.
   * It renders the header template, main section, and the content.
   * 
   * @return {TemplateResult}
   */
  pageTemplate() {
    return html`
    ${this.headerTemplate()}
    <section role="main" class="horizontal-section-container centered main">
      ${this._apiNavigationTemplate()}
      <div class="demo-container">
        ${this.contentTemplate()}
      </div>
    </section>`;
  }
}
