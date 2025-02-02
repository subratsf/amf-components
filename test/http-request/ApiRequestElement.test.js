import { fixture, assert, html, nextFrame, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import { AmfLoader } from '../AmfLoader.js';
import '../../define/api-request.js';
import { loadMonaco } from '../MonacoSetup.js';
import { EventTypes } from '../../src/events/EventTypes.js';
import { NavigationEvents } from '../../src/events/NavigationEvents.js';
import { propagateResponse, responseHandler } from '../../src/elements/ApiRequestElement.js';
import { DomEventsAmfStore } from '../../src/store/DomEventsAmfStore.js';

/** @typedef {import('../../src/helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../../').ApiRequestElement} ApiRequestElement */
/** @typedef {import('../../').ApiRequestEditorElement} ApiRequestEditorElement */
/** @typedef {import('../../src/types').ApiConsoleResponse} ApiConsoleResponse */

describe('ApiRequestElement', () => {
  const store = new DomEventsAmfStore(window);
  store.listen();

  /** @type AmfLoader */
  let loader;
  before(async () => {
    await loadMonaco();
    loader = new AmfLoader();
  });

  /**
   * @param {string=} domainId
   * @returns {Promise<ApiRequestElement>}
   */
  async function basicFixture(domainId) {
    const element = /** @type ApiRequestElement */ (await fixture(html`<api-request .domainId="${domainId}"></api-request>`));
    await aTimeout(2);
    return element;
  }

  /**
   * @param {string=} domainId
   * @returns {Promise<ApiRequestElement>}
   */
  async function proxyFixture(domainId) {
    const element = /** @type ApiRequestElement */ (await fixture(
      html`<api-request .domainId="${domainId}" proxy="https://proxy.domain.com/"></api-request>`
    ));
    await aTimeout(2);
    return element;
  }

  /**
   * @param {string=} domainId
   * @returns {Promise<ApiRequestElement>}
   */
  async function proxyEncFixture(domainId) {
    const element = /** @type ApiRequestElement */ (await fixture(html`<api-request
    .domainId="${domainId}"
    proxy="https://proxy.domain.com/"
    proxyEncodeUrl></api-request>`));
    await aTimeout(2);
    return element;
  }

  /**
   * @param {string=} domainId
   * @returns {Promise<ApiRequestElement>}
   */
  async function addHeadersFixture(domainId) {
    const headers = [{"name": "x-test", "value": "header-value"}];
    const element = /** @type ApiRequestElement */ (await fixture(html`<api-request .domainId="${domainId}" .appendHeaders="${headers}"></api-request>`));
    await aTimeout(2);
    return element;
  }

  /**
   * @param {string=} domainId
   * @returns {Promise<ApiRequestElement>}
   */
  async function navigationFixture(domainId) {
    const element = /** @type ApiRequestElement */ (await fixture(
      html`<api-request .domainId="${domainId}" handleNavigationEvents></api-request>`
    ));
    await aTimeout(2);
    return element;
  }

  function appendRequestData(element, request={}) {
    const editor = /** @type ApiRequestEditorElement */ (element.shadowRoot.querySelector('api-request-editor'));
    editor.url = request.url || 'https://domain.com';
  }

  describe('Initialization', () => {
    /** @type AmfDocument */
    let model;
    before(async () => {
      model = await loader.getGraph(true);
      store.amf = model;
    });

    it('can be constructed with document.createElement', () => {
      const panel = document.createElement('api-request');
      assert.ok(panel);
    });

    it('hasResponse is false', async () => {
      const element = await basicFixture();
      assert.isFalse(element.hasResponse);
    });

    it('api-request is dispatched', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const element = await basicFixture(method['@id']);
      appendRequestData(element);
      const spy = sinon.spy();
      element.addEventListener('api-request', spy);
      const editor = element.shadowRoot.querySelector('api-request-editor');
      editor.execute();
      assert.isTrue(spy.called);
    });
  });

  describe('Proxy settings', () => {
    /** @type AmfDocument */
    let model;
    before(async () => {
      model = await loader.getGraph(true);
      store.amf = model;
    });

    it('changes URL in the api request event', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const element = await proxyFixture(method['@id']);
      const editor = element.shadowRoot.querySelector('api-request-editor');

      const spy = sinon.spy();
      element.addEventListener(EventTypes.Request.apiRequest, spy);
      editor.execute();
      const { url } = element.shadowRoot.querySelector('api-request-editor').serialize();
      assert.equal(
        spy.args[0][0].detail.url,
        `https://proxy.domain.com/${url}`
      );
    });

    it('encodes the original URL', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const element = await proxyEncFixture(method['@id']);
      appendRequestData(element);
      const spy = sinon.spy();
      element.addEventListener(EventTypes.Request.apiRequest, spy);
      const editor = element.shadowRoot.querySelector('api-request-editor');
      editor.execute();
      const { url } = element.shadowRoot.querySelector('api-request-editor').serialize();
      assert.equal(
        spy.args[0][0].detail.url,
        `https://proxy.domain.com/${encodeURIComponent(url)}`
      );
    });
  });

  describe('Headers settings', () => {
    /** @type AmfDocument */
    let model;
    before(async () => {
      model = await loader.getGraph(true);
      store.amf = model;
    });

    it('adds headers to the request', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const element = await addHeadersFixture(method['@id']);
      const spy = sinon.spy();
      element.addEventListener(EventTypes.Request.apiRequest, spy);
      const editor = element.shadowRoot.querySelector('api-request-editor');
      editor.execute();
      assert.equal(spy.args[0][0].detail.headers, 'x-people-op-id: 9719fa6f-c666-48e0-a191-290890760b30\nx-rate-client-id: \nx-test: header-value');
    });

    it('replaces headers in the request', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const element = await addHeadersFixture(method['@id']);
      appendRequestData(element, {
        headers: 'x-test: other-value',
      });
      const spy = sinon.spy();
      element.addEventListener(EventTypes.Request.apiRequest, spy);
      const editor = element.shadowRoot.querySelector('api-request-editor');
      editor.execute();
      assert.equal(spy.args[0][0].detail.headers, 'x-people-op-id: 9719fa6f-c666-48e0-a191-290890760b30\nx-rate-client-id: \nx-test: header-value');
    });
  });

  describe('Response handling', () => {
    /**
     * @param {ApiRequestElement} element
     */
    function propagate(element) {
      const detail = /** @type ApiConsoleResponse */ ({
        request: {
          url: 'https://domain.com/',
          method: 'GET',
          headers: 'accept: text/plain',
        },
        response: {
          status: 200,
          statusText: 'OK',
          payload: 'Hello world',
          headers: 'content-type: text/plain',
        },
        loadingTime: 124.12345678,
        isError: false,
      });
      element[propagateResponse](detail);
    }
    /** @type ApiRequestElement */
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('request is set', () => {
      propagate(element);
      assert.typeOf(element.request, 'object');
    });

    it('response is set', () => {
      propagate(element);
      assert.typeOf(element.response, 'object');
    });

    it('Changing selection clears response', () => {
      propagate(element);
      element.domainId = 'test';
      assert.isUndefined(element.request);
      assert.isUndefined(element.response);
    });

    it('Calling clearResponse() clears response', () => {
      propagate(element);
      element.clearResponse();
      assert.isUndefined(element.request);
      assert.isUndefined(element.response);
    });
  });

  describe('Automated navigation', () => {
    let element = /** @type ApiRequestElement */ (null);

    beforeEach(async () => {
      element = await navigationFixture();
    });

    it('sets the "domainId" when the domainType is "operation"', () => {
      const id = '%2Ftest-parameters%2F%7Bfeature%7D/get';
      NavigationEvents.apiNavigate(document.body, id, 'operation');
      assert.equal(element.domainId, id);
    });

    it('"does not set the "domainId" when type is not "operation"', () => {
      const id = '%2Ftest-parameters%2F%7Bfeature%7D';
      NavigationEvents.apiNavigate(document.body, id, 'resource');
      assert.isUndefined(element.domainId);
    });
  });

  describe('[responseHandler]()', () => {
    let element = /** @type ApiRequestElement */ (null);
    const requestId = 'test-id';
    beforeEach(async () => {
      element = await basicFixture();
      element.lastRequestId = requestId;
    });

    const xhrResponse = {
      request: {
        url: 'https://domain.com/',
        method: 'GET',
        headers: 'accept: text/plain',
      },
      response: {
        status: 200,
        statusText: 'OK',
        payload: 'Hello world',
        headers: 'content-type: text/plain',
      },
      loadingTime: 124.12345678,
      isError: false,
      isXhr: true,
    };

    it('Does nothing when ID is different', () => {
      const spy = sinon.spy(element, propagateResponse);
      const e = new CustomEvent(EventTypes.Request.apiResponse, {
        detail: {
          id: 'otherId',
        },
      });
      // @ts-ignore
      element[responseHandler](e);
      assert.isFalse(spy.called);
    });

    it('Calls _propagateResponse()', () => {
      const detail = { id: requestId, ...xhrResponse };
      const spy = sinon.spy(element, propagateResponse);
      const e = new CustomEvent(EventTypes.Request.apiResponse, {
        detail
      });
      element[responseHandler](e);
      assert.isTrue(spy.called);
      assert.deepEqual(spy.args[0][0], detail);
    });
  });

  describe('Change notification', () => {
    /** @type AmfDocument */
    let model;
    before(async () => {
      model = await loader.getGraph(true);
      store.amf = model;
    });

    it('dispatches the change event when the selected change', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const panel = await basicFixture(method['@id']);
      const spy = sinon.spy();
      panel.addEventListener('change', spy);
      const other = loader.lookupOperation(model, '/people', 'post');
      panel.domainId = other['@id'];
      await aTimeout(2);
      assert.isTrue(spy.called);
    });

    it('dispatches the change event when a value change', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const panel = await basicFixture(method['@id']);
      const spy = sinon.spy();
      panel.addEventListener('change', spy);
      const editor = panel.shadowRoot.querySelector('api-request-editor');
      const input = /** @type HTMLInputElement */ (editor.shadowRoot.querySelector('[name="x-people-op-id"]'));
      input.value = 'test';
      input.dispatchEvent(new Event('change'));
      await nextFrame();
      assert.isTrue(spy.called);
    });
  });

  describe('serialize()', () => {
    /** @type AmfDocument */
    let model;
    before(async () => {
      model = await loader.getGraph(true);
      store.amf = model;
    });

    it('serializes the current request', async () => {
      const method = loader.lookupOperation(model, '/people', 'get');
      const panel = await basicFixture(method['@id']);
      const result = panel.serialize();
      assert.include(result.url, '/people');
    });
  });
});
