import { html } from 'lit-html';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-dialog/anypoint-dialog.js';
import '@anypoint-web-components/anypoint-dialog/anypoint-dialog-scrollable.js';
import '@advanced-rest-client/authorization/oauth2-authorization.js';
import { AmfDemoBase } from './lib/AmfDemoBase.js';
import '../api-request.js';
import '../xhr-simple-request.js';
import '../api-server-selector.js';
import '../api-documentation.js';

/** @typedef {import('../src/events/NavigationEvents').ApiNavigationEvent} ApiNavigationEvent */

class ComponentDemo extends AmfDemoBase {
  constructor() {
    super();

    this.initObservableProperties([
      'domainId', 'domainType', 'operationId',
      'tryItButton', 'tryItPanel',
      'editorOpened', 'editorOperation', 'overrideBaseUri',
      'serverType', 'serverValue', 
      'noServerSelector', 'allowCustomBaseUri',
      'renderCustomServer',
    ]);
    this.componentName = 'api-documentation';
    this.compatibility = false;
    this.editorOpened = false;
    this.editorOperation = undefined;
    this.domainId = undefined;
    this.domainType = undefined;
    this.operationId = undefined;
    this.tryItButton = true;
    this.tryItPanel = false;
    this.overrideBaseUri = false;
    this.redirectUri = `${window.location.origin}/node_modules/@advanced-rest-client/oauth-authorization/oauth-popup.html`;
    // this.redirectUri = 'https://auth.advancedrestclient.com/oauth-popup.html';
    this.renderCustomServer = false;
    this.noServerSelector = false;
    this.allowCustomBaseUri = false;
    this.demoStates = ['Material', 'Anypoint'];
  }

  /**
   * @param {ApiNavigationEvent} e
   */
  _navChanged(e) {
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
  }

  /**
   * @param {CustomEvent} e
   */
  tryitHandler(e) {
    const { id } = e.detail;
    this.editorOperation = id;
    this.editorOpened = true;
  }

  editorCloseHandler() {
    this.editorOperation = undefined;
    this.editorOpened = false;
  }

  contentTemplate() {
    return html`
      <oauth2-authorization></oauth2-authorization>
      <xhr-simple-request></xhr-simple-request>
      <h2>API documentation</h2>
      ${this.demoTemplate()}
    `;
  }

  demoTemplate() {
    const { loaded } = this;
    return html`
    <section class="documentation-section">
      <h3>Interactive demo</h3>
      <p>
        This demo lets you preview the API documentation with various configuration options.
      </p>
      <div class="api-demo-content">
        ${!loaded ? html`<p>Load an API model first.</p>` : this.loadedTemplate()}
      </div>
    </section>
    `;
  }

  loadedTemplate() {
    return html`
    ${this.componentTemplate()}
    ${this.requestEditorDialogTemplate()}
    `;
  }

  componentTemplate() {
    const { demoStates, darkThemeActive, amf, } = this;
    let finalBaseUri;
    if (this.overrideBaseUri) {
      finalBaseUri = 'https://custom.api.com';
    }
    return html`
    <arc-interactive-demo
      .states="${demoStates}"
      @state-changed="${this._demoStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <api-documentation
        slot="content"
        .amf="${amf}"
        .domainId="${this.domainId}"
        .operationId="${this.operationId}"
        .domainType="${this.domainType}"
        .redirectUri="${this.redirectUri}"
        .tryItPanel="${this.tryItPanel}"
        .tryItButton="${this.tryItButton}"
        .noServerSelector="${this.noServerSelector}"
        .allowCustomBaseUri="${this.allowCustomBaseUri}"
        .baseUri="${finalBaseUri}"
        ?anypoint="${this.compatibility}"
        @tryit="${this.tryitHandler}"
      >
        ${this._addCustomServers()}
      </api-documentation>

      <label slot="options" id="mainOptionsLabel">Options</label>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="tryItButton"
        .checked="${this.tryItButton}"
        @change="${this._toggleMainOption}"
      >
        Render try it
      </anypoint-checkbox>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="tryItPanel"
        .checked="${this.tryItPanel}"
        @change="${this._toggleMainOption}"
      >
        Render HTTP editor
      </anypoint-checkbox>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="overrideBaseUri"
        @change="${this._toggleMainOption}"
      >
        Custom base URI
      </anypoint-checkbox>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="noServerSelector"
        @change="${this._toggleMainOption}"
      >
        No server selector
      </anypoint-checkbox>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="allowCustomBaseUri"
        @change="${this._toggleMainOption}"
      >
        Allow custom base URI
      </anypoint-checkbox>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="renderCustomServer"
        @change="${this._toggleMainOption}"
      >
        Custom servers
      </anypoint-checkbox>
    </arc-interactive-demo>
    `;
  }

  _apiListTemplate() {
    const result = [];
    [
      ['demo-api', 'Demo API'],
      ['httpbin', 'httpbin.org'],
      ['google-drive-api', 'Google Drive'],
      ['multi-server', 'Multiple servers'],
      ['array-body', 'Body with array test case'],
      ['nexmo-sms-api', 'Nexmo SMS API'],
      ['appian-api', 'Applian API'],
      ['APIC-15', 'APIC-15'],
      ['oauth1-fragment', 'OAuth 1 fragment'],
      ['oauth2-fragment', 'OAuth 2 fragment'],
      ['documentation-fragment', 'Documentation fragment'],
      ['type-fragment', 'Type fragment'],
      ['lib-fragment', 'Library fragment'],
      ['SE-10469', 'SE-10469'],
      ['SE-11415', 'SE-11415'],
      ['async-api', 'async-api'],
    ].forEach(([file, label]) => {
      result[result.length] = html`
      <anypoint-item data-src="models/${file}-compact.json">${label}</anypoint-item>`;
    });
    return result;
  }

  _addCustomServers() {
    if (!this.renderCustomServer) {
      return '';
    }
    const { compatibility } = this;
    return html`
    <div class="other-section" slot="custom-base-uri">Other options</div>
    <anypoint-item
      slot="custom-base-uri"
      data-value="http://mocking.com"
      ?compatibility="${compatibility}"
    >Mocking service</anypoint-item>
    <anypoint-item
      slot="custom-base-uri"
      data-value="http://customServer.com2"
      ?compatibility="${compatibility}"
    >Custom instance</anypoint-item>`;
  }

  requestEditorDialogTemplate() {
    return html`
    <anypoint-dialog modal @closed="${this.editorCloseHandler}" .opened="${this.editorOpened}" class="request-dialog">
      <h2>API request</h2>
      <anypoint-dialog-scrollable>
        <api-request
          .amf="${this.amf}"
          .domainId="${this.editorOperation}"
          ?compatibility="${this.compatibility}"
          urlLabel
          applyAuthorization
          globalCache
          allowHideOptional
          .redirectUri="${this.redirectUri}"
        >
        </api-request>
      </anypoint-dialog-scrollable>
      <div class="buttons">
        <anypoint-button data-dialog-dismiss>Close</anypoint-button>
      </div>
    </anypoint-dialog>
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
