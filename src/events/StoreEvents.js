import { EventTypes } from './EventTypes.js';

export const StoreEvents = {
  /**
   * Dispatched by the store when the API model change.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {void}
   */
  graphChange: (target) => {
    const e = new Event(EventTypes.Store.graphChange, {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    target.dispatchEvent(e);
  },
};
