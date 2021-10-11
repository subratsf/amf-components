import { AmfHelperMixin } from '../helpers/AmfHelperMixin.js';
import { AmfSerializer } from '../helpers/AmfSerializer.js';

/** @typedef {import('../helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../helpers/amf').DomainElement} DomainElement */
/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../helpers/api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

/**
 * The store that provides an API to read data from the AMF graph model.
 */
export class AmfStore extends AmfHelperMixin(Object) {
  /**
   * @param {AmfDocument} graph The full API model.
   */
  constructor(graph) {
    super();
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
  }

  /**
   * @returns {Promise<ApiSummary|null>} 
   */
  async apiSummary() {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const result = this.serializer.apiSummary(amf);
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
      return null;
    }
    const endpoints = this._computeEndpoints(api);
    if (!Array.isArray(endpoints) || !endpoints.length) {
      return [];
    }
    return endpoints.map((ep) => this.serializer.endPointWithOperationsListItem(ep));
  }
}
