import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { ApiPayload } from '../helpers/api';
import { Payload } from '../helpers/amf';

export const queryPayload: unique symbol;
export const queryExamples: unique symbol;
export const payloadValue: unique symbol;
export const processPayload: unique symbol;
export const mediaTypeTemplate: unique symbol;
export const nameTemplate: unique symbol;
export const schemaTemplate: unique symbol;

export default class ApiPayloadDocumentElement extends ApiDocumentationBase {
  get payload(): ApiPayload;
  set payload(value: ApiPayload);
  [payloadValue]: ApiPayload;
  domainModel: Payload;

  constructor();

  /**
   * Queries the graph store for the API Payload data.
   */
  processGraph(): Promise<void>;

  [processPayload](): Promise<void>;

  render(): TemplateResult;

  /**
   * @return The template for the payload mime type.
   */
  [mediaTypeTemplate](): TemplateResult|string;

  /**
   * @return The template for the payload name
   */
  [nameTemplate](): TemplateResult|string;

  /**
   * @return The template for the payload's schema
   */
  [schemaTemplate](): TemplateResult|string;
}
