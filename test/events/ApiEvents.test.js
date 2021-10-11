import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { Events, EventTypes } from  '../../index.js';

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
        et.addEventListener(EventTypes.Api.summary, spy);
        Events.Api.summary(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { id: 'test' };
        et.addEventListener(EventTypes.Api.summary, (e) => {
          // @ts-ignore
          e.detail.result = Promise.resolve(data);
        });
        const result = await Events.Api.summary(et);
        assert.deepEqual(result, data);
      });
    });
  });
});
