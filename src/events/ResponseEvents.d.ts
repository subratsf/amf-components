import { ApiResponse } from '../helpers/api';

declare interface IResponseEvents {
  /**
   * Reads a Response from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the Response to read.
   */
  get(target: EventTarget, id: string): Promise<ApiResponse>;
}

export declare const ResponseEvents: Readonly<IResponseEvents>;
