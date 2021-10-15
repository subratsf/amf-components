/* eslint-disable max-classes-per-file */

/**
 * A base class to use with store events that do not expect a result.
 */
export class ApiStoreContextVoidEvent extends CustomEvent {
  /**
   * @param {string} type The event type
   * @param {any=} detail The optional detail object. It adds object's properties to the `detail` with the `result` property.
   */
  constructor(type, detail={}) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
  }
}


/**
 * A base class to use with store events.
 */
export class ApiStoreContextEvent extends CustomEvent {
  /**
   * @param {string} type The event type
   * @param {any=} detail The optional detail object. It adds object's properties to the `detail` with the `result` property.
   */
  constructor(type, detail={}) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        result: undefined,
        ...detail,
      }
    });
  }
}

/**
 * An event to be used to read an object from the API store.
 */
export class ApiStoreReadEvent extends ApiStoreContextEvent {
  /**
   * @param {string} type The type of the event
   * @param {string} id The domain id of the object to read
   */
  constructor(type, id) {
    super(type, { id });
  }
}

/**
 * An event to be used to read a list of object from the API store.
 */
export class ApiStoreReadBulkEvent extends ApiStoreContextEvent {
  /**
   * @param {string} type The type of the event
   * @param {string[]} ids The list of domain ids to read. These must be of the same domain type.
   */
  constructor(type, ids) {
    super(type, { ids });
  }
}
