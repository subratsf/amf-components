import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { Response } from '../helpers/amf';
import { ApiResponse, ApiPayload, ApiTemplatedLink, ApiIriTemplateMapping } from '../helpers/api';

export const queryResponse: unique symbol;
export const responseValue: unique symbol;
export const queryPayloads: unique symbol;
export const payloadsValue: unique symbol;
export const payloadValue: unique symbol;
export const headersTemplate: unique symbol;
export const payloadTemplate: unique symbol;
export const payloadSelectorTemplate: unique symbol;
export const linksTemplate: unique symbol;
export const linkTemplate: unique symbol;
export const linkOperationTemplate: unique symbol;
export const linkMappingsTemplate: unique symbol;
export const linkMappingTemplate: unique symbol;
export const mediaTypeSelectHandler: unique symbol;

/**
 * A web component that renders the documentation page for an API response object.
 */
export default class ApiResponseDocumentElement extends ApiDocumentationBase {
  /**
   * @returns true when has headers parameters definition
   */
  get hasHeaders(): boolean;
  get [payloadValue](): ApiPayload|undefined;

  [responseValue]: ApiResponse;
  get response(): ApiResponse;
  set response(value: ApiResponse);
  /** 
   * When set it opens the headers section
   * @attribute
   */
  headersOpened: boolean;
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
  [payloadsValue]: ApiPayload[];
  constructor();

  /**
   * Queries the graph store for the API Response data.
   */
  processGraph(): Promise<void>;
  [queryPayloads](): Promise<void>;
  [mediaTypeSelectHandler](e: Event): void;

  render(): TemplateResult;

  /**
   * @returns The template for the headers
   */
  [headersTemplate](): TemplateResult|string;

  /**
   * @returns The template for the payload section
   */
  [payloadTemplate](): TemplateResult|string;

  /**
   * @returns The template for the payload media type selector.
   */
  [payloadSelectorTemplate](): TemplateResult|string;

  /**
   * @returns The template for the response links
   */
  [linksTemplate](): TemplateResult|string;
  /**
   * @returns {TemplateResult} A template for the link
   */
  [linkTemplate](link: ApiTemplatedLink): TemplateResult|string;

  /**
   * @returns The template for the link's operation
   */
  [linkOperationTemplate](operationId: string): TemplateResult|string;
  /**
   * @returns The template for the link's operation
   */
  [linkMappingsTemplate](mappings: ApiIriTemplateMapping[]): TemplateResult|string;

  /**
   * @returns {TemplateResult} The template for the link's operation
   */
  [linkMappingTemplate](mapping: ApiIriTemplateMapping): TemplateResult|string;
}
