import { TemplateResult } from 'lit-element';
import { Oauth2Credentials } from '@advanced-rest-client/authorization';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { EndPoint } from '../helpers/amf';
import { ApiOperation, ApiServer, ApiEndPoint } from '../helpers/api';
import { ApiConsoleRequest, ServerType } from '../types';

export const operationIdValue: unique symbol;
export const queryEndpoint: unique symbol;
export const queryServers: unique symbol;
export const endpointValue: unique symbol;
export const serversValue: unique symbol;
export const serverValue: unique symbol;
export const serverIdValue: unique symbol;
export const urlValue: unique symbol;
export const baseUriValue: unique symbol;
export const computeUrlValue: unique symbol;
export const titleTemplate: unique symbol;
export const urlTemplate: unique symbol;
export const operationsTemplate: unique symbol;
export const operationTemplate: unique symbol;
export const operationIdChanged: unique symbol;
export const selectServer: unique symbol;
export const processServerSelection: unique symbol;
export const extensionsTemplate: unique symbol;
export const tryItColumnTemplate: unique symbol;
export const httpRequestTemplate: unique symbol;
export const codeSnippetsPanelTemplate: unique symbol;
export const requestChangeHandler: unique symbol;
export const requestValues: unique symbol;
export const collectCodeSnippets: unique symbol;
export const processSelectionTimeout: unique symbol;
export const extendsTemplate: unique symbol;
export const traitsTemplate: unique symbol;

/**
 * A web component that renders the resource documentation page for an API resource built from 
 * the AMF graph model.
 * 
 * @fires tryit
 */
export default class ApiResourceDocumentationElement extends ApiDocumentationBase {
  get endpoint(): ApiEndPoint|undefined;
  set endpoint(value: ApiEndPoint);
  [endpointValue]: ApiEndPoint;
  [operationIdValue]: string;
  [serverIdValue]: string;
  [serverValue]: ApiServer|undefined;
  get server(): ApiServer|undefined;
  set server(value: ApiServer);

  /**
   * @returns The list of the servers read from the API and the endpoint.
   */
  get servers(): ApiServer[];
  [serversValue]: ApiServer[];
  /**
   * @returns The list of protocols to render.
   */
  get protocol(): string|undefined;
  [baseUriValue]: string|undefined;
  /**
   * A property to set to override AMF's model base URI information.
   * When this property is set, the `endpointUri` property is recalculated.
   * @attribute
   */
  baseUri: string;

  /**
   * @returns The computed URI for the endpoint.
   */
  get endpointUri(): string|undefined;

  /** 
   * The id of the currently selected server to use to construct the URL.
   * If not set a first server in the API servers array is used.
   * @attribute
   */
  serverId: string;
  /** 
  * When set it scrolls to the operation with the given id, if exists.
  * The operation is performed after render.
  * @attribute
  */
  operationId: string;
  /** 
  * When set it opens the parameters section
  * @attribute
  */
  parametersOpened: boolean;
  /** 
  * When set it renders the "try it" button that dispatches the `tryit` event.
  * @attribute
  */
  tryItButton: boolean;
  /** 
  * When set it renders the "try it" panel next to the operation documentation.
  * Setting this automatically disables the `tryItButton` property.
  * 
  * Note, use this only when there's enough space on the screen to render 2 panels side-by-side.
  * @attribute
  */
  tryItPanel: boolean;
  /** 
  * When set it renders the URL input above the URL parameters in the HTTP editor.
  * @attribute
  */
  httpUrlEditor: boolean;
  /** 
  * When set it applies the authorization values to the request dispatched
  * with the API request event.
  * If possible, it applies the authorization values to query parameter or headers
  * depending on the configuration.
  * 
  * When the values arr applied to the request the authorization config is kept in the
  * request object, but its `enabled` state is always `false`, meaning other potential
  * processors should ignore this values.
  * 
  * If this property is not set then the application hosting this component should
  * process the authorization data and apply them to the request.
  * @attribute
  */
  httpApplyAuthorization: boolean;
  /**
  * List of credentials source passed to the HTTP editor
  */
  httpCredentialsSource: Oauth2Credentials[];
  /**
  * OAuth2 redirect URI.
  * This value **must** be set in order for OAuth 1/2 to work properly.
  * This is only required in inline mode (`inlineMethods`).
  * @attribute
  */
  redirectUri: string;
  /**
  * Optional property to set on the request editor. 
  * When true, the server selector is not rendered
  * @attribute
  */
  httpNoServerSelector: boolean;
  /**
  * When set it renders "add custom" item button in the HTTP request editor.
  * If the element is to be used without AMF model this should always
  * be enabled. Otherwise users won't be able to add a parameter.
  * @attribute
  */
  httpAllowCustom: boolean;
  /**
  * Optional property to set on the request editor. 
  * If true, the server selector custom base URI option is rendered
  * @attribute
  */
  httpAllowCustomBaseUri: boolean;
  /** 
  * When set it renders the view optimised for asynchronous API operation.
  * @attribute
  */
  asyncApi: boolean;
  /**
  * Holds the value of the currently selected server
  * Data type: URI
  * @attribute
  */
  serverValue: string;
  /**
  * Holds the type of the currently selected server
  * Values: `server` | `uri` | `custom`
  * @attribute
  */
  serverType: ServerType;
  domainModel: EndPoint;
  [requestValues]: Record<string, ApiConsoleRequest>;

  [processSelectionTimeout]: any;

  // /**
  //  * @returns {boolean} true when the API operated over an HTTP protocol. By default it returns true.
  //  */
  // get isHttp() {
  //   const { protocol } = this;
  //   return ['http', 'https'].includes(String(protocol).toLowerCase());
  // }

  constructor();

  disconnectedCallback(): void;

  /**
   * Scrolls the view to the operation, when present in the DOM.
   * @param id The operation domain id to scroll into.
   */
  scrollToOperation(id: string): void;
  processGraph(): Promise<void>;

  /**
   * Scrolls to the selected operation after view update.
   */
  [operationIdChanged](): Promise<void>;

  /**
   * Queries for the current servers value.
   */
  [queryServers](): Promise<void>;

  /**
   * Sets the private server value for the current server defined by `serverId`.
   * Calls the `[processServerSelection]()` function to set server related values.
   */
  [selectServer](): void;
  
  /**
   * Performs actions after a server is selected.
   */
  [processServerSelection](): void;

  /**
   * Computes the URL value for the current serves, selected server, and endpoint's path.
   */
  [computeUrlValue](): void;

  /**
   * Runs over each request editor and collects request values for code snippets generators.
   */
  [collectCodeSnippets](): void;
  [requestChangeHandler](e: Event): void;

  render(): TemplateResult;

  /**
   * @returns The template for the Operation title.
   */
  [titleTemplate](): TemplateResult|string;

  /**
   * @returns The template for the operation's URL.
   */
  [urlTemplate](): TemplateResult|string;

  /**
   * @returns The template for the list of operations.
   */
  [operationsTemplate](): TemplateResult|string;

  /**
   * @param operation The operation to render.
   * @returns The template for the API operation.
   */
  [operationTemplate](operation: ApiOperation): TemplateResult|string;

  /**
   * @param operation The operation to render.
   * @returns The template for the try it column panel rendered next to the operation documentation/
   */
  [tryItColumnTemplate](operation: ApiOperation): TemplateResult|string;

  /**
   * @param operation The operation to render.
   * @returns The template for the request editor.
   */
  [httpRequestTemplate](operation: ApiOperation): TemplateResult|string;

  /**
   * @param operation The operation to render.
   * @returns The template for the request's code snippets.
   */
  [codeSnippetsPanelTemplate](operation: ApiOperation): TemplateResult|string;

  /**
   * @return The template for the endpoint's extensions.
   */
  [extensionsTemplate](): TemplateResult|string;

  /**
   * @returns The template for the parent resource type.
   */
  [extendsTemplate](label: string): TemplateResult|string;

  /**
   * @returns The template for the traits applied to the resource.
   */
  [traitsTemplate](label: string): TemplateResult|string;
}
