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

  describe('ReportingEvents', () => {
    describe('error()', () => {
      const err = new Error();
      const desc = 'test error';
      const cmp = 'test component';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Reporting.error, spy);
        ApiEvents.Reporting.error(et, err, desc);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the error property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Reporting.error, spy);
        ApiEvents.Reporting.error(et, err, desc);
        const info = /** @type ReportingErrorEventDetail */ (spy.args[0][0].detail);
        assert.isTrue(info.error === err);
      });

      it('the event has the description property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Reporting.error, spy);
        ApiEvents.Reporting.error(et, err, desc);
        const info = /** @type ReportingErrorEventDetail */ (spy.args[0][0].detail);
        assert.equal(info.description, desc);
      });

      it('the event has the component property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Reporting.error, spy);
        ApiEvents.Reporting.error(et, err, desc, cmp);
        const info = /** @type ReportingErrorEventDetail */ (spy.args[0][0].detail);
        assert.equal(info.component, cmp);
      });
    });
  });
});
