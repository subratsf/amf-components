import { ApiEndPointWithOperationsListItem } from '../types';
import { ApiEndPoint } from '../helpers/api';

declare interface IEndpointEvents {
  /**
   * Reads the endpoint model from the store.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the endpoint.
   */
  get(target: EventTarget, id: string): Promise<ApiEndPoint>;
  /**
   * Reads the endpoint model from the store by the path value.
   * @param target The node on which to dispatch the event
   * @param path The path of the endpoint.
   */
  byPath(target: EventTarget, path: string): Promise<ApiEndPoint>;
  /**
   * List all endpoints in the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiEndPointWithOperationsListItem[]>;
}

export declare const EndpointEvents: Readonly<IEndpointEvents>;
