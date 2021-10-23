import { AmfHelperMixin } from "./AmfHelperMixin.js";
import {
  AnyShape, ApiKeySettings, ArrayNode, ArrayShape, Callback, CreativeWork, DataArrangeShape,
  DataNode, DocumentSourceMaps, DomainElement, EndPoint, Example, FileShape, HttpSettings,
  IriTemplateMapping, NodeShape, OAuth1Settings, OAuth2Flow, OAuth2Settings, ObjectNode,
  OpenIdConnectSettings, Operation, Parameter, ParametrizedSecurityScheme, Payload,
  PropertyShape, RecursiveShape, Request, Response, ScalarNode, ScalarShape, SchemaShape,
  Scope, SecurityRequirement, SecurityScheme, Server, Settings, Shape, SynthesizedField,
  Tag, TemplatedLink, TupleShape, UnionShape, Api, WebApi, AsyncApi, Organization, License,
  ParametrizedDeclaration, ParametrizedTrait, ParametrizedResourceType, VariableValue, AbstractDeclaration,
} from "./amf";
import {
  ApiAnyShape, ApiArrayNode, ApiArrayShape, ApiCallback, ApiCustomDomainProperty, ApiDataArrangeShape,
  ApiDataNode, ApiDataNodeUnion, ApiDocumentation, ApiDocumentSourceMaps, ApiEndPoint, ApiExample,
  ApiFileShape, ApiIriTemplateMapping, ApiNodeShape, ApiObjectNode, ApiOperation, ApiParameter,
  ApiParametrizedSecurityScheme, ApiPayload, ApiPropertyShape, ApiRecursiveShape, ApiRequest, ApiResponse,
  ApiScalarNode, ApiScalarShape, ApiSchemaShape, ApiSecurityApiKeySettings, ApiSecurityHttpSettings,
  ApiSecurityOAuth1Settings, ApiSecurityOAuth2Flow, ApiSecurityOAuth2Settings,
  ApiSecurityOpenIdConnectSettings, ApiSecurityRequirement, ApiSecurityScheme, ApiSecurityScope,
  ApiSecuritySettings, ApiSecuritySettingsUnion, ApiServer, ApiShape, ApiShapeUnion, ApiSynthesizedField,
  ApiTag, ApiTupleShape, ApiUnionShape, ApiXMLSerializer, ApiOrganization, ApiSummary, ApiBase,
  ApiWeb, ApiAsync, ApiLicense, ApiParametrizedDeclaration, ApiParametrizedTrait, ApiParametrizedResourceType,
  ApiVariableValue, ApiAbstractDeclaration, ShapeProcessingOptions,
} from "./api";
import {
  ApiEndPointWithOperationsListItem,
  ApiOperationListItem,
  ApiSecuritySchemeListItem,
} from '../types'

/**
 * A class that takes AMF's ld+json model and outputs JavaScript interface of it.
 */
export declare class AmfSerializer extends AmfHelperMixin(Object) {
  /**
   * @param graph Optional AMF generated graph model.
   */
  constructor(graph?: DomainElement);
  /**
   * @param types THe list of graph object types. When not defined it returns an empty array.
   * @returns The expanded types.
   */
  readTypes(types: string[]): string[];
  /**
   * @param object The API to serialize.
   * @returns API summary, without complex objects.
   */
  apiSummary(object: Api, context?: Record<string, string>): ApiSummary;
  api(object: Api, context?: Record<string, string>): ApiBase;
  webApi(object: WebApi, context?: Record<string, string>): ApiWeb;
  asyncApi(object: AsyncApi, context?: Record<string, string>): ApiAsync;
  provider(object: Organization, context?: Record<string, string>): ApiOrganization;
  license(object: License, context?: Record<string, string>): ApiLicense;

  /**
   * @param object The AMF Server to serialize.
   * @returns Serialized Server
   */
  server(object: Server, context?: Record<string, string>): ApiServer;

  /**
   * @param object The Parameter to serialize.
   * @returns Serialized Parameter
   */
  parameter(object: Parameter, context?: Record<string, string>): ApiParameter;
  unknownShape(object: Shape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiShapeUnion;
  isLink(object: DomainElement, context?: Record<string, string>): boolean;
  shape(object: Shape, context?: Record<string, string>): ApiShape;
  anyShape(object: AnyShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiAnyShape;
  /**
   * Filters examples that should be rendered for a payload identified by `trackedId`.
   * 
   * This function is copied from old `api-example-generator/ExampleGenerator`.
   */
  filterTrackedExamples(examples: Example[], trackedId: string, context?: Record<string, string>): Example[];
  /**
   * Kind of the opposite of the `filterTrackedExamples`. It gathers examples that only have been 
   * defined for the parent Shape (ed in the type declaration). It filters out all examples
   * defined in a payload.
   */
  filterNonTrackedExamples(examples: Example[], context?: Record<string, string>): Example[];
  scalarShape(object: ScalarShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiScalarShape;
  /**
   * @param object The NodeShape to serialize
   */
  nodeShape(object: NodeShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiNodeShape;
  propertyShape(object: PropertyShape, context?: Record<string, string>): ApiPropertyShape;
  unionShape(object: UnionShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiUnionShape;
  fileShape(object: FileShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiFileShape;
  schemaShape(object: SchemaShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiSchemaShape;
  recursiveShape(object: RecursiveShape, context?: Record<string, string>): ApiRecursiveShape;
  dataArrangeShape(object: DataArrangeShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiDataArrangeShape;
  arrayShape(object: ArrayShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiArrayShape;
  tupleShape(object: TupleShape, options?: ShapeProcessingOptions, context?: Record<string, string>): ApiTupleShape;
  /**
   * @param object The CreativeWork to serialize.
   * @returns Serialized CreativeWork
   */
  documentation(object: CreativeWork, context?: Record<string, string>): ApiDocumentation;
  /**
   * @param object The Example to serialize.
   * @returns Serialized Example
   */
  example(object: Example, context?: Record<string, string>): ApiExample;
  xmlSerializer(object: XMLSerializer, context?: Record<string, string>): ApiXMLSerializer;
  unknownDataNode(object: DataNode, context?: Record<string, string>): ApiDataNodeUnion;
  dataNode(object: DataNode, context?: Record<string, string>): ApiDataNode;
  scalarNode(object: ScalarNode, context?: Record<string, string>): ApiScalarNode;
  objectNode(object: ObjectNode, context?: Record<string, string>): ApiObjectNode;
  arrayNode(object: ArrayNode, context?: Record<string, string>): ApiArrayNode;

  /**
   * Adds the custom domain properties to the currently processed property, a.k.a annotations.
   * @param object 
   * @returns The list of custom domain properties.
   */
  customDomainProperties(object: DomainElement, context?: Record<string, string>): ApiCustomDomainProperty[];

  /**
   * @param object The EndPoint to serialize.
   * @returns Serialized EndPoint
   */
  endPoint(object: EndPoint, context?: Record<string, string>): ApiEndPoint;

  /**
   * @param object The Operation to serialize.
   * @returns Serialized Operation
   */
  operation(object: Operation, context?: Record<string, string>): ApiOperation;
  tag(object: Tag, context?: Record<string, string>): ApiTag;
  callback(object: Callback, context?: Record<string, string>): ApiCallback;

  /**
   * @param object The API request to serialize.
   * @returns Serialized API request
   */
  request(object: Request, context?: Record<string, string>): ApiRequest;

  /**
   * @param object The Response to serialize.
   * @returns Serialized Response
   */
  response(object: Response, context?: Record<string, string>): ApiResponse;

  /**
   * @param object The Payload to serialize.
   * @returns Serialized Payload
   */
  payload(object: Payload, context?: Record<string, string>): ApiPayload;

  /**
   * @param object The TemplatedLink to serialize.
   * @returns Serialized TemplatedLink
   */
  templatedLink(object: TemplatedLink, context?: Record<string, string>): TemplatedLink;
  iriTemplateMapping(object: IriTemplateMapping, context?: Record<string, string>): ApiIriTemplateMapping;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  parametrizedSecurityScheme(object: ParametrizedSecurityScheme, context?: Record<string, string>): ApiParametrizedSecurityScheme;
  /**
   * @param object The SecurityScheme to serialize as a list item.
   * @returns Serialized SecurityScheme
   */
  securitySchemeListItem(object: SecurityScheme, context?: Record<string, string>): ApiSecuritySchemeListItem;
  /**
   * @param object The SecurityScheme to serialize.
   * @returns Serialized SecurityScheme
   */
  securityScheme(object: SecurityScheme, context?: Record<string, string>): ApiSecurityScheme;

  /**
   * @param object The SecurityRequirement to serialize.
   * @returns Serialized SecurityRequirement
   */
  securityRequirement(object: SecurityRequirement, context?: Record<string, string>): ApiSecurityRequirement;
  securitySettings(object: Settings, context?: Record<string, string>): ApiSecuritySettingsUnion;
  settings(object: Settings, context?: Record<string, string>): ApiSecuritySettings;
  oAuth1Settings(object: OAuth1Settings, context?: Record<string, string>): ApiSecurityOAuth1Settings;
  oAuth2Settings(object: OAuth2Settings, context?: Record<string, string>): ApiSecurityOAuth2Settings;
  oAuth2Flow(object: OAuth2Flow, context?: Record<string, string>): ApiSecurityOAuth2Flow;
  scope(object: Scope, context?: Record<string, string>): ApiSecurityScope;
  apiKeySettings(object: ApiKeySettings, context?: Record<string, string>): ApiSecurityApiKeySettings;
  httpSettings(object: HttpSettings, context?: Record<string, string>): ApiSecurityHttpSettings;
  openIdConnectSettings(object: OpenIdConnectSettings, context?: Record<string, string>): ApiSecurityOpenIdConnectSettings;
  /**
   * Serializes source maps, when available.
   */
  sourceMap(object: DocumentSourceMaps, context?: Record<string, string>): ApiDocumentSourceMaps | undefined;
  synthesizedField(object: SynthesizedField, context?: Record<string, string>): ApiSynthesizedField;
  parametrizedDeclaration(object: ParametrizedDeclaration, context?: Record<string, string>): ApiParametrizedDeclaration;
  parametrizedTrait(object: ParametrizedTrait, context?: Record<string, string>): ApiParametrizedTrait;
  parametrizedResourceType(object: ParametrizedResourceType, context?: Record<string, string>): ApiParametrizedResourceType;
  variableValue(object: VariableValue, context?: Record<string, string>): ApiVariableValue;
  abstractDeclaration(object: AbstractDeclaration, context?: Record<string, string>): ApiAbstractDeclaration;

  /**
   * @param object The EndPoint to serialize as a list item.
   * @returns Serialized EndPoint as a list item.
   */
  endPointWithOperationsListItem(object: EndPoint, context?: Record<string, string>): ApiEndPointWithOperationsListItem;

  /**
   * @param object The Operation to serialize as a list item.
   * @returns Serialized Operation as a list item.
   */
  operationListItem(object: Operation, context?: Record<string, string>): ApiOperationListItem;
}
