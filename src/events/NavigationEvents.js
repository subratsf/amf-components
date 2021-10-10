/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';

/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../types').SelectionType} SelectionType */

export class ApiNavigationEvent extends CustomEvent {
  /**
   * @param {string} domainId The domain id (graph id) of the selected object
   * @param {SelectionType} domainType The type of the selected domain object.
   * @param {string=} parentId Optional, the parent object domain id (for an operation it is an endpoint)
   * @param {boolean=} passive Whether the selection came from the system processing rather than user interaction.
   */
  constructor(domainId, domainType, parentId, passive) {
    super(EventTypes.Navigation.apiNavigate, {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        domainId, domainType, parentId, passive,
      }
    });
  }
}

export const NavigationEvents = {
  /**
   * Performs a navigation action in AMF components.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} domainId The domain id (graph id) of the selected object
   * @param {SelectionType} domainType The type of the selected domain object.
   * @param {string=} parentId Optional, the parent object domain id (for an operation it is an endpoint)
   * @param {boolean=} passive Whether the selection came from the system processing rather than user interaction.
   */
  apiNavigate: async (target, domainId, domainType, parentId, passive) => {
    const e = new ApiNavigationEvent(domainId, domainType, parentId, passive);
    target.dispatchEvent(e);
  },
}
Object.freeze(NavigationEvents);
