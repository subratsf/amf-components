import { v4 } from '@advanced-rest-client/uuid';
import { AmfStore } from './AmfStore.js';

/** @typedef {import('../helpers/amf').DomainElement} DomainElement */

/**
 * The AMF graph store that hosts multiple instances of the AMF graph model.
 * 
 * Note, all methods are asynchronous so this class can be extended to support async communication
 * with the store (like HTTP or WS).
 */
export class AmfGraphStore {
  /**
   * @param {EventTarget=} target The event target to dispatch the events on.
   */
  constructor(target=window) {
    /** @type {Map<string, AmfStore>} */
    this.apis = new Map();
    this.target = target;
  }

  /**
   * Creates a new store object.
   * @param {DomainElement} graph The graph model to use to initialize the store.
   * @returns {Promise<string>} The store id to be used to reference when querying the store.
   */
  async add(graph) {
    const id = v4();
    const instance = new AmfStore(graph, this.target);
    this.apis.set(id, instance);
    return id;
  }

  /**
   * Removes all APIs from the store.
   * @returns {Promise<void>} 
   */
  async clear() {
    this.apis.clear();
  }

  /**
   * Removes a specific API from the store.
   * @param {string} id The graph store identifier generated when calling `add()`.
   * @returns {Promise<void>} 
   */
  async delete(id) {
    this.apis.delete(id);
  }

  /**
   * Proxies a read command to the store.
   * @param {string} id The graph store identifier generated when calling `add()`.
   * @param {string} command The command (method name) to call on the store.
   * @param {...any} args The list of command arguments.
   * @returns {Promise<any>} 
   */
  async read(id, command, ...args) {
    if (!this.apis.has(id)) {
      throw new Error(`No graph defined for ${id}`);
    }
    const instance = this.apis.get(id);
    if (typeof instance[command] !== 'function') {
      throw new Error(`The command ${command} is not callable on the graph store.`);
    }
    return instance[command](...args);
  }
}
