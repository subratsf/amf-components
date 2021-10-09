import { fixture, assert, html } from '@open-wc/testing';
import { AmfLoader } from '../AmfLoader.js';
import './test-element.js';

/** @typedef {import('../../').Amf.AmfDocument} AmfDocument */

// In OAS path parameters can be defined on an operation level. This is in conflict
// with RAML which only allows variables on the endpoint level.
// This tests for reading parameters from an endpoint that are locates on the
// method level.
describe('SE-12957', () => {
  async function basicFixture(amf) {
    return fixture(html`<test-element .amf="${amf}"></test-element>`);
  }

  const loader = new AmfLoader();
  const apiFile = 'SE-12957';

  [false, true].forEach((compact) => {
    describe(compact ? 'Compact model' : 'Full model', () => {
      /** @type AmfDocument */
      let model;
      before(async () => {
        model = await loader.getGraph(compact, apiFile);
      });

      let element;
      beforeEach(async () => {
        element = await basicFixture(model);
      });

      it('computes path parameters from AMF Endpoint model', () => {
        const endpoint = loader.lookupEndpoint(model, '/api/v1/alarm/{scada-object-key}');
        const method = loader.lookupOperation(model, '/api/v1/alarm/{scada-object-key}', 'get');
        const result = element._computeEndpointVariables(endpoint, method);
        assert.typeOf(result, 'array', 'result is array');
        assert.lengthOf(result, 1, 'array has 1 item');
      });

      it('computes query parameters from AMF Expects model', () => {
        const method = loader.lookupOperation(model, '/api/v1/alarm/{scada-object-key}', 'get');
        const expects = element._computeExpects(method);
        const result = element._computeQueryParameters(expects);
        assert.typeOf(result, 'array', 'result is array');
        assert.lengthOf(result, 1, 'array has 1 item');
      });
    });
  });
});
