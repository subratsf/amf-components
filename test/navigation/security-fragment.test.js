import { fixture, assert, nextFrame, html } from '@open-wc/testing';
import { AmfLoader } from '../AmfLoader.js';
import '../../api-navigation.js';
import {
  docsValue,
  typesValue,
  securityValue,
  endpointsValue,
  isFragmentValue,
} from '../../src/elements/ApiNavigationElement.js';

/** @typedef {import('../../').ApiNavigationElement} ApiNavigationElement */
/** @typedef {import('../../').Amf.AmfDocument} AmfDocument */

describe('ApiNavigationElement', () => {
  describe('Security fragment', () => {
    const loader = new AmfLoader();

    /**
     * @param {AmfDocument=} amf
     * @returns {Promise<ApiNavigationElement>}
     */
    async function basicFixture(amf) {
      return fixture(html`<api-navigation .amf="${amf}"></api-navigation>`);
    }

    [false, true].forEach((compact) => {
      describe(compact ? 'Compact model' : 'Full model', () => {
        /** @type ApiNavigationElement */
        let element;

        beforeEach(async () => {
          const amf = await loader.getGraph(compact, 'oauth2-fragment');
          element = await basicFixture();
          element.amf = amf;
          await nextFrame();
        });

        it('Documentation is undefined', () => {
          assert.isUndefined(element[docsValue]);
        });

        it('Types is undefined', () => {
          assert.isUndefined(element[typesValue]);
        });

        it('Security is computed', () => {
          const result = element[securityValue];
          assert.lengthOf(result, 1);
          assert.typeOf(result[0].id, 'string');
          assert.equal(result[0].label, 'MyOauth');
        });

        it('Endpoints is undefined', () => {
          assert.isUndefined(element[endpointsValue]);
        });

        it('Security is opened', () => {
          assert.isTrue(element.securityOpened);
        });

        it('[isFragmentValue] is set', () => {
          assert.isTrue(element[isFragmentValue]);
        });

        it('summaryRendered is false', () => {
          assert.isFalse(element.summaryRendered);
        });

        it('summary is not rendered', async () => {
          await nextFrame();
          const panel = element.shadowRoot.querySelector('.summary');
          assert.notOk(panel);
        });
      });
    });
  });
});
