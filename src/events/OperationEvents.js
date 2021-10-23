import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent } from './BaseEvents.js';

/** @typedef {import('../helpers/api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../helpers/api').ApiOperation} ApiOperation */

export const OperationEvents = {
  /**
   * Reads the operation from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} operationId The domain id of the operation to read.
   * @param {string=} endpointId Optional endpoint id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  get: async (target, operationId, endpointId) => {
    const e = new ApiStoreReadEvent(EventTypes.Operation.get, operationId, endpointId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the operation parent from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} operationId The domain id of the operation to read.
   * @returns {Promise<ApiEndPoint>}
   */
  getParent: async (target, operationId) => {
    const e = new ApiStoreReadEvent(EventTypes.Operation.getParent, operationId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(OperationEvents);
