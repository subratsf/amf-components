import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../helpers/api').ApiDocumentation} ApiDocumentation */

export const DocumentationEvents = {
  /**
   * Reads RAML's/OAS's documentation page.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the documentation.
   * @returns {Promise<ApiDocumentation>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Documentation.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Lists the documentation definitions for the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiDocumentation[]>} The list of documentations.
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Documentation.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}
Object.freeze(DocumentationEvents);
