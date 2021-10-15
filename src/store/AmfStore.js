import { AmfHelperMixin } from '../helpers/AmfHelperMixin.js';
import { AmfSerializer } from '../helpers/AmfSerializer.js';
import { StoreEvents } from '../events/StoreEvents.js';

/** @typedef {import('../helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../helpers/amf').DomainElement} DomainElement */
/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../helpers/api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../helpers/api').ServersQueryOptions} ServersQueryOptions */
/** @typedef {import('../helpers/api').ApiServer} ApiServer */
/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

/**
 * The store that provides an API to read data from the AMF graph model.
 */
export class AmfStore extends AmfHelperMixin(Object) {
  /**
   * @param {AmfDocument=} graph The full API model.
   * @param {EventTarget=} eventsTarget The event target to dispatch the events on.
   */
  constructor(graph, eventsTarget=window) {
    super();
    this.target = eventsTarget;
    let amf = graph;
    if (Array.isArray(graph)) {
      [amf] = graph;
    }
    /** 
     * The API serializer
     */
    this.serializer = new AmfSerializer(amf);
    /** 
     * The graph model.
     */
    this.amf = amf;
    /** 
     * For future use.
     * Indicates that this store is read only.
     */
    this.readonly = true;
  }

  /**
   * @param {AmfDocument} amf
   */
  __amfChanged(amf) {
    this.serializer.amf = amf;
    if (this.target) {
      StoreEvents.graphChange(this.target);
    }
  }

  /**
   * @returns {Promise<ApiSummary|null>} 
   */
  async apiSummary() {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const api = this._computeApi(amf);
    const result = this.serializer.apiSummary(api);
    return result;
  }

  /**
   * Reads an endpoint by its id.
   * @param {string} id The domain id of the endpoint.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpoint(id) {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const api = this._computeApi(amf);
    if (!api) {
      return null;
    }
    const endpoint = this._computeEndpointModel(api, id);
    if (!endpoint) {
      throw new Error(`Endpoint ${id} does not exist.`);
    }
    const result = this.serializer.endPoint(endpoint);
    return result;
  }

  /**
   * Reads an endpoint by its path.
   * @param {string} path The path value of the endpoint or channel name.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpointByPath(path) {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const api = this._computeApi(amf);
    if (!api) {
      return null;
    }
    const endpoints = this._computeEndpoints(api);
    if (!Array.isArray(endpoints) || !endpoints.length) {
      throw new Error(`This API has no endpoints.`);
    }
    const endpoint = endpoints.find((e) => this._getValue(e, this.ns.aml.vocabularies.apiContract.path) === path);
    if (!endpoint) {
      throw new Error(`Endpoint ${endpoint} does not exist.`);
    }
    const result = this.serializer.endPoint(endpoint);
    return result;
  }

  /**
   * Lists all endpoints with operations included into the result.
   * @returns {Promise<ApiEndPointWithOperationsListItem[]>}
   */
  async listEndpointsWithOperations() {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const api = this._computeApi(amf);
    if (!api) {
      return [];
    }
    const endpoints = this._computeEndpoints(api);
    if (!Array.isArray(endpoints) || !endpoints.length) {
      return [];
    }
    return endpoints.map((ep) => this.serializer.endPointWithOperationsListItem(ep));
  }

  /**
   * Queries for the list of servers for method, if defined, or endpoint, if defined, or root level 
   * @param {ServersQueryOptions=} query Server query options
   * @returns {Promise<ApiServer[]>} The list of servers for given query.
   */
  async queryServers(query) {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const servers = this._getServers(query);
    if (!Array.isArray(servers)) {
      return [];
    }
    return servers.map(s => this.serializer.server(s));
  }
}
