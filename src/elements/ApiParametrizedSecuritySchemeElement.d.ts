import { TemplateResult } from "lit-element";
import ApiSecurityDocumentElement, { settingsTemplate } from "./ApiSecurityDocumentElement.js";
import { ApiSecuritySettingsUnion } from '../helpers/api';

export const settingsIdValue: unique symbol;
export const querySettings: unique symbol;
export const settingsValue: unique symbol;
export const mergeSettings: unique symbol;

export default class ApiParametrizedSecuritySchemeElement extends ApiSecurityDocumentElement {
  get settings(): ApiSecuritySettingsUnion|undefined
  set settings(value: ApiSecuritySettingsUnion|undefined);
  [settingsValue]: ApiSecuritySettingsUnion|undefined;

  constructor();

  /**
   * @returns The template for the security settings, when required.
   */
  [settingsTemplate](): TemplateResult|string;

  /**
   * @param applied The settings applied to the current object
   * @param scheme The settings defined in the scheme
   * @returns The merged settings to render.
   */
  [mergeSettings](applied: ApiSecuritySettingsUnion, scheme: ApiSecuritySettingsUnion): ApiSecuritySettingsUnion;
}
