import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { ApiSecurityRequirement } from '../helpers/api';

export const securityRequirementValue: unique symbol;

export default class ApiSecurityRequirementDocumentElement extends ApiDocumentationBase {
  [securityRequirementValue]: ApiSecurityRequirement;
  constructor();
  get securityRequirement(): ApiSecurityRequirement;
  set securityRequirement(value: ApiSecurityRequirement);
  processGraph(): Promise<void>;

  render(): TemplateResult;
}
