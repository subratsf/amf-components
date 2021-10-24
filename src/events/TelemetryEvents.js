import { EventTypes } from './EventTypes.js';
import { ApiStoreContextVoidEvent } from './BaseEvents.js';

/** @typedef {import('./TelemetryEvents').TelemetryDetail } TelemetryDetail */
/** @typedef {import('./TelemetryEvents').TelemetryEventDetail } TelemetryEventDetail */
/** @typedef {import('./TelemetryEvents').TelemetryScreenViewDetail } TelemetryScreenViewDetail */
/** @typedef {import('./TelemetryEvents').TelemetryExceptionDetail } TelemetryExceptionDetail */
/** @typedef {import('./TelemetryEvents').TelemetrySocialDetail } TelemetrySocialDetail */
/** @typedef {import('./TelemetryEvents').TelemetryTimingDetail } TelemetryTimingDetail */

export const TelemetryEvents = {
  /**
   * Sends application screen view event
   * @param {EventTarget} target A node on which to dispatch the event
   * @param {string} screenName The screen name
   * @param {TelemetryDetail=} detail Analytics base configuration
   */
  view: (target, screenName, detail={}) => {
    const init = /** @type TelemetryScreenViewDetail */ ({ ...detail, screenName });
    const e = new ApiStoreContextVoidEvent(EventTypes.Telemetry.view, init);
    target.dispatchEvent(e);
  },
  /**
   * Sends a Google Analytics event information
   * @param {EventTarget} target A node on which to dispatch the event
   * @param {TelemetryEventDetail} detail The event configuration
   */
  event: (target, detail) => {
    const e = new ApiStoreContextVoidEvent(EventTypes.Telemetry.event, detail);
    target.dispatchEvent(e);
  },
  /**
   * Sends a Google Analytics exception information
   * @param {EventTarget} target A node on which to dispatch the event
   * @param {string} description The exception description
   * @param {boolean=} fatal Whether the exception was fatal to the application
   * @param {TelemetryDetail=} detail Analytics base configuration
   */
  exception: (target, description, fatal=false, detail={}) => {
    const init = /** @type TelemetryExceptionDetail */ ({ ...detail, description, fatal });
    const e = new ApiStoreContextVoidEvent(EventTypes.Telemetry.exception, init);
    target.dispatchEvent(e);
  },
  /**
   * Sends a Google Analytics social share information
   * @param {EventTarget} target A node on which to dispatch the event
   * @param {string} network The network where the shared content is shared
   * @param {string} action The share action, eg. 'Share'
   * @param {string} url The share url
   * @param {TelemetryDetail=} detail Analytics base configuration
   */
  social: (target, network, action, url, detail={}) => {
    const init = /** @type TelemetrySocialDetail */ ({ ...detail, network, action, target: url });
    const e = new ApiStoreContextVoidEvent(EventTypes.Telemetry.social, init);
    target.dispatchEvent(e);
  },
  /**
   * Sends a Google Analytics application timing information
   * @param {EventTarget} target A node on which to dispatch the event
   * @param {string} category The timing category
   * @param {string} variable The timing variable
   * @param {number} value The timing value
   * @param {string} label The timing label
   * @param {TelemetryDetail=} detail Analytics base configuration
   */
  timing: (target, category, variable, value, label, detail={}) => {
    const init = /** @type TelemetryTimingDetail */ ({ ...detail, category, variable, value, label });
    const e = new ApiStoreContextVoidEvent(EventTypes.Telemetry.timing, init);
    target.dispatchEvent(e);
  },
};
Object.freeze(TelemetryEvents);
