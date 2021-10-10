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
  describe('Documentation fragment', () => {
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
          const amf = await loader.getGraph(compact, 'documentation-fragment');
          element = await basicFixture(amf);
        });

        it('collects the documentation information', () => {
          const result = element[docsValue];
          assert.lengthOf(result, 1);
          assert.typeOf(result[0].id, 'string');
          assert.equal(result[0].label, 'About');
        });

        it('opens the Documentation', () => {
          assert.isTrue(element.docsOpened);
        });

        it('sets the [isFragmentValue]', () => {
          assert.isTrue(element[isFragmentValue]);
        });

        it('sets the summaryRendered', () => {
          assert.isFalse(element.summaryRendered);
        });

        it('does not render the summary', async () => {
          await nextFrame();
          const panel = element.shadowRoot.querySelector('.summary');
          assert.notOk(panel);
        });

        it('does not set types', () => {
          assert.isUndefined(element[typesValue]);
        });

        it('does not set security', () => {
          assert.isUndefined(element[securityValue]);
        });

        it('does not set endpoints', () => {
          assert.isUndefined(element[endpointsValue]);
        });
      });
    });
  });
});
