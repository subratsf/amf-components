export declare class ApiStoreContextEvent<T> extends CustomEvent<StoreEventDetailWithResult<T>> {
  /**
   * @param type The event type
   * @param detail The optional detail object. It adds object's properties to the `detail` with the `result` property.
   */
  constructor(type: string, detail?: any);
}

/**
 * An event to be used to read an object from the API store.
 */
export class ApiStoreReadEvent<T> extends CustomEvent<ApiStoreReadEventDetail<T>> {
  /**
   * @param type The type of the event
   * @param id The domain id of the object to read
   */
  constructor(type: string, id: string);
}

/**
 * An event to be used to read a list of object from the API store.
 */
export class ApiStoreReadBulkEvent<T> extends CustomEvent<ApiStoreReadBulkEventDetail<T>> {
  /**
   * @param type The type of the event
   * @param ids The list of domain ids to read. These must be of the same domain type.
   */
  constructor(type: string, ids: string[]);
}

/**
 * Base event detail definition for the events that returns a `result`
 * property on the `detail` object
 */
export declare interface StoreEventDetailWithResult<T> {
  /**
   * This property is set by the store, a promise resolved when the operation finish
   * with the corresponding result.
   */
  result?: Promise<T> | null;
}

/**
 * A detail for an event that returns a void result.
 */
export declare interface StoreEventDetailVoid extends StoreEventDetailWithResult<void> {
}

export declare interface ApiStoreReadEventDetail<T> extends StoreEventDetailWithResult<T> {
  /**
   * The domain id of the domain object to read.
   */
  id: string;
}

export declare interface ApiStoreReadBulkEventDetail<T> extends StoreEventDetailWithResult<T[]> {
  /**
   * The list of domain ids to read.
   */
  ids: string;
}
