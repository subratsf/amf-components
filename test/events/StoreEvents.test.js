import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { ApiEvents, ApiEventTypes } from  '../../index.js';

/** @typedef {import('../../').ReportingErrorEventDetail } ReportingErrorEventDetail */

describe('Events', () => {
  /**
   * @return {Promise<HTMLDivElement>}
   */
   async function etFixture() {
    return fixture(html`<div></div>`);
  }

  describe('Store', () => {
    describe('error()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Store.graphChange, spy);
        ApiEvents.Store.graphChange(et);
        assert.isTrue(spy.calledOnce);
      });
    });
  });
});
