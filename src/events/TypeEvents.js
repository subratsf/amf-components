/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreReadEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiNodeShapeListItem} ApiNodeShapeListItem */
/** @typedef {import('../helpers/api').ApiShapeUnion} ApiShapeUnion */

export const TypeEvents = {
  /**
   * Lists the type (schema) definitions for the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiNodeShapeListItem[]>}
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Type.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a type (schema) from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the object to read.
   * @returns {Promise<ApiShapeUnion>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Type.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(TypeEvents);
