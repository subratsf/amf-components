import { TemplateResult } from 'lit-element';
import { ApiSummary, ApiServer } from '../helpers/api';
import { AsyncApi, WebApi } from '../helpers/amf';
import { ApiDocumentationBase } from './ApiDocumentationBase';
import { ApiEndPointWithOperationsListItem, ApiOperationListItem } from '../types';

export const summaryValue: unique symbol;
export const serversValue: unique symbol;
export const endpointsValue: unique symbol;
export const querySummary: unique symbol;
export const processSummary: unique symbol;
export const queryServers: unique symbol;
export const queryEndpoints: unique symbol;
export const isAsyncValue: unique symbol;
export const baseUriValue: unique symbol;
export const navigateHandler: unique symbol;
export const titleTemplate: unique symbol;
export const versionTemplate: unique symbol;
export const serversTemplate: unique symbol;
export const baseUriTemplate: unique symbol;
export const serverTemplate: unique symbol;
export const protocolsTemplate: unique symbol;
export const contactInfoTemplate: unique symbol;
export const licenseTemplate: unique symbol;
export const termsOfServiceTemplate: unique symbol;
export const endpointsTemplate: unique symbol;
export const endpointTemplate: unique symbol;
export const endpointPathTemplate: unique symbol;
export const endpointNameTemplate: unique symbol;
export const methodTemplate: unique symbol;

/**
 * A web component that renders the documentation page for an API documentation (like in RAML documentations) built from 
 * the AMF graph model.
 * 
 * @fires apinavigate
 */
export default class ApiSummaryElement extends ApiDocumentationBase {
  get summary(): ApiSummary;
  get servers(): ApiServer[];

  /**
   * A property to set to override AMF's model base URI information.
   * When this property is set, the `endpointUri` property is recalculated.
   * @attribute
   */
  baseUri: string;
  /**
  * API title header level in value range from 1 to 6.
  * This is made for accessibility. It the component is used in a context
  * where headers order matters then this property is to be set to
  * arrange headers in the right order.
  *
  * @default 2
  * @attribute
  */
  titleLevel: number;
  /**
  * A property to hide the table of contents list of endpoints.
  * @attribute
  */
  hideToc: boolean;
  protocols: string[];
  [summaryValue]: ApiSummary;
  [serversValue]: ApiServer[];
  [endpointsValue]: ApiEndPointWithOperationsListItem[];
  [isAsyncValue]: boolean;
  constructor();
  /**
   * Queries the graph store for the API data.
   */
  processGraph(): Promise<void>;
  /**
   * Queries the API store for the API summary object.
   */
  [querySummary](): Promise<void>;

  /**
   * Queries the API store for the API summary object.
   */
  [queryServers](): Promise<void>;

  /**
   * Logic executed after the summary is requested from the store.
   */
  [processSummary](): Promise<void>;

  /**
   * Queries the API endpoints and methods.
   */
  [queryEndpoints](): Promise<void>;
  [navigateHandler](e: Event): void;
  render(): TemplateResult;
  [titleTemplate](): TemplateResult|string;
  [versionTemplate](): TemplateResult|string;

  /**
   * @return A template for a server, servers, or no servers
   * whether it's defined in the main API definition or not.
   */
  [serversTemplate](): TemplateResult|string;

  /**
   * @param server Server definition
   * @return A template for a single server in the main API definition
   */
  [baseUriTemplate](server: ApiServer): TemplateResult;

  /**
   * @param server Server definition
   * @return Template for a server list items when there is more than one server.
   */
  [serverTemplate](server: ApiServer): TemplateResult;

  [protocolsTemplate](): TemplateResult|string;
  [contactInfoTemplate](): TemplateResult|string;
  [licenseTemplate](): TemplateResult|string;
  [termsOfServiceTemplate](): TemplateResult|string;
  [endpointsTemplate](): TemplateResult|string;
  [endpointTemplate](item: ApiEndPointWithOperationsListItem): TemplateResult;
  [endpointPathTemplate](item: ApiEndPointWithOperationsListItem): TemplateResult;
  [endpointNameTemplate](item: ApiEndPointWithOperationsListItem): TemplateResult|string;
  [methodTemplate](item: ApiOperationListItem, endpoint: ApiEndPointWithOperationsListItem): TemplateResult;
}
