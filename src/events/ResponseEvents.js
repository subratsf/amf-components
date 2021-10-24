/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent } from './BaseEvents.js';

/** @typedef {import('../helpers/api').ApiResponse} ApiResponse */

export const ResponseEvents = {
  /**
   * Reads a Response from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the response to read.
   * @returns {Promise<ApiResponse>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Response.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}

Object.freeze(ResponseEvents);
