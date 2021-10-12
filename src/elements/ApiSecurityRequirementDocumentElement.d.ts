import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { ApiSecurityRequirement } from '../helpers/api';
import { SecurityRequirement } from '../helpers/amf';

export const securityRequirementValue: unique symbol;
export const findOperationSecurity: unique symbol;

export default class ApiSecurityRequirementDocumentElement extends ApiDocumentationBase {
  domainModel: SecurityRequirement;
  [securityRequirementValue]: ApiSecurityRequirement;
  constructor();
  get securityRequirement(): ApiSecurityRequirement;
  set securityRequirement(value: ApiSecurityRequirement);
  processGraph(): Promise<void>;
  [findOperationSecurity](id: string): SecurityRequirement|undefined;

  render(): TemplateResult;
}
