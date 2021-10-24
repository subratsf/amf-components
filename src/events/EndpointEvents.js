import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreReadEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../helpers/api').ApiEndPoint} ApiEndPoint */

export const EndpointEvents = {
  /**
   * Reads the endpoint model from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the endpoint.
   * @returns {Promise<ApiEndPoint>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Endpoint.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the endpoint model from the store by the path value.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} path The path of the endpoint.
   * @returns {Promise<ApiEndPoint>}
   */
  byPath: async (target, path) => {
    const e = new ApiStoreReadEvent(EventTypes.Endpoint.byPath, path);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Lists all endpoints with operations included into the result.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiEndPointWithOperationsListItem[]>}
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Endpoint.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(EndpointEvents);
