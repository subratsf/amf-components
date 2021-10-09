import { ApiSummary } from '@api-components/amf-helper-mixin';

export declare interface IApiEvents {
  /**
   * Reads basic info about the API.
   * @param target The node on which to dispatch the event
   */
  summary(target: EventTarget): Promise<ApiSummary>;
}

export declare const ApiEvents: Readonly<IApiEvents>;
