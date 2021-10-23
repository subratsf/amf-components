import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent } from './BaseEvents.js';

/** @typedef {import('../helpers/api').ApiPayload} ApiPayload */

export const PayloadEvents = {
  /**
   * Reads a Payload from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the Payload to read.
   * @returns {Promise<ApiPayload>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Payload.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}

Object.freeze(PayloadEvents);
