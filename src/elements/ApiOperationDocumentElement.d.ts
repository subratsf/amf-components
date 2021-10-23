import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { ApiEndPoint, ApiServer, ApiOperation, ApiResponse, ApiCallback, ApiSecurityRequirement } from '../helpers/api';

export const queryEndpoint: unique symbol;
export const queryOperation: unique symbol;
export const queryServers: unique symbol;
export const queryResponses: unique symbol;
export const operationValue: unique symbol;
export const endpointValue: unique symbol;
export const serversValue: unique symbol;
export const serverIdValue: unique symbol;
export const urlValue: unique symbol;
export const queryProtocols: unique symbol;
export const protocolsValue: unique symbol;
export const queryVersion: unique symbol;
export const versionValue: unique symbol;
export const responsesValue: unique symbol;
export const computeUrlValue: unique symbol;
export const computeParametersValue: unique symbol;
export const snippetsParametersValue: unique symbol;
export const computeSnippetsPayload: unique symbol;
export const computeSnippetsHeaders: unique symbol;
export const snippetsPayloadValue: unique symbol;
export const snippetsHeadersValue: unique symbol;
export const baseUriValue: unique symbol;
export const preselectResponse: unique symbol;
export const preselectSecurity: unique symbol;
export const requestMimeChangeHandler: unique symbol;
export const titleTemplate: unique symbol;
export const traitsTemplate: unique symbol;
export const summaryTemplate: unique symbol;
export const urlTemplate: unique symbol;
export const requestTemplate: unique symbol;
export const responseTemplate: unique symbol;
export const responseTabsTemplate: unique symbol;
export const responseContentTemplate: unique symbol;
export const statusCodeHandler: unique symbol;
export const securitySectionTemplate: unique symbol;
export const securityTemplate: unique symbol;
export const deprecatedTemplate: unique symbol;
export const metaDataTemplate: unique symbol;
export const tryItTemplate: unique symbol;
export const tryItHandler: unique symbol;
export const callbacksTemplate: unique symbol;
export const callbackTemplate: unique symbol;
export const snippetsTemplate: unique symbol;
export const securitySelectorTemplate: unique symbol;
export const securitySelectionHandler: unique symbol;
export const securityTabTemplate: unique symbol;

/**
 * A web component that renders the documentation page for an API operation built from 
 * the AMF graph model.
 * 
 * @fires tryit
 */
export default class ApiOperationDocumentElement extends ApiDocumentationBase {
  /**
   * @returns The computed list of servers.
   */
  get servers(): ApiServer[]|undefined;
  [serversValue]: ApiServer[]|undefined;

  /**
   * @returns The current server in use.
   */
  get server(): ApiServer|undefined;

  get operation(): ApiOperation;
  set operation(value: ApiOperation);
  [operationValue]: ApiOperation;

  get endpoint(): ApiEndPoint;
  set endpoint(value: ApiEndPoint);
  [endpointValue]: ApiEndPoint;

  /**
   * @returns The computed URI for the endpoint.
   */
  get endpointUri(): string|undefined;

  get snippetsUri(): string;

  /**
   * @returns The computed list of responses for this operation.
   */
  get responses(): ApiResponse[]|undefined;
  [responsesValue]: ApiResponse[]|undefined;

  /**
   * A property to set to override AMF's model base URI information.
   * When this property is set, the `endpointUri` property is recalculated.
   * @attribute
   */
  baseUri: string;
  [baseUriValue]: string;
  /** 
  * The id of the currently selected server to use to construct the URL.
  * If not set a first server in the API servers array is used.
  * @attribute
  */
  serverId: String;
  /** 
  * The domain id of the currently selected security to render.
  * This is only used when a multiple security schemes are applied to the operation.
  * @attribute
  */
  securityId: String;
  /** 
  * When set it opens the response section
  * @attribute
  */
  responsesOpened: boolean;
  /** 
  * When set it opens the security section
  * @attribute
  */
  securityOpened: boolean;
  /** 
  * When set it opens the code snippets section
  * @attribute
  */
  snippetsOpened: boolean;
  /** 
  * The selected status code in the responses section.
  * @attribute
  */
  selectedStatus: string;
  /** 
  * Whether the callbacks section is opened.
  * @attribute
  */
  callbacksOpened: string;
  /** 
  * When set it renders the "try it" button that dispatches the `tryit` event.
  * @attribute
  */
  tryItButton: boolean;
  /** 
  * When set it renders the view optimised for asynchronous API operation.
  * @attribute
  */
  asyncApi: boolean;
  /**
  * When set it renders code examples section is the documentation
  * @attribute
  */
  renderCodeSnippets: boolean;
  /**
  * When set it renders security documentation when applicable
  * @attribute
  */
  renderSecurity: boolean;
  /** 
  * The currently rendered request panel mime type.
  * @attribute
  */
  requestMimeType: string;

  [urlValue]: string;
  [snippetsPayloadValue]: string;
  [snippetsHeadersValue]: string;
  /**
   * The API's protocols.
   */
  get protocols(): string[]|undefined;
  [protocolsValue]: string[]|undefined;

  /**
   * The API's version.
   */
  get version(): string|undefined;
  [versionValue]: string|undefined;
  /** 
   * Optional. The parent endpoint id. When set it uses this value to query for the endpoint
   * instead of querying for a parent through the operation id.
   * Also, when `endpoint` is set and the `endpointId` match then it ignores querying for 
   * the endpoint.
   * @attribute
   */
  endpointId: string;

  constructor();
  processGraph(): Promise<void>;
  /**
   * Queries the store for the operation data.
   */
  [queryOperation](): Promise<void>;

  /**
   * Queries for the API operation's endpoint data.
   */
  [queryEndpoint](): Promise<void>;

  /**
   * Queries for the current servers value.
   */
  [queryServers](): Promise<void>;

  /**
   * Queries the API store for the API protocols list.
   */
  [queryProtocols](): Promise<void>;

  /**
   * Queries the API store for the API version value.
   */
  [queryVersion](): Promise<void>;

  /**
   * Queries for the responses data of the current operation.
   */
  [queryResponses](): Promise<void>;

  /**
   * Updates the `selectedStatus` if not selected or the current selection doesn't 
   * exists in the current list of responses.
   */
  [preselectResponse](): void;

  /**
   * Updates the `securityId` if not selected or the current selection doesn't 
   * exists in the current list of security.
   */
  [preselectSecurity](): void;

  /**
   * Computes the URL value for the current serves, selected server, and endpoint's path.
   */
  [computeUrlValue](): void;

  /**
   * Computes query parameters for the code snippets.
   */
  [computeParametersValue](): void;

  /**
   * Computes payload value for the code snippets.
   */
  [computeSnippetsPayload](): void;

  /**
   * Computes headers value for the code snippets.
   */
  [computeSnippetsHeaders](): void;

  /**
   * A handler for the status code tab selection.
   */
  [statusCodeHandler](e: Event): void;

  /**
   * A handler for the status code tab selection.
   */
  [securitySelectionHandler](e: Event): void;

  /**
   * A handler for the try it button click.
   * It dispatches the `tryit` custom event.
   */
  [tryItHandler](): void;

  /**
   * A handler for the request panel mime type change.
   */
  [requestMimeChangeHandler](e: Event): void;

  render(): TemplateResult;

  /**
   * @returns The template for the Operation title.
   */
  [titleTemplate](): TemplateResult|string;

  /**
   * @returns The template for the Operation traits.
   */
  [traitsTemplate](): TemplateResult|string;

  /**
   * @returns The template for the operation summary filed.
   */
  [summaryTemplate](): TemplateResult|string;

  /**
   * @returns {TemplateResult[]|string} The template for the Operation meta information.
   */
  [metaDataTemplate](): TemplateResult|string;

  /**
   * @returns The template for the deprecated message.
   */
  [deprecatedTemplate](): TemplateResult|string;

  /**
   * @returns The template for the operation's URL.
   */
  [urlTemplate](): TemplateResult|string;

  /**
   * @returns The template for the operation's request documentation element.
   */
  [requestTemplate](): TemplateResult|string;

  [callbacksTemplate](): TemplateResult|string;

  /**
   * @returns The template for the operation's request documentation element.
   */
  [callbackTemplate](callback: ApiCallback): TemplateResult|string;

  [responseTemplate](): TemplateResult|string;
  /**
   * @param responses The responses to render.
   * @returns The template for the responses selector.
   */
  [responseTabsTemplate](responses: ApiResponse[]): TemplateResult|string;

  /**
   * @param responses The responses to render.
   * @returns The template for the currently selected response.
   */
  [responseContentTemplate](responses: ApiResponse[]): TemplateResult|string;

  /**
   * @returns The template for the security list section.
   */
  [securitySectionTemplate](): TemplateResult|string;
  [securityTemplate](security: ApiSecurityRequirement): TemplateResult|string;
  [securitySelectorTemplate](): TemplateResult|string;
  [securityTabTemplate](security: ApiSecurityRequirement): TemplateResult|string;
  /**
   * @returns The template for the "try it" button.
   */
  [tryItTemplate](): TemplateResult|string;
  /**
   * @returns The template for the code snippets.
   */
  [snippetsTemplate](): TemplateResult|string;
}
