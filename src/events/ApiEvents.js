import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */

export const ApiEvents = {
  /**
   * Reads basic info about the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiSummary>}
   */
  summary: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Api.summary);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}
Object.freeze(ApiEvents);
