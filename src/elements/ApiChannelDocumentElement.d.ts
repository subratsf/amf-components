import { TemplateResult } from 'lit-element';
import ApiResourceDocumentElement, { urlTemplate, titleTemplate, computeUrlValue, operationTemplate, } from './ApiResourceDocumentElement.js';
import { ApiOperation } from '../helpers/api';

/**
 * A web component that renders the async API Channel documentation page
 */
export default class ApiChannelDocumentElement extends ApiResourceDocumentElement {
  /**
   * Computes the URL value for the current serves, selected server, and endpoint's path.
   */
  [computeUrlValue](): void;

  /**
   * @returns The template for the Operation title.
   */
  [titleTemplate](): TemplateResult|string;

  /**
   * @returns The template for the operation's URL.
   */
  [urlTemplate](): TemplateResult|string;

  /**
   * @param operation The graph id of the operation.
   * @returns The template for the API operation.
   */
  [operationTemplate](operation: ApiOperation): TemplateResult|string;
}
