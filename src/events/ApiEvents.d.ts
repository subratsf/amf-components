import { ApiSummary } from '../helpers/api';
import { DocumentMeta } from '../types';

export declare interface IApiEvents {
  /**
   * Reads basic info about the API.
   * @param target The node on which to dispatch the event
   */
  summary(target: EventTarget): Promise<ApiSummary>;
  /**
   * Reads the current API's protocols.
   * @param target The node on which to dispatch the event
   */
  protocols(target: EventTarget): Promise<string[]>;
  /**
   * Reads the current API's version.
   * @param target The node on which to dispatch the event
   */
  version(target: EventTarget): Promise<string>;
  /**
   * Reads the meta information about the currently loaded document from the store.
   * @param target The node on which to dispatch the event
   */
  documentMeta(target: EventTarget): Promise<DocumentMeta>;
}

export declare const ApiEvents: Readonly<IApiEvents>;
