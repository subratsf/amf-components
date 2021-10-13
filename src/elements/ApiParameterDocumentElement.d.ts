import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase, descriptionTemplate } from './ApiDocumentationBase.js';
import { ApiParameter, ApiShapeUnion } from '../helpers/api';

export const queryParameter: unique symbol;
export const querySchema: unique symbol;
export const parameterValue: unique symbol;
export const schemaValue: unique symbol;
export const computeParamType: unique symbol;
export const typeLabelValue: unique symbol;

/**
 * A web component that renders the documentation for a single request / response parameter.
 */
export default class ApiParameterDocumentElement extends ApiDocumentationBase {
  get parameter(): ApiParameter
  set parameter(value: ApiParameter);
  [parameterValue]: ApiParameter
  [schemaValue]: ApiShapeUnion;
  [typeLabelValue]: string;

  constructor();

  /**
   * Prepares the values to be rendered.
   */
  processGraph(): Promise<void>;

  /**
   * Reads the schema from the parameter.
   */
  [querySchema](): Promise<void>;

  /**
   * Computes the schema type label value to render in the type view.
   */
  [computeParamType](): void;

  render(): TemplateResult;
  /**
   * @return The template for the parameter description. 
   */
  [descriptionTemplate](): TemplateResult|string;
}
