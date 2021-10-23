import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { ApiEvents, ApiEventTypes } from  '../../index.js';

describe('Events', () => {
  /**
   * @return {Promise<HTMLDivElement>}
   */
  async function etFixture() {
    return fixture(html`<div></div>`);
  }

  describe('Events.Endpoint', () => {
    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Endpoint.get, spy);
        ApiEvents.Endpoint.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Endpoint.get, spy);
        ApiEvents.Endpoint.get(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(ApiEventTypes.Endpoint.get, (e) => {
          // @ts-ignore
          e.detail.result = Promise.resolve(data);
        });
        const result = await ApiEvents.Endpoint.get(et, id);
        assert.deepEqual(result, data);
      });
    });

    describe('byPath()', () => {
      const path = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Endpoint.byPath, spy);
        ApiEvents.Endpoint.byPath(et, path);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Endpoint.byPath, spy);
        ApiEvents.Endpoint.byPath(et, path);
        assert.deepEqual(spy.args[0][0].detail.id, path);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(ApiEventTypes.Endpoint.byPath, (e) => {
          // @ts-ignore
          e.detail.result = Promise.resolve(data);
        });
        const result = await ApiEvents.Endpoint.byPath(et, path);
        assert.deepEqual(result, data);
      });
    });

    describe('list()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Endpoint.list, spy);
        ApiEvents.Endpoint.list(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(ApiEventTypes.Endpoint.list, (e) => {
          // @ts-ignore
          e.detail.result = Promise.resolve();
        });
        await ApiEvents.Endpoint.list(et);
      });
    });
  });
});
