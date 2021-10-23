import { ApiEndPoint, ApiOperation } from '../helpers/api';

declare interface IOperationEvents {
  /**
   * Reads the operation from the store.
   * @param target The node on which to dispatch the event
   * @param operationId The domain id of the operation to read.
   * @param endpointId Optional endpoint id. When not set it searches through all endpoints.
   */
  get(target: EventTarget, operationId: string, endpointId?: string): Promise<ApiOperation>;
  /**
   * Reads the operation parent from the store.
   * @param target The node on which to dispatch the event
   * @param operationId The domain id of the operation to read.
   * @param endpointId Optional endpoint id. When not set it searches through all endpoints.
   */
  getParent(target: EventTarget, operationId: string, endpointId?: string): Promise<ApiEndPoint>;
}

export declare const OperationEvents: Readonly<IOperationEvents>;
