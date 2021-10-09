/* eslint-disable max-classes-per-file */
import { StoreEventTypes } from './StoreEventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('@api-components/amf-helper-mixin').ApiSummary} ApiSummary */


export const ApiEvents = {
  /**
   * Reads basic info about the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiSummary>}
   */
  summary: async (target) => {
    const e = new ApiStoreContextEvent(StoreEventTypes.Api.summary);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}
Object.freeze(ApiEvents);
