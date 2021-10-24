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
  apiNavigate: (target, domainId, domainType, parentId, passive) => {
    const e = new ApiNavigationEvent(domainId, domainType, parentId, passive);
    target.dispatchEvent(e);
  },
  /**
   * Dispatches an event to inform the application to open a browser window.
   * This is a general purpose action. It has the `detail` object with optional
   * `purpose` property which can be used to support different kind of external navigation.
   * 
   * @param {EventTarget} target A node on which to dispatch the event.
   * @param {string} url The URL to open
   * @returns {boolean} True when the event was cancelled meaning the navigation was handled.
   */
  navigateExternal: (target, url) => {
    const e = new CustomEvent(EventTypes.Navigation.navigateExternal, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        url,
      },
    });
    target.dispatchEvent(e);
    return e.defaultPrevented;
  },
}
Object.freeze(NavigationEvents);
