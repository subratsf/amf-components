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

  describe('Events.Api', () => {
    describe('summary()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Api.summary, spy);
        ApiEvents.Api.summary(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { id: 'test' };
        et.addEventListener(ApiEventTypes.Api.summary, (e) => {
          // @ts-ignore
          e.detail.result = Promise.resolve(data);
        });
        const result = await ApiEvents.Api.summary(et);
        assert.deepEqual(result, data);
      });
    });
  });
});
