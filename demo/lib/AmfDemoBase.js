import { ApiDemoPage } from '@advanced-rest-client/arc-demo-helper';
import { MonacoLoader } from '@advanced-rest-client/monaco-support';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import { DomEventsAmfStore } from '../../src/store/DomEventsAmfStore.js';

export class AmfDemoBase extends ApiDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'initialized', 'loaded',
    ]);
    this.loaded = false;
    this.initialized = false;
    this.renderViewControls = true;
    this.autoLoad();
  }

  async autoLoad() {
    await this.loadMonaco();
    this.initialized = true;
  }

  async loadMonaco() {
    const base = `../node_modules/monaco-editor/`;
    MonacoLoader.createEnvironment(base);
    await MonacoLoader.loadMonaco(base);
    await MonacoLoader.monacoReady();
  }

  /** @param {string} file */
  async _loadFile(file) {
    this.loaded = false;
    await super._loadFile(file);
    if (this.store) {
      this.store.unlisten();
    }
    this.store = new DomEventsAmfStore(this.amf);
    this.store.listen();
    this.loaded = true;
  }
}
