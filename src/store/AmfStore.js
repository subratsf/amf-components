/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

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
 * An abstract base class for the store implementation that works with API Components.
 */
export class AmfStore {
  constructor() {
    /** 
     * For future use.
     * Indicates that the store is read only.
     */
    this.readonly = true;
  }

  /**
   * @returns {string[]} The list of domain types for the currently loaded document.
   */
  getDocumentTypes() {
    throw new Error('Not implemented');
  }

  /**
   * Gathers information about the loaded document.
   * This is mainly used by the `api-documentation` element to decide which documentation to render.
   * 
   * @returns {Promise<DocumentMeta>}
   */
  async documentMeta() {
    throw new Error('Not implemented');
  }

  /**
   * @returns {Promise<ApiSummary|null>} API summary for the summary view.
   */
  async apiSummary() {
    throw new Error('Not implemented');
  }

  /**
   * @returns {Promise<string[]|null>} Currently loaded API's protocols
   */
  async apiProtocols() {
    throw new Error('Not implemented');
  }

  /**
   * @returns {Promise<string|null>} Currently loaded API's version
   */
  async apiVersion() {
    throw new Error('Not implemented');
  }
  
  /**
   * Reads an endpoint by its id.
   * @param {string} id The domain id of the endpoint.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpoint(id) {
    throw new Error('Not implemented');
  }

  /**
   * Reads an endpoint by its path.
   * @param {string} path The path value of the endpoint or channel name.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpointByPath(path) {
    throw new Error('Not implemented');
  }

  /**
   * Lists all endpoints with operations included into the result.
   * @returns {Promise<ApiEndPointWithOperationsListItem[]>}
   */
  async listEndpointsWithOperations() {
    throw new Error('Not implemented');
  }

  /**
   * Queries for the list of servers for method, if defined, or endpoint, if defined, or root level 
   * @param {ServersQueryOptions=} query Server query options
   * @returns {Promise<ApiServer[]>} The list of servers for given query.
   */
  async queryServers(query) {
    throw new Error('Not implemented');
  }

  /**
   * Reads the operation model.
   * @param {string} operationId The domain id of the operation to read.
   * @param {string=} endpointId Optional endpoint id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  async getOperation(operationId, endpointId) {
    throw new Error('Not implemented');
  }

  /**
   * Finds an endpoint that has the operation.
   * @param {string} id Method name or the domain id of the operation to find
   * @returns {Promise<ApiEndPoint|undefined>}
   */
  async getOperationParent(id) {
    throw new Error('Not implemented');
  }

  /**
   * Lists the documentation definitions for the API.
   * @returns {Promise<ApiDocumentation[]>}
   */
  async listDocumentations() {
    throw new Error('Not implemented');
  }

  /**
   * Reads the documentation object from the store.
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<ApiDocumentation|undefined>} The read documentation.
   */
  async getDocumentation(id) {
    throw new Error('Not implemented');
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param {string} id The domain id of the SecurityScheme
   * @returns {Promise<ApiSecurityScheme>}
   */
  async getSecurityScheme(id) {
    throw new Error('Not implemented');
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param {string} id The domain id of the SecurityRequirement
   * @returns {Promise<ApiSecurityRequirement>}
   */
  async getSecurityRequirement(id) {
    throw new Error('Not implemented');
  }

  /**
   * Lists the security definitions for the API.
   * @returns {Promise<ApiSecuritySchemeListItem[]>}
   */
  async listSecurity() {
    throw new Error('Not implemented');
  }

  /**
   * Reads the Request object from the graph.
   * @param {string} id The domain id of the Request
   * @returns {Promise<ApiRequest>}
   */
  async getRequest(id) {
    throw new Error('Not implemented');
  }

  /**
   * Reads the response data from the graph.
   * @param {string} id The domain id of the response.
   * @returns {Promise<ApiResponse>}
   */
  async getResponse(id) {
    throw new Error('Not implemented');
  }

  /**
   * Reads Payload data from the graph
   * @param {string} id The domain id of the payload
   * @returns {Promise<ApiPayload>}
   */
  async getPayload(id) {
    throw new Error('Not implemented');
  }

  /**
   * Lists the type (schema) definitions for the API.
   * @returns {Promise<ApiNodeShapeListItem[]>}
   */
  async listTypes() {
    throw new Error(`Not implemented`);
  }

  /**
   * @param {string} id The domain id of the API type (schema).
   * @returns {Promise<ApiShapeUnion>}
   */
  async getType(id) {
    throw new Error('Not implemented');
  }
}
