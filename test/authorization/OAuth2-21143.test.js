import { fixture, assert, html } from '@open-wc/testing';
import { AmfLoader } from "../AmfLoader.js";
import '../../define/api-authorization-method.js';

/** @typedef {import('../../').ApiAuthorizationMethodElement} ApiAuthorizationMethodElement */
/** @typedef {import('../../src/helpers/api').ApiParametrizedSecurityScheme} ApiParametrizedSecurityScheme */
/** @typedef {import('../../src/helpers/amf').AmfDocument} AmfDocument */

describe('OAuth 2', () => {
  /**
   * @param {AmfDocument} model
   * @param {ApiParametrizedSecurityScheme=} security
   * @return {Promise<ApiAuthorizationMethodElement>} 
   */
  async function methodFixture(model, security) {
    return (fixture(html`<api-authorization-method 
      type="oauth 2" 
      .amf="${model}"
      .security="${security}"
    ></api-authorization-method>`));
  }

  /** @type AmfLoader */
  let store;
  /** @type AmfDocument */
  let model;
  before(async () => {
    store = new AmfLoader();
    model = await store.getGraph(false, '21143');
  });

  /**
   * @param {string} path
   * @param {string} method
   * @returns {ApiParametrizedSecurityScheme} 
   */
  function getApiParametrizedSecurityScheme(path, method) {
    const operation = store.getOperation(model, path, method);
    return operation.security[0].schemes[0];
  }

  describe('Application flow', () => {
    /** @type ApiAuthorizationMethodElement */
    let element;

    beforeEach(async () => {
      const scheme = getApiParametrizedSecurityScheme('/myz-api/claims/claims', 'get');
      element = await methodFixture(model, scheme);
    });

    it('should set grant type to client_credentials', () => {
      const details = element.serialize();
      assert.equal(details.grantType, 'client_credentials');
    });
  });
});
