import { fixture, assert, html, aTimeout } from '@open-wc/testing';
import { AmfLoader } from '../AmfLoader.js';
import '../../api-security-requirement-document.js';

/** @typedef {import('../../').ApiSecurityRequirementDocumentElement} ApiSecurityRequirementDocumentElement */
/** @typedef {import('../../src/helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../../src/helpers/amf').DomainElement} DomainElement */
/** @typedef {import('../../src/helpers/amf').SecurityRequirement} SecurityRequirement */
/** @typedef {import('../../src/helpers/api').ApiSecurityRequirement} ApiSecurityRequirement */

describe('ApiSecurityRequirementDocumentElement', () => {
  const loader = new AmfLoader();

  /**
   * @param {AmfDocument} amf
   * @param {string=} domainId
   * @returns {Promise<ApiSecurityRequirementDocumentElement>}
   */
  async function domainIdFixture(amf, domainId) {
    const element = await fixture(html`<api-security-requirement-document 
      .queryDebouncerTimeout="${0}" 
      .amf="${amf}" 
      .domainId="${domainId}"
    ></api-security-requirement-document>`);
    await aTimeout(0);
    return /** @type ApiSecurityRequirementDocumentElement */ (element);
  }

  /**
   * @param {AmfDocument} amf
   * @param {ApiSecurityRequirement=} model
   * @returns {Promise<ApiSecurityRequirementDocumentElement>}
   */
  async function serializedFixture(amf, model) {
    const element = await fixture(html`<api-security-requirement-document 
      .queryDebouncerTimeout="${0}" 
      .amf="${amf}" 
      .securityRequirement="${model}"
    ></api-security-requirement-document>`);
    await aTimeout(0);
    return /** @type ApiSecurityRequirementDocumentElement */ (element);
  }

  /**
   * @param {AmfDocument} amf
   * @param {SecurityRequirement=} model
   * @returns {Promise<ApiSecurityRequirementDocumentElement>}
   */
  async function modelFixture(amf, model) {
    const element = await fixture(html`<api-security-requirement-document 
      .queryDebouncerTimeout="${0}" 
      .amf="${amf}" 
      .domainModel="${model}"
    ></api-security-requirement-document>`);
    await aTimeout(0);
    return /** @type ApiSecurityRequirementDocumentElement */ (element);
  }

  [false, true].forEach((compact) => {
    describe(compact ? 'Compact model' : 'Full model', () => {
      /** @type AmfDocument */
      let model;
      before(async () => {
        model = await loader.getGraph(compact, 'secured-api');
      });

      it('finds the security for an operation', async () => {
        const op = loader.getOperation(model, '/custom1', 'get');
        const [security] = op.security;
        const { id } = security;
        const element = await domainIdFixture(model, id);
        assert.deepEqual(element.securityRequirement, security);
      });

      it('renders the security requirement when passing a serialized model', async () => {
        const op = loader.getOperation(model, '/custom1', 'get');
        const [security] = op.security;
        const element = await serializedFixture(model, security);
        const node = element.shadowRoot.querySelector('api-parametrized-security-scheme');
        assert.ok(node, 'has the documentation element node');
      });

      it('renders the security requirement when passing a domain model', async () => {
        const op = loader.lookupOperation(model, '/custom1', 'get');
        const security  = op[loader._getAmfKey(loader.ns.aml.vocabularies.security.security)][0];
        const element = await modelFixture(model, security);
        const node = element.shadowRoot.querySelector('api-parametrized-security-scheme');
        assert.ok(node, 'has the documentation element node');
      });
    });
  });
});
