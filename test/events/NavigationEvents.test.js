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

  describe('Events.Navigation', () => {
    describe('apiNavigate()', () => {
      const domainId = 'amf://id';
      const domainType = 'operation';
      const parentId = 'amf://other';
      const passive = false;

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Navigation.apiNavigate, spy);
        ApiEvents.Navigation.apiNavigate(et, domainId, domainType);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "domainId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Navigation.apiNavigate, spy);
        ApiEvents.Navigation.apiNavigate(et, domainId, domainType);
        assert.deepEqual(spy.args[0][0].detail.domainId, domainId);
      });

      it('the event has the "domainType" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Navigation.apiNavigate, spy);
        ApiEvents.Navigation.apiNavigate(et, domainId, domainType);
        assert.deepEqual(spy.args[0][0].detail.domainType, domainType);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Navigation.apiNavigate, spy);
        ApiEvents.Navigation.apiNavigate(et, domainId, domainType, parentId);
        assert.deepEqual(spy.args[0][0].detail.parentId, parentId);
      });

      it('the event has the "passive" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(ApiEventTypes.Navigation.apiNavigate, spy);
        ApiEvents.Navigation.apiNavigate(et, domainId, domainType, parentId, passive);
        assert.deepEqual(spy.args[0][0].detail.passive, passive);
      });
    });
  });
});
