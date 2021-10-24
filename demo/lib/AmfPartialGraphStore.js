/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */
import { AmfStoreDomEventsMixin, AmfStore, AmfSerializer, AmfHelperMixin, ns } from '../../index.js';
import { AmfPartialModel } from './AmfPartialModel.js';

/** @typedef {import('../../src/helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../../src/helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../../src/helpers/api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../../src/helpers/api').ApiOperation} ApiOperation */
/** @typedef {import('../../src/helpers/api').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('../../src/helpers/api').ServersQueryOptions} ServersQueryOptions */
/** @typedef {import('../../src/helpers/api').ApiServer} ApiServer */
/** @typedef {import('../../src/helpers/api').ApiDocumentation} ApiDocumentation */
/** @typedef {import('../../src/helpers/api').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('../../src/types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../../src/types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */
/** @typedef {import('../../src/types').ApiNodeShapeListItem} ApiNodeShapeListItem */
/** @typedef {import('../../src/types').DocumentMeta} DocumentMeta */

class AmfHelper extends AmfHelperMixin(Object) {}

/**
 * This is a demo class that represents how a store can be implemented that serves the AMF model
 * in parts from a backend.
 * 
 * In here we use `AmfPartialModel` class but in a real-life scenario this class could be a connector
 * to an HTTP service.
 */
export class AmfPartialGraphStore extends AmfStoreDomEventsMixin(AmfStore) {
  /**
   * @param {EventTarget=} eventsTarget The event target to dispatch the events on.
   * @param {AmfDocument=} graph The full API model.
   */
  constructor(eventsTarget=window, graph) {
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
    this.partial = new AmfPartialModel(amf);

    this.cache = {};
  }

  /** @returns AmfDocument */
  get amf() {
    return this.partial.amf;
  }

  /** @param {AmfDocument} graph */
  set amf(graph) {
    let amf = graph;
    if (Array.isArray(graph)) {
      [amf] = graph;
    }
    this.cache = {};
    this.partial.amf = amf;
  }

  /**
   * Gathers information about the loaded document.
   * This is mainly used by the `api-documentation` element to decide which documentation to render.
   * 
   * @returns {Promise<DocumentMeta>}
   */
  async documentMeta() {
    if (this.cache.documentMeta) {
      return this.cache.documentMeta;
    }
    const meta = this.partial.documentMeta();
    this.cache.documentMeta = meta;
    return meta;
  }

  /**
   * @returns {Promise<ApiSummary>} The API base definition 
   */
  async apiSummary() {
    if (this.cache.summary) {
      return this.cache.summary;
    }
    const model = this.partial.summaryPartial();
    if (!model) {
      return undefined;
    }
    const helper = new AmfHelper();
    helper.amf = model;
    const wa = helper._computeApi(model);
    const result = this.serializer.apiSummary(wa);
    this.cache.summary = result;
    return result;
  }

  /**
   * Reads an endpoint by its id.
   * @param {string} id The domain id of the endpoint.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpoint(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }
    const model = this.partial.endpoint(id);
    const result = this.serializer.endPoint(model, model['@context']);
    this.cache[id] = result;
    result.operations.forEach((op) => {
      this.cache[op.id] = op;
    });
    return result;
  }

  /**
   * Reads the operation model.
   * @param {string} operationId The domain id of the operation to read.
   * @param {string=} endpointId Optional endpoint id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  async getOperation(operationId, endpointId) {
    if (this.cache[operationId]) {
      return this.cache[operationId];
    }
    const model = this.partial.endpoint(endpointId);
    if (!model) {
      return undefined;
    }
    const endpoint = this.serializer.endPoint(model, model['@context']);
    const op = endpoint.operations.find(i => i.id === operationId);
    this.cache[operationId] = op;
    return op;
  }

  /**
   * Finds an endpoint that has the operation.
   * @param {string} id Method name or the domain id of the operation to find
   * @returns {Promise<ApiEndPoint|undefined>}
   */
  async getOperationParent(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }
    const model = this.partial.partialOperationEndpoint(id);
    if (!model) {
      return undefined;
    }
    const result = this.serializer.endPoint(model, model['@context']);
    this.cache[id] = result;
    return result;
  }

  /**
   * @param {string} domainId The domain id of the API type (schema).
   * @returns {Promise<ApiShapeUnion>}
   */
  async getType(domainId) {
    if (this.cache[domainId]) {
      return this.cache[domainId];
    }
    const model = this.partial.schema(domainId);
    if (!model) {
      return undefined;
    }
    const result = this.serializer.unknownShape(model, undefined, model['@context']);
    this.cache[domainId] = result;
    return result;
  }

  /**
   * Queries for the list of servers for method, if defined, or endpoint, if defined, or root level 
   * @param {ServersQueryOptions=} query Server query options
   * @returns {Promise<ApiServer[]>} The list of servers for given query.
   */
  async queryServers(query={}) {
    const key = `queryServers${JSON.stringify(query)}`;
    if (this.cache[key]) {
      return this.cache[key];
    }
    const model = this.partial.summaryPartial();
    if (!model) {
      return [];
    }
    const helper = new AmfHelper();
    helper.amf = model;
    const servers = helper._getServers(query, model['@context']);
    if (!Array.isArray(servers)) {
      return [];
    }
    const result = servers.map(s => this.serializer.server(s, model['@context']));
    this.cache[key] = result;
    return result;
  }

  /**
   * @returns {Promise<string[]|null>} Currently loaded API's protocols
   */
  async apiProtocols() {
    if (this.cache.protocols) {
      return this.cache.protocols;
    }
    const model = this.partial.summaryPartial();
    if (!model) {
      return null;
    }
    const helper = new AmfHelper();
    helper.amf = model;
    const wa = helper._computeApi(model, model['@context']);
    if (!wa) {
      return [];
    }
    const protocols = /** @type string[] */ (helper._getValueArray(wa, ns.aml.vocabularies.apiContract.scheme));
    this.cache.protocols = protocols;
    return protocols;
  }

  /**
   * @returns {Promise<string|null>} Currently loaded API's version
   */
  async apiVersion() {
    if (this.cache.version) {
      return this.cache.version;
    }
    const model = this.partial.summaryPartial();
    if (!model) {
      return null;
    }
    const helper = new AmfHelper();
    helper.amf = model;
    const version = helper._computeApiVersion(model, model['@context']);
    this.cache.version = version;
    return version;
  }

  /**
   * Lists all endpoints with operations included into the result.
   * @returns {Promise<ApiEndPointWithOperationsListItem[]>}
   */
  async listEndpointsWithOperations() {
    if (this.cache.endpointsListWithOperation) {
      return this.cache.endpointsListWithOperation;
    }
    const model = this.partial.summaryPartial();
    if (!model) {
      return null;
    }
    const helper = new AmfHelper();
    helper.amf = model;
    const api = helper._computeApi(model, model['@context']);
    if (!api) {
      return [];
    }
    const endpoints = helper._computeEndpoints(api, model['@context']);
    if (!Array.isArray(endpoints) || !endpoints.length) {
      return [];
    }
    const result = endpoints.map((ep) => this.serializer.endPointWithOperationsListItem(ep, model['@context']));
    this.cache.endpointsListWithOperation = result;
    return result;
  }

  /**
   * Reads the documentation object from the store.
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<ApiDocumentation|undefined>} The read documentation.
   */
  async getDocumentation(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }
    const creative = this.partial.partialDocumentation(id);
    if (!creative) {
      return undefined;
    }
    const result = this.serializer.documentation(creative, creative['@context']);
    this.cache[id] = result;
    return result;
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param {string} id The domain id of the SecurityScheme
   * @returns {Promise<ApiSecurityScheme>}
   */
  async getSecurityScheme(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }
    const model = this.partial.partialSecurityScheme(id);
    if (!model) {
      throw new Error(`No SecurityRequirement for ${id}`);
    }
    const result = this.serializer.securityScheme(model, model['@context']);
    this.cache[id] = result;
    return result;
  }
}
