import { ApiPayload } from '../helpers/api';

declare interface IPayloadEvents {
  /**
   * Reads a Payload from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  get(target: EventTarget, id: string): Promise<ApiPayload>;
}

export declare const PayloadEvents: Readonly<IPayloadEvents>;
