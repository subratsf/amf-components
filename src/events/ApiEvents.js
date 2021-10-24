import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../types').DocumentMeta} DocumentMeta */

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

  /**
   * Reads the current API's protocols.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<string[]>}
   */
  protocols: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Api.protocols);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads the current API's version.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<string>}
   */
  version: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Api.version);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads the meta information about the currently loaded document from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<DocumentMeta>}
   */
  documentMeta: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Api.documentMeta);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}
Object.freeze(ApiEvents);
