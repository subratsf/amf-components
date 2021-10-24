import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('./ReportingEvents').ReportingErrorEventDetail } ReportingErrorEventDetail */

export const ReportingEvents = {
  /**
   * Dispatches the general error event for logging purposes.
   * @param {EventTarget} target A node on which to dispatch the event
   * @param {Error} error The error object that caused this event
   * @param {string} description The description to be reported to the logger.
   * @param {string=} component Optional component name that triggered the exception.
   * @returns {void}
   */
  error: (target, error, description, component) => {
    const detail = /** @type ReportingErrorEventDetail */ ({
      error, 
      description, 
      component,
    });
    const e = new ApiStoreContextEvent(EventTypes.Reporting.error, detail);
    target.dispatchEvent(e);
  },
};
Object.freeze(ReportingEvents);
