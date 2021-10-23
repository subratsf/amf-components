import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { ApiRequest, ApiPayload, ApiServer, ApiEndPoint, ApiParameter } from '../helpers/api';
import { OperationParameter } from '../types';

export const queryRequest: unique symbol;
export const requestValue: unique symbol;
export const queryPayloads: unique symbol;
export const payloadsValue: unique symbol;
export const payloadValue: unique symbol;
export const notifyMime: unique symbol;
export const preselectMime: unique symbol;
export const queryParamsTemplate: unique symbol;
export const headersTemplate: unique symbol;
export const cookiesTemplate: unique symbol;
export const payloadTemplate: unique symbol;
export const payloadSelectorTemplate: unique symbol;
export const mediaTypeSelectHandler: unique symbol;
export const processQueryParameters: unique symbol;
export const queryParametersValue: unique symbol;

/**
 * A web component that renders the documentation page for an API request object.
 * 
 * @fires mimechange
 */
export default class ApiRequestDocumentElement extends ApiDocumentationBase {
  /**
   * @returns {boolean} true when has cookie parameters definition
   */
  get hasCookieParameters(): boolean;

  /**
   * @returns {boolean} true when has headers parameters definition
   */
  get hasHeaders(): boolean;

  /**
   * @returns {boolean} true when has query parameters definition
   */
  get hasQueryParameters(): boolean;

  /**
   * @returns The combined list of path parameters in the server, endpoint, and the request.
   */
  get uriParameters(): ApiParameter[];

  /**
   * @returns {boolean} true when has query string definition
   */
  get hasQueryString(): boolean;
  get [payloadValue](): ApiPayload|undefined;
  [payloadsValue]: ApiPayload|undefined;
  get request(): ApiRequest;
  set request(value: ApiRequest);
  [requestValue]: ApiRequest;

  /** 
   * When set it opens the parameters section
   * @attribute
   */
  parametersOpened: boolean;
  /** 
  * When set it opens the headers section
  * @attribute
  */
  headersOpened: boolean;
  /** 
  * When set it opens the cookies section
  * @attribute
  */
  cookiesOpened: boolean;
  /** 
  * When set it opens the payload section
  * @attribute
  */
  payloadOpened: boolean;
  /** 
  * The currently selected media type for the payloads.
  * @attribute
  */
  mimeType: string;
  /** 
  * The current server in use.
  * It adds path parameters defined for the server.
  */
  server: ApiServer;
  /** 
  * The parent endpoint of this request.
  * It adds path parameters defined for the endpoint.
  */
  endpoint: ApiEndPoint;
  [queryParametersValue]: OperationParameter[];
  constructor();
  processGraph(): Promise<void>;
  [queryPayloads](): Promise<void>;
  /**
   * Creates a parameter 
   */
  [processQueryParameters](): Promise<void>;
  /**
   * Pre-selects when needed the mime type for the current payload.
   */
  [preselectMime](): void;
  [mediaTypeSelectHandler](e: Event): void;

  /**
   * Dispatches the `mimechange` event.
   */
  [notifyMime](): void;

  render(): TemplateResult;

  /**
   * @return The template for the query parameters
   */
  [queryParamsTemplate](): TemplateResult|string;

  /**
   * @return The template for the headers
   */
  [headersTemplate](): TemplateResult|string;

  /**
   * @return The template for the cookies list section
   */
  [cookiesTemplate](): TemplateResult|string;

  /**
   * @return The template for the payload section
   */
  [payloadTemplate](): TemplateResult|string;

  /**
   * @return The template for the payload media type selector.
   */
  [payloadSelectorTemplate](): TemplateResult|string;
}
