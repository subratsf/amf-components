import { TemplateResult } from 'lit-element';
import { ApiDocumentation } from '../helpers/api';
import { ApiDocumentationBase } from './ApiDocumentationBase';

export const documentationValue: unique symbol;
export const titleTemplate: unique symbol;
export const queryDocument: unique symbol;

/**
 * A web component that renders the documentation page for an API documentation (like in RAML documentations) built from 
 * the AMF graph model.
 */
export default class ApiDocumentationDocumentElement extends ApiDocumentationBase {
  /**
   * @returns The serialized to a JS object graph model
   */
  documentation: ApiDocumentation|undefined;

  [documentationValue]: ApiDocumentation;
  constructor();

  /**
   * Queries the graph store for the API Documentation data.
   */
  processGraph(): Promise<void>;

  /**
   * Queries for the documentation model.
   */
  [queryDocument](): Promise<void>;

  render(): TemplateResult;

  /**
   * @returns The template for the Documentation title.
   */
  [titleTemplate](): TemplateResult;
}
