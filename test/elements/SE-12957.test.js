import { fixture, assert, html, aTimeout } from '@open-wc/testing';
import { AmfLoader } from '../AmfLoader.js';
import '../../define/api-operation-document.js';

/** @typedef {import('../../').Amf.AmfDocument} AmfDocument */
/** @typedef {import('../../').ApiOperationDocumentElement} ApiOperationDocumentElement */
/** @typedef {import('../../').ApiParameterDocumentElement} ApiParameterDocumentElement */
/** @typedef {import('../../src/helpers/amf').Operation} Operation */

// In OAS path parameters can be defined on an operation level. This is in conflict
// with RAML which only allows variables on the endpoint level.
// This tests for reading parameters from an endpoint that are locates on the
// method level.
describe('ApiOperationDocumentElement', () => {
  describe('SE-12957', () => {
    const loader = new AmfLoader();
    const apiFile = 'SE-12957';

    /**
     * @param {AmfDocument} amf
     * @param {Operation=} shape
     * @returns {Promise<ApiOperationDocumentElement>}
     */
    async function basicFixture(amf, shape) {
      const element = await fixture(html`<api-operation-document 
        .queryDebouncerTimeout="${0}" 
        .amf="${amf}" 
        .domainModel="${shape}"
      ></api-operation-document>`);
      await aTimeout(0);
      return /** @type ApiOperationDocumentElement */ (element);
    }

    [false, true].forEach((compact) => {
      describe(compact ? 'Compact model' : 'Full model', () => {
        /** @type AmfDocument */
        let model;
        before(async () => {
          model = await loader.getGraph(compact, apiFile);
        });

        it('computes path parameters from AMF Endpoint model', async () => {
          const data = loader.lookupOperation(model, '/api/v1/alarm/{scada-object-key}', 'get');
          const element = await basicFixture(model, data);
          const request = element.shadowRoot.querySelector('api-request-document');
          const params = request.shadowRoot.querySelectorAll('api-parameter-document[data-name="uri"]');
          assert.lengthOf(params, 1, 'has a single path parameter');
          const param = /** @type ApiParameterDocumentElement */ (params[0]);
          assert.equal(param.parameter.name, 'scada-object-key', 'has the model defined parameter');
        });
      });
    });
  });
});
