import { AmfHelperMixin } from '../helpers/AmfHelperMixin';
import { AmfSerializer } from '../helpers/AmfSerializer';
import { AmfDocument, DomainElement } from '../helpers/amf';
import { ApiSummary, ApiEndPoint, ApiOperation, ServersQueryOptions, ApiServer, ApiDocumentation, ApiSecurityScheme, ApiSecurityRequirement, ApiRequest, ApiResponse, ApiPayload, ApiShapeUnion } from '../helpers/api';
import { DocumentMeta, ApiEndPointWithOperationsListItem, ApiSecuritySchemeListItem, ApiNodeShapeListItem } from '../types';

/**
 * The store that provides an API to read data from the AMF graph model.
 */
export class AmfStore extends AmfHelperMixin(Object) {
  /**
   * The event target to dispatch the events on.
   */
  target: EventTarget;
  /**
   * The full API model.
   */
  amf: AmfDocument;
  /** 
   * The API serializer
   */
  serializer: AmfSerializer;
  /** 
   * For future use.
   * Indicates that this store is read only.
   */
  readonly?: boolean;
  /**
   * @param eventsTarget The event target to dispatch the events on.
   * @param graph The full API model.
   */
  constructor(eventsTarget?: EventTarget, graph?: AmfDocument);

  __amfChanged(amf: AmfDocument): void;

  /**
   * @returns The list of domain types for the currently loaded document.
   */
  getDocumentTypes(): string[];

  /**
   * Gathers information about the loaded document.
   * This is mainly used by the `api-documentation` element to decide which documentation to render.
   */
  documentMeta(): Promise<DocumentMeta>;

  /**
   * @returns API summary for the summary view.
   */
  apiSummary(): Promise<ApiSummary|null>;

  /**
   * @returns Currently loaded API's protocols
   */
  apiProtocols(): Promise<string[]|null>;

  /**
   * @returns Currently loaded API's version
   */
  apiVersion(): Promise<string|null>;

  /**
   * Finds an endpoint in the graph.
   * @param id The domain id of the endpoint.
   */
  private findEndpoint(id: string): ApiEndPoint|null;
  
  /**
   * Reads an endpoint by its id.
   * @param id The domain id of the endpoint.
   */
  getEndpoint(id: string): Promise<ApiEndPoint|null>;

  /**
   * Reads an endpoint by its path.
   * @param path The path value of the endpoint or channel name.
   */
  getEndpointByPath(path: string): Promise<ApiEndPoint|null>;

  /**
   * Lists all endpoints with operations included into the result.
   */
  listEndpointsWithOperations(): Promise<ApiEndPointWithOperationsListItem[]>;

  /**
   * Queries for the list of servers for method, if defined, or endpoint, if defined, or root level 
   * @param query Server query options
   * @returns The list of servers for given query.
   */
  queryServers(query?: ServersQueryOptions): Promise<ApiServer[]>;

  /**
   * Searches for an operation in the API.
   * @param operationId The domain id of the operation to read.
   * @param endpointId Optional endpoint id. When not set it searches through all endpoints.
   */
  private findOperation(operationId: string, endpointId?: string): ApiOperation|undefined;

  /**
   * Reads the operation model.
   * @param operationId The domain id of the operation to read.
   * @param endpointId Optional endpoint id. When not set it searches through all endpoints.
   */
  getOperation(operationId: string, endpointId?: string): Promise<ApiOperation>;

  /**
   * Finds an endpoint that has the operation.
   * @param id Method name or the domain id of the operation to find
   */
  getOperationParent(id: string): Promise<ApiEndPoint|undefined>;

  /**
   * Lists the documentation definitions for the API.
   */
  listDocumentations(): Promise<ApiDocumentation[]>;

  /**
   * Reads the documentation object from the store.
   * @param id The domain id of the documentation object
   * @returns The read documentation.
   */
  getDocumentation(id: string): Promise<ApiDocumentation|undefined>;

  /**
   * Reads the SecurityScheme object from the graph.
   * @param id The domain id of the SecurityScheme
   */
  getSecurityScheme(id: string): Promise<ApiSecurityScheme>;

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param id The domain id of the SecurityRequirement
   */
  getSecurityRequirement(id: string): Promise<ApiSecurityRequirement>;

  /**
   * Lists the security definitions for the API.
   */
  listSecurity(): Promise<ApiSecuritySchemeListItem[]>;

  /**
   * Reads the Request object from the graph.
   * @param id The domain id of the Request
   */
  getRequest(id: string): Promise<ApiRequest>;

  /**
   * Reads the response data from the graph.
   * @param id The domain id of the response.
   */
  getResponse(id: string): Promise<ApiResponse>;

  /**
   * Finds a payload in a request or a response object.
   */
  private findPayload(object: DomainElement, domainId: string): ApiPayload|undefined;

  /**
   * Reads Payload data from the graph
   * @param id The domain id of the payload
   */
  getPayload(id: string): Promise<ApiPayload>;

  /**
   * Lists the type (schema) definitions for the API.
   */
  listTypes(): Promise<ApiNodeShapeListItem[]>;

  /**
   * @param id The domain id of the API type (schema).
   */
  getType(id: string): Promise<ApiShapeUnion>;
}
