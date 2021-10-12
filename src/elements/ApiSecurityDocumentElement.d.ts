import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { ApiSecurityScope, ApiSecurityOAuth2Flow, ApiSecurityOAuth1Settings, ApiSecurityOAuth2Settings, ApiSecurityScheme, ApiSecurityRequirement, ApiSecurityApiKeySettings, ApiSecurityOpenIdConnectSettings, ApiResponse } from '../helpers/api';
import { DomainElement, SecurityScheme, SecurityRequirement } from '../helpers/amf';

export const querySecurity: unique symbol;
export const processSecurity: unique symbol;
export const securityValue: unique symbol;
export const titleTemplate: unique symbol;
export const queryParamsTemplate: unique symbol;
export const headersTemplate: unique symbol;
export const responsesValue: unique symbol;
export const preselectResponse: unique symbol;
export const responseContentTemplate: unique symbol;
export const responseTabsTemplate: unique symbol;
export const responseTemplate: unique symbol;
export const statusCodeHandler: unique symbol;
export const settingsTemplate: unique symbol;
export const apiKeySettingsTemplate: unique symbol;
export const openIdConnectSettingsTemplate: unique symbol;
export const oAuth2SettingsTemplate: unique symbol;
export const apiKeyHeaderExample: unique symbol;
export const apiKeyCookieExample: unique symbol;
export const apiKeyQueryExample: unique symbol;
export const exampleTemplate: unique symbol;
export const oAuth2FlowsTemplate: unique symbol;
export const oAuth2GrantsTemplate: unique symbol;
export const oAuth2FlowTemplate: unique symbol;
export const getLabelForGrant: unique symbol;
export const accessTokenUriTemplate: unique symbol;
export const authorizationUriTemplate: unique symbol;
export const refreshUriTemplate: unique symbol;
export const scopesTemplate: unique symbol;
export const scopeTemplate: unique symbol;
export const grantTitleTemplate: unique symbol;
export const setModel: unique symbol;
export const computeReferenceSecurity: unique symbol;
export const oAuth1SettingsTemplate: unique symbol;
export const tokenCredentialsUriTemplate: unique symbol;
export const signaturesTemplate: unique symbol;

/**
 * A web component that renders the documentation page for an API response object.
 */
export default class ApiSecurityDocumentElement extends ApiDocumentationBase {
  
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
   * When set it opens the response section
   * @attribute
   */
  responsesOpened: boolean;
  /** 
   * When set it opens the settings section
   * @attribute
   */
  settingsOpened: boolean;
  /** 
   * The selected status code in the responses section.
   * @attribute
   */
  selectedStatus: string;
  get securityScheme(): ApiSecurityScheme|undefined;
  set securityScheme(value: ApiSecurityScheme);
  [securityValue]: ApiSecurityScheme;
  [responsesValue]: ApiResponse[];
  domainModel: SecurityScheme;
  constructor();
  processGraph(): Promise<void>;

  /**
   * Computes a security model from a reference (library for example).
   * @param reference AMF model for a reference to extract the data from
   * @param selected Node ID to look for
   * @returns Type definition or undefined if not found.
   */
  [computeReferenceSecurity](reference: DomainElement, selected: string): SecurityRequirement;

  [setModel](model: SecurityScheme): void;

  [processSecurity](): Promise<void>;
  /**
   * Updates the `selectedStatus` if not selected or the current selection doesn't 
   * exists in the current list of responses.
   */
  [preselectResponse](): void;

  /**
   * A handler for the status code tab selection.
   */
  [statusCodeHandler](e: Event): void;

  /**
   * @param grant The oauth2 grant (flow) name
   * @returns Friendly name for the grant.
   */
  [getLabelForGrant](grant: string): string;

  render(): TemplateResult;

  [titleTemplate](): TemplateResult|string;

  /**
   * @return The template for the query parameters
   */
  [queryParamsTemplate](): TemplateResult|string;

  /**
   * @return The template for the headers
   */
  [headersTemplate](): TemplateResult|string;

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
   * @returns The template for the security settings, when required.
   */
  [settingsTemplate](): TemplateResult|string;

  /**
   * @returns The template for API Key security definition.
   */
  [apiKeySettingsTemplate](settings: ApiSecurityApiKeySettings): TemplateResult|string;

  /**
   * @param name The name of the API Key parameter
   * @returns The template for API Key header example
   */
  [apiKeyHeaderExample](name: string): TemplateResult|string;

  /**
   * @param name The name of the API Key parameter
   * @returns The template for API Key cookie example
   */
  [apiKeyCookieExample](name: string): TemplateResult|string;

  /**
   * @param name The name of the API Key parameter
   * @returns The template for API Key query parameter example
   */
  [apiKeyQueryExample](name: string): TemplateResult|string;

  /**
   * @returns The template for a single example
   */
  [exampleTemplate](value: string): TemplateResult|string;

  /**
   * @returns The template for API Key security definition.
   */
  [openIdConnectSettingsTemplate](settings: ApiSecurityOpenIdConnectSettings): TemplateResult|string;

  /**
   * @param {ApiSecurityOAuth2Settings} settings
   * @returns The template for OAuth 2 security definition.
   */
  [oAuth2SettingsTemplate](settings: ApiSecurityOAuth2Settings): TemplateResult|string;

  /**
   * @returns The template for OAuth 2 flows list.
   */
  [oAuth2GrantsTemplate](grants: string[]): TemplateResult|string;

  /**
   * @returns The template for OAuth 2 flows list.
   */
  [oAuth2FlowsTemplate](flows: ApiSecurityOAuth2Flow[]): TemplateResult|string;

  /**
   * @returns The template for an OAuth 2 flow.
   */
  [oAuth2FlowTemplate](flow: ApiSecurityOAuth2Flow): TemplateResult|string;

  /**
   * @param grant The grant name
   * @returns The template for OAuth 2 grant title.
   */
  [grantTitleTemplate](grant: string): TemplateResult|string;

  /**
   * @param uri The access token URI
   * @returns The template for the access token URI
   */
  [accessTokenUriTemplate](uri: string): TemplateResult|string;

  /**
   * @param uri The access token URI
   * @returns The template for the authorization endpoint URI
   */
  [authorizationUriTemplate](uri: string): TemplateResult|string;

  /**
   * @param uri The access token URI
   * @returns The template for the refresh token endpoint URI
   */
  [refreshUriTemplate](uri: string): TemplateResult|string;

  /**
   * @param scopes The oauth scopes
   * @returns The template for the scopes list
   */
  [scopesTemplate](scopes: ApiSecurityScope[]): TemplateResult|string;

  /**
   * @param scope The scope definition.
   * @returns The template for an oauth scope
   */
  [scopeTemplate](scope: ApiSecurityScope): TemplateResult|string;

  /**
   * @returns The template for OAuth 1 security definition.
   */
  [oAuth1SettingsTemplate](settings: ApiSecurityOAuth1Settings): TemplateResult|string;

  /**
   * @param uri The token credentials URI
   * @returns The template for the token credentials URI
   */
  [tokenCredentialsUriTemplate](uri: string): TemplateResult|string;

  /**
   * @param signatures The OAuth1 signatures.
   * @returns The template for the OAuth1 signatures.
   */
  [signaturesTemplate](signatures: string[]): TemplateResult|string;
}
