import { ApiNodeShapeListItem } from '../types';
import { ApiShapeUnion } from '../helpers/api';

declare interface ITypeEvents {
  /**
   * Lists the type (schema) definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiNodeShapeListItem[]>;
  /**
   * Reads a type (schema) from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  get(target: EventTarget, id: string): Promise<ApiShapeUnion>;
}

export declare const TypeEvents: Readonly<ITypeEvents>;
