import { DomainElement } from '@api-components/amf-helper-mixin';
import { AmfStore } from './AmfStore.js';

/**
 * The AMF graph store that hosts multiple instances of the AMF graph model.
 * 
 * Note, all methods are asynchronous so this class can be extended to support async communication
 * with the store (like HTTP or WS).
 */
export class AmfGraphStore {
  apis: Map<string, AmfStore>;
  constructor();

  /**
   * Creates a new store object.
   * @param graph The graph model to use to initialize the store.
   * @returns The store id to be used to reference when querying the store.
   */
  add(graph: DomainElement): Promise<string>;

  /**
   * Removes all APIs from the store.
   */
  clear(): Promise<void>;

  /**
   * Removes a specific API from the store.
   * @param id The graph store identifier generated when calling `add()`.
   */
  delete(id: string): Promise<void>;

  /**
   * Proxies a read command to the store.
   * @param id The graph store identifier generated when calling `add()`.
   * @param command The command (method name) to call on the store.
   * @param args The list of command arguments.
   */
  read(id: string, command: string, ...args: any): Promise<any>;
}
