import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { ApiEvents, ApiEventTypes } from  '../../index.js';

/** @typedef {import('../../').TelemetryDetail } TelemetryDetail */
/** @typedef {import('../../').TelemetryEventDetail } TelemetryEventDetail */
/** @typedef {import('../../').TelemetryScreenViewDetail } TelemetryScreenViewDetail */
/** @typedef {import('../../').TelemetryExceptionDetail } TelemetryExceptionDetail */
/** @typedef {import('../../').TelemetrySocialDetail } TelemetrySocialDetail */
/** @typedef {import('../../').TelemetryTimingDetail } TelemetryTimingDetail */

describe('Events', () => {
  /**
   * @return {Promise<HTMLDivElement>}
   */
  async function etFixture() {
    return fixture(html`<div></div>`);
  }

  describe('Telemetry', () => {
    describe('view()', () => {
      const screenName = 'test-screen';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.view, spy);
        ApiEvents.Telemetry.view(et, screenName);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has screen name on the detail', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.view, spy);
        ApiEvents.Telemetry.view(et, screenName);
        const info = /** @type TelemetryScreenViewDetail */ (spy.args[0][0].detail);
        assert.equal(info.screenName, screenName);
      });

      it('the event has custom configuration', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        const custom = {
          customMetrics: [{ index: 1, value: 1 }],
          customDimensions: [{ index: 1, value: 'test' }],
        };
        et.addEventListener(ApiEventTypes.Telemetry.view, spy);
        ApiEvents.Telemetry.view(et, screenName, custom);
        const info = /** @type TelemetryScreenViewDetail */ (spy.args[0][0].detail);
        assert.deepEqual(info.customMetrics, custom.customMetrics, 'has customMetrics');
        assert.deepEqual(info.customDimensions, custom.customDimensions, 'has customDimensions');
      });
    });

    describe('event()', () => {
      const init = { 
        category: 'e-cat',
        action: 'e-act',
        label: 'e-label',
        value: 1,
      };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.event, spy);
        ApiEvents.Telemetry.event(et, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.event, spy);
        ApiEvents.Telemetry.event(et, init);
        const info = /** @type TelemetryEventDetail */ (spy.args[0][0].detail);
        assert.deepEqual(info, init);
      });
    });

    describe('exception()', () => {
      const description = 'event-exception';
      const fatal = true;

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.exception, spy);
        ApiEvents.Telemetry.exception(et, description);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the description property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.exception, spy);
        ApiEvents.Telemetry.exception(et, description);
        const info = /** @type TelemetryExceptionDetail */ (spy.args[0][0].detail);
        assert.equal(info.description, description);
      });

      it('the event has the fatal property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.exception, spy);
        ApiEvents.Telemetry.exception(et, description, fatal);
        const info = /** @type TelemetryExceptionDetail */ (spy.args[0][0].detail);
        assert.equal(info.fatal, true);
      });

      it('the event has the custom configuration', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        const custom = {
          customMetrics: [{ index: 1, value: 1 }],
          customDimensions: [{ index: 1, value: 'test' }],
        };
        et.addEventListener(ApiEventTypes.Telemetry.exception, spy);
        ApiEvents.Telemetry.exception(et, description, false, custom);
        const info = /** @type TelemetryExceptionDetail */ (spy.args[0][0].detail);
        assert.deepEqual(info.customMetrics, custom.customMetrics, 'has customMetrics');
        assert.deepEqual(info.customDimensions, custom.customDimensions, 'has customDimensions');
      });
    });

    describe('social()', () => {
      const init = { 
        network: 'e-network',
        action: 'e-action',
        target: 'e-target',
      };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.social, spy);
        ApiEvents.Telemetry.social(et, init.network, init.action, init.target);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.social, spy);
        ApiEvents.Telemetry.social(et, init.network, init.action, init.target);
        const info = /** @type TelemetrySocialDetail */ (spy.args[0][0].detail);
        assert.deepEqual(info, init);
      });

      it('the event has custom configuration', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        const custom = {
          customMetrics: [{ index: 1, value: 1 }],
          customDimensions: [{ index: 1, value: 'test' }],
        };
        et.addEventListener(ApiEventTypes.Telemetry.social, spy);
        ApiEvents.Telemetry.social(et, init.network, init.action, init.target, custom);
        const info = /** @type TelemetrySocialDetail */ (spy.args[0][0].detail);
        assert.deepEqual(info, { ...init, ...custom });
      });
    });

    describe('timing()', () => {
      const init = { 
        category: 'e-category',
        variable: 'e-variable',
        value: 100,
        label: 'e-label',
      };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.timing, spy);
        ApiEvents.Telemetry.timing(et, init.category, init.variable, init.value, init.label);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Telemetry.timing, spy);
        ApiEvents.Telemetry.timing(et, init.category, init.variable, init.value, init.label);
        const info = /** @type TelemetryTimingDetail */ (spy.args[0][0].detail);
        assert.deepEqual(info, init);
      });

      it('the event has custom configuration', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        const custom = {
          customMetrics: [{ index: 1, value: 1 }],
          customDimensions: [{ index: 1, value: 'test' }],
        };
        et.addEventListener(ApiEventTypes.Telemetry.timing, spy);
        ApiEvents.Telemetry.timing(et, init.category, init.variable, init.value, init.label, custom);
        const info = /** @type TelemetryTimingDetail */ (spy.args[0][0].detail);
        assert.deepEqual(info, { ...init, ...custom });
      });
    });
  });
});
