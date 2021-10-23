/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-continue */
import { AmfHelperMixin } from '../helpers/AmfHelperMixin.js';
import { AmfSerializer } from '../helpers/AmfSerializer.js';
import { StoreEvents } from '../events/StoreEvents.js';
import { AmfStore } from './AmfStore.js';

/** @typedef {import('../helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../helpers/amf').DomainElement} DomainElement */
/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../helpers/api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../helpers/api').ApiOperation} ApiOperation */
/** @typedef {import('../helpers/api').ServersQueryOptions} ServersQueryOptions */
/** @typedef {import('../helpers/api').ApiServer} ApiServer */
/** @typedef {import('../helpers/api').ApiDocumentation} ApiDocumentation */
/** @typedef {import('../helpers/api').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('../helpers/api').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('../helpers/api').ApiRequest} ApiRequest */
/** @typedef {import('../helpers/api').ApiResponse} ApiResponse */
/** @typedef {import('../helpers/api').ApiPayload} ApiPayload */
/** @typedef {import('../helpers/api').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */
/** @typedef {import('../types').ApiNodeShapeListItem} ApiNodeShapeListItem */
/** @typedef {import('../types').DocumentMeta} DocumentMeta */

/**
 * The store that provides an API to read data from the AMF graph model.
 * The graph model is kept in memory in a form of a Raw ld+json graph representation of the 
 * AMF's domain model.
 */
export class InMemAmfGraphStore extends AmfHelperMixin(AmfStore) {
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
    /** 
     * The graph model.
     */
    this.amf = amf;
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
   * @returns {string[]} The list of domain types for the currently loaded document.
   */
  getDocumentTypes() {
    let { amf } = this;
    if (Array.isArray(amf)) {
      [amf] = amf;
    }
    if (!amf) {
      return [];
    }
    return this.serializer.readTypes(amf['@type']);
  }

  /**
   * Gathers information about the loaded document.
   * This is mainly used by the `api-documentation` element to decide which documentation to render.
   * 
   * @returns {Promise<DocumentMeta>}
   */
  async documentMeta() {
    const result = /** @type DocumentMeta */ ({
      isApi: false,
      isAsync: false,
      isFragment: false,
      isLibrary: false,
      types: this.getDocumentTypes(),
      encodesId: undefined,
    });
    let { amf } = this;
    if (Array.isArray(amf)) {
      [amf] = amf;
    }
    if (!amf) {
      return result;
    }
    const encodes = this._computeEncodes(amf);
    result.encodesId = encodes && encodes['@id'];
    const api = this._computeApi(amf);
    const isApi = !!api;
    result.isApi = isApi;
    const { ns } = this;
    if (isApi) {
      result.isAsync = this._isAsyncAPI(amf);
    } else if (result.types[0] === ns.aml.vocabularies.document.Module) {
      result.isLibrary = true;
    } else {
      const fragmentTypes = [
        ns.aml.vocabularies.security.SecuritySchemeFragment,
        ns.aml.vocabularies.apiContract.UserDocumentationFragment,
        ns.aml.vocabularies.shapes.DataTypeFragment,
      ];
      result.isFragment = fragmentTypes.some(type => result.types.includes(type));
    }
    return result;
  }

  /**
   * @returns {Promise<ApiSummary|null>} API summary for the summary view.
   */
  async apiSummary() {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const api = this._computeApi(amf);
    if (!api) {
      return null;
    }
    const result = this.serializer.apiSummary(api);
    return result;
  }

  /**
   * @returns {Promise<string[]|null>} Currently loaded API's protocols
   */
  async apiProtocols() {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const wa = this._computeApi(this.amf);
    const protocols = /** @type string[] */ (this._getValueArray(wa, this.ns.aml.vocabularies.apiContract.scheme));
    return protocols;
  }

  /**
   * @returns {Promise<string|null>} Currently loaded API's version
   */
  async apiVersion() {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const version = this._computeApiVersion(amf);
    return version;
  }

  /**
   * Finds an endpoint in the graph.
   * @param {string} id The domain id of the endpoint.
   * @returns {ApiEndPoint|null} 
   * @private
   */
  findEndpoint(id) {
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
   * Reads an endpoint by its id.
   * @param {string} id The domain id of the endpoint.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpoint(id) {
    return this.findEndpoint(id);
  }

  /**
   * Reads an endpoint by its path.
   * @param {string} path The path value of the endpoint or channel name.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpointByPath(path) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const api = this._computeApi(amf);
    if (!api) {
      return undefined;
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
      return [];
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
      return undefined;
    }
    const servers = this._getServers(query);
    if (!Array.isArray(servers)) {
      return [];
    }
    return servers.map(s => this.serializer.server(s));
  }

  /**
   * Searches for an operation in the API.
   * @param {string} operationId The domain id of the operation to read.
   * @param {string=} endpointId Optional endpoint id. When not set it searches through all endpoints.
   * @returns {ApiOperation|undefined}
   */
  findOperation(operationId, endpointId) {
    if (endpointId) {
      const ep = this.findEndpoint(endpointId);
      if (!ep) {
        return undefined;
      }
      return ep.operations.find((op) => op.id === operationId || op.method === operationId);
    }
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const api = this._computeApi(amf);
    if (!api) {
      return undefined;
    }
    const endpoints = this._computeEndpoints(api);
    if (!endpoints) {
      return undefined;
    }
    const { apiContract } = this.ns.aml.vocabularies;
    const opKey = this._getAmfKey(apiContract.supportedOperation);
    for (const endpoint of endpoints) {
      let operations = endpoint[opKey];
      if (!operations) {
        continue;
      }
      if (!Array.isArray(operations)) {
        operations = [operations];
      }
      for (const operation of operations) {
        if (operation['@id'] === operationId || this._getValue(operation, apiContract.method) === operationId) {
          return this.serializer.operation(operation);
        }
      }
    }
    return undefined;
  }

  /**
   * Reads the operation model.
   * @param {string} operationId The domain id of the operation to read.
   * @param {string=} endpointId Optional endpoint id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  async getOperation(operationId, endpointId) {
    const op = this.findOperation(operationId, endpointId);
    if (!op) {
      throw new Error(`No operation ${operationId} in the graph`);
    }
    return op;
  }

  /**
   * Finds an endpoint that has the operation.
   * @param {string} id Method name or the domain id of the operation to find
   * @returns {Promise<ApiEndPoint|undefined>}
   */
  async getOperationParent(id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const api = this._computeApi(amf);
    if (!api) {
      return undefined;
    }
    const endpoint = this._computeMethodEndpoint(api, id);
    if (!endpoint) {
      throw new Error(`Operation ${id} does not exist.`);
    }
    const result = this.serializer.endPoint(endpoint);
    return result;
  }

  /**
   * Lists the documentation definitions for the API.
   * @returns {Promise<ApiDocumentation[]>}
   */
  async listDocumentations() {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    if (this._hasType(amf, this.ns.aml.vocabularies.apiContract.UserDocumentationFragment)) {
      const model = this._computeEncodes(amf);
      if (!model) {
        return undefined;
      }
      return [this.serializer.documentation(model)];
    }
    const api = this._computeApi(amf);
    if (!api) {
      return undefined;
    }
    const key = this._getAmfKey(this.ns.aml.vocabularies.core.documentation);
    const docs = this._ensureArray(api[key]);
    if (docs) {
      return docs.map((doc) => this.serializer.documentation(doc));
    }
    return undefined;
  }

  /**
   * Reads the documentation object from the store.
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<ApiDocumentation|undefined>} The read documentation.
   */
  async getDocumentation(id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const types = this.getDocumentTypes();
    // when we have loaded Documentation fragment then the id doesn't matter.
    if (types.includes(this.ns.aml.vocabularies.apiContract.UserDocumentationFragment)) {
      const encodes = this._computeEncodes(amf);
      return this.serializer.documentation(encodes);
    }
    const api = this._computeApi(amf);
    if (!api) {
      return null;
    }
    const creative = this._computeDocument(api, id);
    if (!creative) {
      throw new Error(`Documentation ${id} does not exist.`);
    }
    const result = this.serializer.documentation(creative);
    return result;
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param {string} id The domain id of the SecurityScheme
   * @returns {Promise<ApiSecurityScheme>}
   */
  async getSecurityScheme(id) {
    const types = this.getDocumentTypes();
    // when we have loaded Security fragment then the id doesn't matter.
    if (types.includes(this.ns.aml.vocabularies.security.SecuritySchemeFragment)) {
      const { amf } = this;
      if (!amf) {
        return undefined;
      }
      const encodes = this._computeEncodes(amf);
      return this.serializer.securityScheme(encodes);
    }
    const object = this.findSecurityScheme(id);
    if (!object) {
      throw new Error(`No SecurityRequirement for ${id}`);
    }
    return this.serializer.securityScheme(object);
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param {string} id The domain id of the SecurityRequirement
   * @returns {Promise<ApiSecurityRequirement>}
   */
  async getSecurityRequirement(id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const wa = this._computeApi(amf);
    if (!wa) {
      return undefined;
    }
    const endpoints = wa[this._getAmfKey(this.ns.aml.vocabularies.apiContract.endpoint)];
    if (!Array.isArray(endpoints)) {
      return undefined;
    }
    for (const endpoint of endpoints) {
      const operations = endpoint[this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation)];
      if (Array.isArray(operations)) {
        for (const operation of operations) {
          const securityList = operation[this._getAmfKey(this.ns.aml.vocabularies.security.security)];
          if (Array.isArray(securityList)) {
            for (const security of securityList) {
              if (security['@id'] === id) {
                return this.serializer.securityRequirement(security);
              }
            }
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Lists the security definitions for the API.
   * @returns {Promise<ApiSecuritySchemeListItem[]>}
   */
  async listSecurity() {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    if (this._hasType(amf, this.ns.aml.vocabularies.security.SecuritySchemeFragment)) {
      const model = this._computeEncodes(amf);
      if (!model) {
        return undefined;
      }
      return [this.serializer.securitySchemeListItem(model)];
    }
    const items = this.getByType(amf, this.ns.aml.vocabularies.security.SecurityScheme);
    return items.map(item => this.serializer.securitySchemeListItem(item));
  }

  /**
   * Reads the Request object from the graph.
   * @param {string} id The domain id of the Request
   * @returns {Promise<ApiRequest>}
   */
  async getRequest(id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const wa = this._computeApi(amf);
    if (!wa) {
      return undefined;
    }
    const endpoints = wa[this._getAmfKey(this.ns.aml.vocabularies.apiContract.endpoint)];
    if (!Array.isArray(endpoints)) {
      return undefined;
    }
    for (const endpoint of endpoints) {
      const operations = endpoint[this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation)];
      if (Array.isArray(operations)) {
        for (const operation of operations) {
          const expectsList = operation[this._getAmfKey(this.ns.aml.vocabularies.apiContract.expects)];
          if (Array.isArray(expectsList)) {
            for (const expects of expectsList) {
              if (expects['@id'] === id) {
                return this.serializer.request(expects);
              }
            }
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Reads the response data from the graph.
   * @param {string} id The domain id of the response.
   * @returns {Promise<ApiResponse>}
   */
  async getResponse(id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const wa = this._computeApi(amf);
    if (!wa) {
      return undefined;
    }
    const endpoints = wa[this._getAmfKey(this.ns.aml.vocabularies.apiContract.endpoint)];
    if (!Array.isArray(endpoints)) {
      return undefined;
    }
    for (const endpoint of endpoints) {
      const operations = endpoint[this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation)];
      if (Array.isArray(operations)) {
        for (const operation of operations) {
          const returnsList = operation[this._getAmfKey(this.ns.aml.vocabularies.apiContract.returns)];
          if (Array.isArray(returnsList)) {
            for (const returns of returnsList) {
              if (returns['@id'] === id) {
                return this.serializer.response(returns);
              }
            }
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Finds a payload in a request or a response object.
   * @param {DomainElement} object
   * @param {string} domainId
   * @returns {ApiPayload|undefined}
   */
  findPayload(object, domainId) {
    const list = object[this._getAmfKey(this.ns.aml.vocabularies.apiContract.payload)];
    if (!Array.isArray(list) || !list.length) {
      return undefined;
    }
    const model = list.find(i => i['@id'] === domainId);
    if (!model) {
      return undefined;
    }
    return this.serializer.payload(model);
  }

  /**
   * Reads Payload data from the graph
   * @param {string} id The domain id of the payload
   * @returns {Promise<ApiPayload>}
   */
  async getPayload(id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const wa = this._computeApi(amf);
    if (!wa) {
      return undefined;
    }
    const endpoints = wa[this._getAmfKey(this.ns.aml.vocabularies.apiContract.endpoint)];
    if (!Array.isArray(endpoints)) {
      return undefined;
    }
    for (const endpoint of endpoints) {
      const operations = endpoint[this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation)];
      if (Array.isArray(operations)) {
        for (const operation of operations) {
          const expectsList = operation[this._getAmfKey(this.ns.aml.vocabularies.apiContract.expects)];
          if (Array.isArray(expectsList)) {
            for (const expects of expectsList) {
              const payload = this.findPayload(expects, id);
              if (payload) {
                return payload;
              }
            }
          }
          const returnsList = operation[this._getAmfKey(this.ns.aml.vocabularies.apiContract.returns)];
          if (Array.isArray(returnsList)) {
            for (const returns of returnsList) {
              const payload = this.findPayload(returns, id);
              if (payload) {
                return payload;
              }
            }
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Lists the type (schema) definitions for the API.
   * @returns {Promise<ApiNodeShapeListItem[]>}
   */
  async listTypes() {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    if (this._hasType(amf, this.ns.aml.vocabularies.shapes.DataTypeFragment)) {
      const model = this._computeEncodes(amf);
      if (!model) {
        return undefined;
      }
      return [this.serializer.unknownShape(model)];
    }
    const items = this.getByType(amf, this.ns.aml.vocabularies.shapes.Shape);
    return items.map(item => this.serializer.unknownShape(item));
  }

  /**
   * @param {string} id The domain id of the API type (schema).
   * @returns {Promise<ApiShapeUnion>}
   */
  async getType(id) {
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    const types = this.getDocumentTypes();
    // when we have loaded Type fragment then the id doesn't matter.
    if (types.includes(this.ns.aml.vocabularies.shapes.DataTypeFragment)) {
      const encodes = this._computeEncodes(amf);
      return this.serializer.unknownShape(encodes);
    }
    const declares = this._computeDeclares(amf);
    const references = this._computeReferences(amf);
    const type = this._computeType(declares, references, id);
    if (!type) {
      return undefined;
    }
    return this.serializer.unknownShape(type);
  }
}
