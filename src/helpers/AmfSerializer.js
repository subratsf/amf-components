/* eslint-disable class-methods-use-this */
import { AmfHelperMixin, expandKey, findAmfType, getArrayItems } from "./AmfHelperMixin.js";

/** @typedef {import('./api').ApiParametrizedSecurityScheme} ApiParametrizedSecurityScheme */
/** @typedef {import('./api').ApiRequest} ApiRequest */
/** @typedef {import('./api').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('./api').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('./api').ApiTemplatedLink} ApiTemplatedLink */
/** @typedef {import('./api').ApiResponse} ApiResponse */
/** @typedef {import('./api').ApiPayload} ApiPayload */
/** @typedef {import('./api').ApiExample} ApiExample */
/** @typedef {import('./api').ApiParameter} ApiParameter */
/** @typedef {import('./api').ApiOperation} ApiOperation */
/** @typedef {import('./api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('./api').ApiServer} ApiServer */
/** @typedef {import('./api').ApiDocumentation} ApiDocumentation */
/** @typedef {import('./api').ApiShape} ApiShape */
/** @typedef {import('./api').ApiPropertyShape} ApiPropertyShape */
/** @typedef {import('./api').ApiAnyShape} ApiAnyShape */
/** @typedef {import('./api').ApiNodeShape} ApiNodeShape */
/** @typedef {import('./api').ApiScalarShape} ApiScalarShape */
/** @typedef {import('./api').ApiUnionShape} ApiUnionShape */
/** @typedef {import('./api').ApiFileShape} ApiFileShape */
/** @typedef {import('./api').ApiDataArrangeShape} ApiDataArrangeShape */
/** @typedef {import('./api').ApiXMLSerializer} ApiXMLSerializer */
/** @typedef {import('./api').ApiDataNode} ApiDataNode */
/** @typedef {import('./api').ApiScalarNode} ApiScalarNode */
/** @typedef {import('./api').ApiObjectNode} ApiObjectNode */
/** @typedef {import('./api').ApiArrayNode} ApiArrayNode */
/** @typedef {import('./api').ApiSchemaShape} ApiSchemaShape */
/** @typedef {import('./api').ApiArrayShape} ApiArrayShape */
/** @typedef {import('./api').ApiTupleShape} ApiTupleShape */
/** @typedef {import('./api').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('./api').ApiSecuritySettings} ApiSecuritySettings */
/** @typedef {import('./api').ApiSecurityOAuth1Settings} ApiSecurityOAuth1Settings */
/** @typedef {import('./api').ApiSecurityOAuth2Settings} ApiSecurityOAuth2Settings */
/** @typedef {import('./api').ApiSecurityApiKeySettings} ApiSecurityApiKeySettings */
/** @typedef {import('./api').ApiSecurityHttpSettings} ApiSecurityHttpSettings */
/** @typedef {import('./api').ApiSecurityOpenIdConnectSettings} ApiSecurityOpenIdConnectSettings */
/** @typedef {import('./api').ApiSecurityOAuth2Flow} ApiSecurityOAuth2Flow */
/** @typedef {import('./api').ApiSecuritySettingsUnion} ApiSecuritySettingsUnion */
/** @typedef {import('./api').ApiSecurityScope} ApiSecurityScope */
/** @typedef {import('./api').ApiIriTemplateMapping} ApiIriTemplateMapping */
/** @typedef {import('./api').ApiCallback} ApiCallback */
/** @typedef {import('./api').ApiDomainProperty} ApiDomainProperty */
/** @typedef {import('./api').ApiCustomDomainProperty} ApiCustomDomainProperty */
/** @typedef {import('./api').ApiRecursiveShape} ApiRecursiveShape */
/** @typedef {import('./api').ApiTag} ApiTag */
/** @typedef {import('./api').ApiDataNodeUnion} ApiDataNodeUnion */
/** @typedef {import('./api').ApiDocumentSourceMaps} ApiDocumentSourceMaps */
/** @typedef {import('./api').ApiSynthesizedField} ApiSynthesizedField */
/** @typedef {import('./api').ApiParametrizedDeclaration} ApiParametrizedDeclaration */
/** @typedef {import('./api').ApiParametrizedTrait} ApiParametrizedTrait */
/** @typedef {import('./api').ApiParametrizedResourceType} ApiParametrizedResourceType */
/** @typedef {import('./api').ApiVariableValue} ApiVariableValue */
/** @typedef {import('./api').ApiAbstractDeclaration} ApiAbstractDeclaration */
/** @typedef {import('./api').ShapeProcessingOptions} ShapeProcessingOptions */
/** @typedef {import('./api').ApiSummary} ApiSummary */
/** @typedef {import('./api').ApiOrganization} ApiOrganization */
/** @typedef {import('./api').ApiLicense} ApiLicense */
/** @typedef {import('./api').ApiBase} ApiBase */
/** @typedef {import('./api').ApiWeb} ApiWeb */
/** @typedef {import('./api').ApiAsync} ApiAsync */
/** @typedef {import('./amf').Api} Api */
/** @typedef {import('./amf').WebApi} WebApi */
/** @typedef {import('./amf').AsyncApi} AsyncApi */
/** @typedef {import('./amf').Server} Server */
/** @typedef {import('./amf').Parameter} Parameter */
/** @typedef {import('./amf').Shape} Shape */
/** @typedef {import('./amf').ScalarShape} ScalarShape */
/** @typedef {import('./amf').NodeShape} NodeShape */
/** @typedef {import('./amf').UnionShape} UnionShape */
/** @typedef {import('./amf').FileShape} FileShape */
/** @typedef {import('./amf').SchemaShape} SchemaShape */
/** @typedef {import('./amf').ArrayShape} ArrayShape */
/** @typedef {import('./amf').TupleShape} TupleShape */
/** @typedef {import('./amf').AnyShape} AnyShape */
/** @typedef {import('./amf').DomainElement} DomainElement */
/** @typedef {import('./amf').PropertyShape} PropertyShape */
/** @typedef {import('./amf').DataArrangeShape} DataArrangeShape */
/** @typedef {import('./amf').CreativeWork} CreativeWork */
/** @typedef {import('./amf').Example} Example */
/** @typedef {import('./amf').XMLSerializer} XMLSerializer */
/** @typedef {import('./amf').DataNode} DataNode */
/** @typedef {import('./amf').ScalarNode} ScalarNode */
/** @typedef {import('./amf').ArrayNode} ArrayNode */
/** @typedef {import('./amf').ObjectNode} ObjectNode */
/** @typedef {import('./amf').RecursiveShape} RecursiveShape */
/** @typedef {import('./amf').EndPoint} EndPoint */
/** @typedef {import('./amf').Operation} Operation */
/** @typedef {import('./amf').Callback} Callback */
/** @typedef {import('./amf').Request} Request */
/** @typedef {import('./amf').Response} Response */
/** @typedef {import('./amf').Payload} Payload */
/** @typedef {import('./amf').TemplatedLink} TemplatedLink */
/** @typedef {import('./amf').IriTemplateMapping} IriTemplateMapping */
/** @typedef {import('./amf').ParametrizedSecurityScheme} ParametrizedSecurityScheme */
/** @typedef {import('./amf').SecurityScheme} SecurityScheme */
/** @typedef {import('./amf').SecurityRequirement} SecurityRequirement */
/** @typedef {import('./amf').Settings} Settings */
/** @typedef {import('./amf').OAuth1Settings} OAuth1Settings */
/** @typedef {import('./amf').OAuth2Settings} OAuth2Settings */
/** @typedef {import('./amf').OAuth2Flow} OAuth2Flow */
/** @typedef {import('./amf').Scope} Scope */
/** @typedef {import('./amf').ApiKeySettings} ApiKeySettings */
/** @typedef {import('./amf').HttpSettings} HttpSettings */
/** @typedef {import('./amf').OpenIdConnectSettings} OpenIdConnectSettings */
/** @typedef {import('./amf').Tag} Tag */
/** @typedef {import('./amf').DocumentSourceMaps} DocumentSourceMaps */
/** @typedef {import('./amf').SynthesizedField} SynthesizedField */
/** @typedef {import('./amf').ParametrizedDeclaration} ParametrizedDeclaration */
/** @typedef {import('./amf').ParametrizedTrait} ParametrizedTrait */
/** @typedef {import('./amf').ParametrizedResourceType} ParametrizedResourceType */
/** @typedef {import('./amf').VariableValue} VariableValue */
/** @typedef {import('./amf').AbstractDeclaration} AbstractDeclaration */
/** @typedef {import('./amf').Organization} Organization */
/** @typedef {import('./amf').License} License */
/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../types').ApiOperationListItem} ApiOperationListItem */
/** @typedef {import('../types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */

/**
 * A class that takes AMF's ld+json model and outputs JavaScript interface of it.
 */
export class AmfSerializer extends AmfHelperMixin(Object) {
  /**
   * @param {DomainElement=} graph Optional AMF generated graph model.
   */
  constructor(graph) {
    super();
    if (graph) {
      this.amf = graph;
    }
  }

  /**
   * @param {string[]} types The list of graph object types. When not defined it returns an empty array.
   * @param {Record<string, string>=} context
   * @returns {string[]} The expanded types.
   */
  readTypes(types, context) {
    let target = types;
    if (typeof target === 'string') {
      target = [target];
    }
    if (!Array.isArray(target)) {
      return [];
    }
    return target.map((type) => this[expandKey](type, context));
  }

  /**
   * @param {Api} object The API to serialize.
   * @returns {ApiSummary} API summary, without complex objects.
   */
  apiSummary(object) {
    const context = object['@context'];
    const result = /** @type ApiSummary */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], context),
      customDomainProperties: this.customDomainProperties(object, context),
      sourceMaps: this.sourceMap(object),
      schemes: [],
      accepts: [],
      contentType: [],
      documentations: [],
      tags: [],
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, context);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, context);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const version = this._getValue(object, ns.aml.vocabularies.core.version, context);
    if (version && typeof version === 'string') {
      result.version = version;
    }
    const termsOfService = this._getValue(object, ns.aml.vocabularies.core.termsOfService, context);
    if (termsOfService && typeof termsOfService === 'string') {
      result.termsOfService = termsOfService;
    }
    const accepts = object[this._getAmfKey(ns.aml.vocabularies.apiContract.accepts, context)];
    if (Array.isArray(accepts) && accepts.length) {
      result.accepts = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.apiContract.accepts, context));
    }
    const contentType = object[this._getAmfKey(ns.aml.vocabularies.apiContract.contentType, context)];
    if (Array.isArray(contentType) && contentType.length) {
      result.contentType = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.apiContract.contentType, context));
    }
    const schemes = object[this._getAmfKey(ns.aml.vocabularies.apiContract.scheme, context)];
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.apiContract.scheme, context));
    }
    let provider = object[this._getAmfKey(ns.aml.vocabularies.core.provider, context)];
    if (Array.isArray(provider)) {
      [provider] = provider;
    }
    if (provider) {
      result.provider = this.provider(provider);
    }
    let license = object[this._getAmfKey(ns.aml.vocabularies.core.license, context)];
    if (Array.isArray(license)) {
      [license] = license;
    }
    if (license) {
      result.license = this.license(license);
    }
    const tags = object[this._getAmfKey(ns.aml.vocabularies.apiContract.tag, context)];
    if (Array.isArray(tags) && tags.length) {
      result.tags = tags.map(t => this.tag(t));
    }
    const docs = object[this._getAmfKey(ns.aml.vocabularies.core.documentation, context)];
    if (Array.isArray(docs) && docs.length) {
      result.documentations = docs.map(d => this.documentation(d));
    }
    return result;
  }

  /**
   * @param {Api} object 
   * @param {Record<string, string>=} context
   * @returns {ApiBase}
   */
  api(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiBase */ (this.apiSummary(object));
    result.endPoints = [];
    result.servers = [];
    result.security = [];
    const { ns } = this;
    const endPoints = object[this._getAmfKey(ns.aml.vocabularies.apiContract.endpoint, objectContext)];
    if (Array.isArray(endPoints) && endPoints.length) {
      result.endPoints = endPoints.map(e => this.endPoint(e, objectContext));
    }
    const servers = object[this._getAmfKey(ns.aml.vocabularies.apiContract.server, objectContext)];
    if (Array.isArray(servers) && servers.length) {
      result.servers = servers.map(s => this.server(s, objectContext));
    }
    const security = object[this._getAmfKey(ns.aml.vocabularies.security.security, objectContext)];
    if (Array.isArray(security) && security.length) {
      result.security = security.map(s => this.securityRequirement(s, objectContext));
    }
    return result;
  }

  /**
   * @param {WebApi} object
   * @param {Record<string, string>=} context 
   * @returns {ApiWeb}
   */
  webApi(object, context) {
    return this.api(object, context);
  }

  /**
   * @param {AsyncApi} object 
   * @param {Record<string, string>=} context
   * @returns {ApiAsync}
   */
  asyncApi(object, context) {
    return this.api(object, context);
  }

  /**
   * @param {Organization} object
   * @param {Record<string, string>=} context
   * @returns {ApiOrganization}
   */
  provider(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiOrganization */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const url = this._getLinkValue(object, ns.aml.vocabularies.core.url, objectContext);
    if (url && typeof url === 'string') {
      result.url = url;
    }
    const email = this._getValue(object, ns.aml.vocabularies.core.email, objectContext);
    if (email && typeof email === 'string') {
      result.email = email;
    }
    return result;
  }

  /**
   * @param {License} object
   * @param {Record<string, string>=} context
   * @returns {ApiLicense}
   */
  license(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiLicense */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const url = this._getLinkValue(object, ns.aml.vocabularies.core.url, objectContext);
    if (url && typeof url === 'string') {
      result.url = url;
    }
    return result;
  }

  /**
   * @param {Server} object The AMF Server to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiServer} Serialized Server
   */
  server(object, context) {
    const objectContext = context || object['@context'];
    const { ns } = this;
    const url = this._getValue(object, ns.aml.vocabularies.core.urlTemplate, objectContext) || '';
    const result = /** @type ApiServer */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      url,
      variables: [],
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const variables = /** @type Parameter[] */ (object[this._getAmfKey(ns.aml.vocabularies.apiContract.variable, objectContext)]);
    if (Array.isArray(variables) && variables.length) {
      result.variables = variables.map((p) => this.parameter(p, objectContext));
    }
    const protocol = /** @type string */ (this._getValue(object, ns.aml.vocabularies.apiContract.protocol, objectContext));
    const protocolVersion = /** @type string */ (this._getValue(object, ns.aml.vocabularies.apiContract.protocolVersion, objectContext));
    if (protocol) {
      result.protocol = protocol;
    }
    if (protocolVersion) {
      result.protocolVersion = protocolVersion;
    }
    const security = /** @type SecurityRequirement */ (object[this._getAmfKey(ns.aml.vocabularies.security.security, objectContext)]);
    if (Array.isArray(security) && security.length) {
      result.security = security.map((p) => this.securityRequirement(p, objectContext));
    }
    return result;
  }

  /**
   * @param {Parameter} object The Parameter to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiParameter} Serialized Parameter
   */
  parameter(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiParameter */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      payloads: [],
      examples: [],
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const paramName = this._getValue(object, ns.aml.vocabularies.apiContract.paramName, objectContext);
    if (paramName && typeof paramName === 'string') {
      result.paramName = paramName;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const required = this._getValue(object, ns.aml.vocabularies.apiContract.required, objectContext);
    if (typeof required === 'boolean') {
      result.required = required;
    }
    const allowEmptyValue = this._getValue(object, ns.aml.vocabularies.apiContract.allowEmptyValue, objectContext);
    if (typeof allowEmptyValue === 'boolean') {
      result.allowEmptyValue = allowEmptyValue;
    }
    const deprecated = this._getValue(object, ns.aml.vocabularies.document.deprecated, objectContext);
    if (typeof deprecated === 'boolean') {
      result.deprecated = deprecated;
    }
    const explode = this._getValue(object, ns.aml.vocabularies.apiContract.explode, objectContext);
    if (typeof explode === 'boolean') {
      result.explode = explode;
    }
    const allowReserved = this._getValue(object, ns.aml.vocabularies.apiContract.allowReserved, objectContext);
    if (typeof allowReserved === 'boolean') {
      result.allowReserved = allowReserved;
    }
    const style = this._getValue(object, ns.aml.vocabularies.apiContract.style, objectContext);
    if (style && typeof style === 'string') {
      result.style = style;
    }
    const binding = this._getValue(object, ns.aml.vocabularies.apiContract.binding, objectContext);
    if (binding && typeof binding === 'string') {
      result.binding = binding;
    }
    const schemas = object[this._getAmfKey(ns.aml.vocabularies.shapes.schema, objectContext)];
    if (Array.isArray(schemas) && schemas.length) {
      const [schema] = schemas;
      result.schema = this.unknownShape(schema, {
        trackedId: object['@id'],
      }, objectContext);
    }
    const payloads = object[this._getAmfKey(ns.aml.vocabularies.apiContract.payload, objectContext)];
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => this.payload(p, objectContext));
    }
    const examples = object[this._getAmfKey(ns.aml.vocabularies.apiContract.examples, objectContext)];
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(e => this.example(e, objectContext));
    }
    return result;
  }

  /**
   * @param {Shape} object 
   * @param {ShapeProcessingOptions=} options 
   * @param {Record<string, string>=} context
   * @returns {ApiShapeUnion}
   */
  unknownShape(object, options, context) {
    const objectContext = context || object['@context'];
    const types = this.readTypes(object['@type'], objectContext);
    const { ns } = this;
    if (types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
      return this.scalarShape(/** @type ScalarShape */ (object), options, objectContext);
    }
    if (types.includes(ns.w3.shacl.NodeShape)) {
      return this.nodeShape(/** @type NodeShape */ (object), options, objectContext);
    }
    if (types.includes(ns.aml.vocabularies.shapes.UnionShape)) {
      return this.unionShape(/** @type UnionShape */ (object), options, objectContext);
    }
    if (types.includes(ns.aml.vocabularies.shapes.FileShape)) {
      return this.fileShape(/** @type FileShape */ (object), options, objectContext);
    }
    if (types.includes(ns.aml.vocabularies.shapes.SchemaShape)) {
      return this.schemaShape(/** @type SchemaShape */ (object), options, objectContext);
    }
    // this must be before the ArrayShape
    if (types.includes(ns.aml.vocabularies.shapes.TupleShape)) {
      return this.tupleShape(/** @type TupleShape */ (object), options, objectContext);
    }
    if (types.includes(ns.aml.vocabularies.shapes.ArrayShape) || types.includes(ns.aml.vocabularies.shapes.MatrixShape)) {
      return this.arrayShape(/** @type ArrayShape */ (object), options, objectContext);
    }
    if (types.includes(ns.aml.vocabularies.shapes.RecursiveShape)) {
      return this.recursiveShape(/** @type RecursiveShape */ (object), objectContext);
    }
    // recursiveShape
    return this.anyShape(/** @type AnyShape */ (object), options, objectContext);
  }

  /**
   * @param {DomainElement} object 
   * @param {Record<string, string>=} context
   * @returns {boolean}
   */
  isLink(object, context) {
    const objectContext = context || object['@context'];
    return !!this._getLinkValue(object, this.ns.aml.vocabularies.document.linkTarget, objectContext);
  }

  /**
   * @param {DomainElement} object 
   * @param {Record<string, string>=} context
   * @returns {DomainElement|undefined}
   */
  getLinkTarget(object, context) {
    const objectContext = context || object['@context'];
    const id = this._getLinkValue(object, this.ns.aml.vocabularies.document.linkTarget, objectContext);
    return this[findAmfType](id, objectContext);
  }

  /**
   * @param {Shape} object 
   * @param {Record<string, string>=} context
   * @returns {ApiShape}
   */
  shape(object, context) {
    const objectContext = context || object['@context'];
    this._resolve(object);
    /** @type string */
    let linkLabel;
    let target = object;
    if (this.isLink(target)) {
      linkLabel = /** @type string */ (this._getValue(target, this.ns.aml.vocabularies.document.linkLabel, objectContext));
      const id = this._getLinkValue(target, this.ns.aml.vocabularies.document.linkTarget, objectContext);
      const value = /** @type Shape */ (this[findAmfType](id, objectContext));
      if (value) {
        target = value;
      }
    }
    const result = /** @type ApiShape */ ({
      id: target['@id'],
      types: this.readTypes(object['@type'], objectContext),
      values: [],
      inherits: [],
      or: [],
      and: [],
      xone: [],
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    if (linkLabel) {
      result.linkLabel = linkLabel;
    }
    const { ns } = this;
    const name = this._getValue(target, ns.w3.shacl.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const displayName = this._getValue(target, ns.aml.vocabularies.core.displayName, objectContext);
    if (displayName && typeof displayName === 'string') {
      result.displayName = displayName;
    } else {
      const coreName = this._getValue(target, ns.aml.vocabularies.core.name, objectContext);
      if (coreName && typeof coreName === 'string') {
        result.displayName = coreName;
      }
    }
    const description = this._getValue(target, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const defaultValueStr = this._getValue(target, ns.w3.shacl.defaultValueStr, objectContext);
    if (defaultValueStr && typeof defaultValueStr === 'string') {
      result.defaultValueStr = defaultValueStr;
    }
    const deprecated = this._getValue(target, ns.aml.vocabularies.shapes.deprecated, objectContext);
    if (typeof deprecated === 'boolean') {
      result.deprecated = deprecated;
    }
    const readOnly = this._getValue(target, ns.aml.vocabularies.shapes.readOnly, objectContext);
    if (typeof readOnly === 'boolean') {
      result.readOnly = readOnly;
    }
    const writeOnly = this._getValue(target, ns.aml.vocabularies.shapes.writeOnly, objectContext);
    if (typeof writeOnly === 'boolean') {
      result.writeOnly = writeOnly;
    }
    const defValue = target[this._getAmfKey(ns.w3.shacl.defaultValue, objectContext)];
    if (Array.isArray(defValue) && defValue.length) {
      result.defaultValue = this.unknownDataNode(defValue[0], objectContext);
    }
    // @TODO:
    // if (Array.isArray(inherits) && inherits.length) {
    //   result.inherits = inherits.map((item) => this.unknownShape(item));
    // }
    const orKey = this._getAmfKey(ns.w3.shacl.or, objectContext);
    const orGroup = /** @type Shape[] */ (target[orKey]);
    if (Array.isArray(orGroup) && orGroup.length) {
      result.or = orGroup.map((item) => this.unknownShape(item, undefined, objectContext));
    }
    const andKey = this._getAmfKey(ns.w3.shacl.and, objectContext);
    const andGroup = /** @type Shape[] */ (target[andKey]);
    if (Array.isArray(andGroup) && andGroup.length) {
      result.and = andGroup.map((item) => this.unknownShape(item, undefined, objectContext));
    }
    const xoneKey = this._getAmfKey(ns.w3.shacl.xone, objectContext);
    const xone = /** @type Shape[] */ (target[xoneKey]);
    if (Array.isArray(xone) && xone.length) {
      result.xone = xone.map((item) => this.unknownShape(item, undefined, objectContext));
    }
    const valuesList = target[this._getAmfKey(ns.w3.shacl.in, objectContext)];
    if (Array.isArray(valuesList) && valuesList.length) {
      const [values] = valuesList;
      const prefix = this.ns.w3.rdfSchema.toString();
      const prefixCompact = this._getAmfKey(prefix, objectContext);
      Object.keys(values).forEach((key) => {
        if (key.startsWith(prefix) || key.startsWith(prefixCompact)) {
          let value = values[key];
          if (Array.isArray(value)) {
            [value] = value;
          }
          const processed = this.unknownDataNode(value, objectContext);
          result.values.push(processed);
        }
      });
    }
    const notKey = this._getAmfKey(ns.w3.shacl.not, objectContext);
    let not = /** @type Shape */ (target[notKey]);
    if (not) {
      if (Array.isArray(not)) {
        [not] = not;
      }
      result.not = this.unknownShape(not, undefined, objectContext);
    }
    return result;
  }

  /**
   * @param {AnyShape} object
   * @param {ShapeProcessingOptions=} options 
   * @param {Record<string, string>=} context
   * @returns {ApiAnyShape}
   */
  anyShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiAnyShape */ (this.shape(target, objectContext));
    if (this.isLink(target)) {
      const value = /** @type Shape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    result.examples = [];

    const { ns } = this;
    const examples = target[this._getAmfKey(ns.aml.vocabularies.apiContract.examples, objectContext)];
    if (Array.isArray(examples) && examples.length) {
      if (options.trackedId) {
        const filtered = this.filterTrackedExamples(examples, options.trackedId, objectContext);
        result.examples = filtered.map((item) => this.example(item, objectContext));
      } else {
        const filtered = this.filterNonTrackedExamples(examples, objectContext);
        result.examples = filtered.map((item) => this.example(item, objectContext));
      }
    }
    const docs = target[this._getAmfKey(ns.aml.vocabularies.core.documentation, objectContext)];
    if (Array.isArray(docs) && docs.length) {
      const [documentation] = docs;
      result.documentation = this.documentation(documentation, objectContext);
    }
    const xml = target[this._getAmfKey(ns.aml.vocabularies.shapes.xmlSerialization, objectContext)];
    if (Array.isArray(xml) && xml.length) {
      result.xmlSerialization = this.xmlSerializer(xml[0], objectContext);
    }
    return result;
  }

  /**
   * Filters examples that should be rendered for a payload identified by `trackedId`.
   * 
   * This function is copied from old `api-example-generator/ExampleGenerator`.
   * 
   * @param {Example[]} examples 
   * @param {string} trackedId 
   * @param {Record<string, string>=} context
   * @returns {Example[]}
   */
  filterTrackedExamples(examples, trackedId, context) {
    const { docSourceMaps } = this.ns.raml.vocabularies;
    const sourceKey = this._getAmfKey(docSourceMaps.sources, context);
    const trackedKey = this._getAmfKey(docSourceMaps.trackedElement, context);
    const longId = trackedId.indexOf('amf') === -1 ? `amf://id${trackedId}` : trackedId;
    return examples.filter((item) => {
      let example = item;
      if (Array.isArray(example)) {
        [example] = example;
      }
      let sm = example[sourceKey];
      if (!sm) {
        return true
      }
      if (Array.isArray(sm)) {
        [sm] = sm;
      }
      let tracked = sm[trackedKey];
      if (!tracked) {
        return true;
      }
      if (Array.isArray(tracked)) {
        [tracked] = tracked;
      }
      const { value } = this.synthesizedField(tracked, context);
      if (!value) {
        return true;
      }
      const ids = value.split(',');
      if (ids.indexOf(longId) !== -1 || ids.indexOf(trackedId) !== -1) {
        return true;
      }
      return false;
    });
  }

  /**
   * Kind of the opposite of the `filterTrackedExamples`. It gathers examples that only have been 
   * defined for the parent Shape (ed in the type declaration). It filters out all examples
   * defined in a payload.
   * 
   * @param {Example[]} examples 
   * @param {Record<string, string>=} context
   * @returns {Example[]}
   */
  filterNonTrackedExamples(examples, context) {
    const { docSourceMaps } = this.ns.raml.vocabularies;
    const sourceKey = this._getAmfKey(docSourceMaps.sources, context);
    const trackedKey = this._getAmfKey(docSourceMaps.trackedElement, context);
    return examples.filter((item) => {
      let example = item;
      if (Array.isArray(example)) {
        [example] = example;
      }
      let sm = example[sourceKey];
      if (!sm) {
        return true
      }
      if (Array.isArray(sm)) {
        [sm] = sm;
      }
      let tracked = sm[trackedKey];
      if (!tracked) {
        return true;
      }
      if (Array.isArray(tracked)) {
        [tracked] = tracked;
      }
      const { value } = this.synthesizedField(tracked, context);
      if (!value) {
        return true;
      }
      return false;
    });
  }

  /**
   * @param {ScalarShape} object
   * @param {ShapeProcessingOptions=} options 
   * @param {Record<string, string>=} context
   * @returns {ApiScalarShape}
   */
  scalarShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiScalarShape */ (this.anyShape(target, options, objectContext));
    if (this.isLink(target)) {
      const value = /** @type ScalarShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    const { ns } = this;
    const pattern = this._getValue(target, ns.w3.shacl.pattern, objectContext);
    if (pattern && typeof pattern === 'string') {
      result.pattern = pattern;
    }
    const dataType = this._getLinkValue(target, ns.w3.shacl.datatype, objectContext);
    if (dataType && typeof dataType === 'string') {
      result.dataType = dataType;
    }
    const format = this._getValue(target, ns.aml.vocabularies.shapes.format, objectContext);
    if (format && typeof format === 'string') {
      result.format = format;
    }
    const multipleOf = this._getValue(target, ns.aml.vocabularies.shapes.multipleOf, objectContext);
    if (typeof multipleOf === 'number') {
      result.multipleOf = multipleOf;
    }
    const minInclusive = this._getValue(target, ns.w3.shacl.minInclusive, objectContext);
    if (typeof minInclusive === 'number') {
      result.minimum = minInclusive;
      result.exclusiveMinimum = false;
    }
    const maxInclusive = this._getValue(target, ns.w3.shacl.maxInclusive, objectContext);
    if (typeof maxInclusive === 'number') {
      result.maximum = maxInclusive;
      result.exclusiveMaximum = false;
    }
    const minLength = this._getValue(target, ns.w3.shacl.minLength, objectContext);
    if (typeof minLength === 'number') {
      result.minLength = minLength;
    }
    const maxLength = this._getValue(target, ns.w3.shacl.maxLength, objectContext);
    if (typeof maxLength === 'number') {
      result.maxLength = maxLength;
    }
    return result;
  }

  /**
   * @param {NodeShape} object The NodeShape to serialize
   * @param {ShapeProcessingOptions=} options 
   * @param {Record<string, string>=} context
   * @returns {ApiNodeShape}
   */
  nodeShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiNodeShape */ (this.anyShape(target, options, objectContext));
    if (this.isLink(target)) {
      const value = /** @type NodeShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    const { ns } = this;
    const discriminator = this._getValue(target, ns.aml.vocabularies.shapes.discriminator, objectContext);
    if (discriminator && typeof discriminator === 'string') {
      result.discriminator = discriminator;
    }
    const discriminatorValue = this._getValue(target, ns.aml.vocabularies.shapes.discriminatorValue, objectContext);
    if (discriminatorValue && typeof discriminatorValue === 'string') {
      result.discriminatorValue = discriminatorValue;
    }
    const closed = this._getValue(target, ns.w3.shacl.closed, objectContext);
    if (typeof closed === 'boolean') {
      result.closed = closed;
    }

    result.customShapeProperties = [];
    result.customShapePropertyDefinitions = [];
    result.dependencies = [];
    // todo: not sure what the keys are.
    // if (!minProperties.isNull) {
    //   result.minProperties = minProperties.value();
    // }
    // if (!maxProperties.isNull) {
    //   result.maxProperties = maxProperties.value();
    // }
    // if (Array.isArray(customShapeProperties) && customShapeProperties.length) {
    //   result.customShapeProperties = customShapeProperties.map((item) => item.id);
    // } else {
    //   result.customShapeProperties = [];
    // }
    // if (Array.isArray(customShapePropertyDefinitions) && customShapePropertyDefinitions.length) {
    //   result.customShapePropertyDefinitions = customShapePropertyDefinitions.map((item) => item.id);
    // } else {
    //   result.customShapePropertyDefinitions = [];
    // }
    const properties = /** @type PropertyShape[] */ (target[this._getAmfKey(ns.w3.shacl.property, objectContext)]);
    if (Array.isArray(properties) && properties.length) {
      result.properties = properties.map((item) => this.propertyShape(item, objectContext));
    } else {
      result.properties = [];
    }
    // if (Array.isArray(dependencies) && dependencies.length) {
    //   result.dependencies = dependencies.map((item) => item.id);
    // } else {
    //   result.dependencies = [];
    // }
    return result;
  }

  /**
   * @param {PropertyShape} object 
   * @param {Record<string, string>=} context
   * @returns {ApiPropertyShape}
   */
  propertyShape(object, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiPropertyShape */ (this.shape(target, objectContext));
    if (this.isLink(target)) {
      const value = /** @type PropertyShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    const { ns } = this;
    const path = this._getLinkValue(target, ns.w3.shacl.path, objectContext);
    if (path && typeof path === 'string') {
      result.path = path;
    }
    const minCount = this._getValue(target, ns.w3.shacl.minCount, objectContext);
    if (typeof minCount === 'number') {
      result.minCount = minCount;
    }
    const maxCount = this._getValue(target, ns.w3.shacl.maxCount, objectContext);
    if (typeof maxCount === 'number') {
      result.maxCount = maxCount;
    }
    // if (!patternName.isNullOrEmpty) {
    //   result.patternName = patternName.value();
    // }
    
    const ranges = /** @type Shape[] */ (target[this._getAmfKey(ns.aml.vocabularies.shapes.range, objectContext)]);
    if (Array.isArray(ranges) && ranges.length) {
      const [range] = ranges;
      result.range = this.unknownShape(range, undefined, objectContext);
    }
    return result;
  }

  /**
   * @param {UnionShape} object
   * @param {ShapeProcessingOptions=} options 
   * @param {Record<string, string>=} context
   * @returns {ApiUnionShape}
   */
  unionShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    const anyOf = /** @type Shape[] */ (object[this._getAmfKey(this.ns.aml.vocabularies.shapes.anyOf, objectContext)]);
    const result = /** @type ApiUnionShape */ (this.anyShape(object, options, objectContext));
    if (Array.isArray(anyOf) && anyOf.length) {
      const opt = { ...options, trackedId: undefined };
      result.anyOf = anyOf.map((shape) => this.unknownShape(shape, opt, objectContext));
    } else {
      result.anyOf = [];
    }
    return result;
  }

  /**
   * @param {FileShape} object
   * @param {ShapeProcessingOptions=} options 
   * @param {Record<string, string>=} context
   * @returns {ApiFileShape}
   */
  fileShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiFileShape */ (this.anyShape(target, options, objectContext));
    if (this.isLink(target)) {
      const value = /** @type FileShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    const { ns } = this;
    const pattern = this._getValue(target, ns.w3.shacl.pattern, objectContext);
    if (pattern && typeof pattern === 'string') {
      result.pattern = pattern;
    }
    const fileTypes = /** @type string[] */ (this._getValueArray(target, ns.aml.vocabularies.shapes.fileType, objectContext));
    if (Array.isArray(fileTypes) && fileTypes.length) {
      result.fileTypes = fileTypes;
    }
    const minLength = this._getValue(target, ns.w3.shacl.minLength, objectContext);
    if (typeof minLength === 'number') {
      result.minLength = minLength;
    }
    const maxLength = this._getValue(target, ns.w3.shacl.maxLength, objectContext);
    if (typeof maxLength === 'number') {
      result.maxLength = maxLength;
    }
    const minInclusive = this._getValue(target, ns.w3.shacl.minInclusive, objectContext);
    if (typeof minInclusive === 'number') {
      result.minimum = minInclusive;
      result.exclusiveMinimum = false;
    }
    const maxInclusive = this._getValue(target, ns.w3.shacl.maxInclusive, objectContext);
    if (typeof maxInclusive === 'number') {
      result.maximum = maxInclusive;
      result.exclusiveMaximum = false;
    }
    const format = this._getValue(target, ns.aml.vocabularies.shapes.format, objectContext);
    if (format && typeof format === 'string') {
      result.format = format;
    }
    const multipleOf = this._getValue(target, ns.aml.vocabularies.shapes.multipleOf, objectContext);
    if (typeof multipleOf === 'number') {
      result.multipleOf = multipleOf;
    }
    return result;
  }

  /**
   * @param {SchemaShape} object
   * @param {ShapeProcessingOptions=} options
   * @param {Record<string, string>=} context
   * @returns {ApiSchemaShape}
   */
  schemaShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiSchemaShape */ (this.anyShape(target, options, objectContext));
    if (this.isLink(target)) {
      const value = /** @type SchemaShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    const { ns } = this;
    const mediaType = this._getValue(target, ns.aml.vocabularies.core.mediaType, objectContext);
    if (mediaType && typeof mediaType === 'string') {
      result.mediaType = mediaType;
    }
    const raw = this._getValue(target, ns.aml.vocabularies.document.raw, objectContext);
    if (raw && typeof raw === 'string') {
      result.raw = raw;
    }
    return result;
  }

  /**
   * @param {RecursiveShape} object
   * @param {Record<string, string>=} context
   * @returns {ApiRecursiveShape}
   */
  recursiveShape(object, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiRecursiveShape */ (this.shape(target, objectContext));
    if (this.isLink(target)) {
      const value = /** @type RecursiveShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    const { ns } = this;
    const fp = this._getLinkValue(object, ns.aml.vocabularies.shapes.fixPoint, objectContext);
    if (fp && typeof fp === 'string') {
      result.fixPoint = fp;
    }
    return result;
  }

  /**
   * @param {DataArrangeShape} object
   * @param {ShapeProcessingOptions=} options
   * @param {Record<string, string>=} context
   * @returns {ApiDataArrangeShape}
   */
  dataArrangeShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiDataArrangeShape */ (this.anyShape(target, options, objectContext));
    if (this.isLink(target)) {
      const value = /** @type DataArrangeShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    // const { ns } = this;
    // const { minItems, maxItems, uniqueItems } = object;
    // if (!minItems.isNull) {
    //   result.minItems = minItems.value();
    // }
    // if (!maxItems.isNull) {
    //   result.maxItems = maxItems.value();
    // }
    // if (!uniqueItems.isNull) {
    //   result.uniqueItems = uniqueItems.value();
    // }
    return result;
  }

  /**
   * @param {ArrayShape} object
   * @param {ShapeProcessingOptions=} options
   * @param {Record<string, string>=} context
   * @returns {ApiArrayShape}
   */
  arrayShape(object, options={}, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiArrayShape */ (this.dataArrangeShape(target, options, objectContext));
    if (this.isLink(target)) {
      const value = /** @type ArrayShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }

    const items = target[this._getAmfKey(this.ns.aml.vocabularies.shapes.items, objectContext)];
    if (Array.isArray(items) && items.length) {
      const [item] = items;
      result.items = this.unknownShape(item, undefined, objectContext);
    }
    return result;
  }

  /**
   * @param {TupleShape} object
   * @param {ShapeProcessingOptions=} options
   * @param {Record<string, string>=} context
   * @returns {ApiTupleShape}
   */
  tupleShape(object, options, context) {
    const objectContext = context || object['@context'];
    let target = object;
    const result = /** @type ApiTupleShape */ (this.dataArrangeShape(target, options, objectContext));
    if (this.isLink(target)) {
      const value = /** @type TupleShape */ (this.getLinkTarget(target, objectContext));
      if (value) {
        target = value;
      }
    }
    const items = target[this._getAmfKey(this.ns.aml.vocabularies.shapes.items, objectContext)];
    const prefix = this._getAmfKey(this.ns.w3.rdfSchema.key, objectContext);
    if (Array.isArray(items) && items.length) {
      result.items = [];
      items.forEach((item) => {
        if (Array.isArray(item)) {
          // eslint-disable-next-line no-param-reassign
          [item] = item;
        }
        Object.keys(item).filter(k => k.startsWith(prefix)).forEach((key) => {
          let shape = item[key];
          if (Array.isArray(shape)) {
            [shape] = shape;
          }
          const value = this.unknownShape(shape, undefined, objectContext);
          result.items.push(value);
        });
      });
    } else {
      result.items = [];
    }
    return result;
  }

  /**
   * @param {CreativeWork} object The CreativeWork to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiDocumentation} Serialized CreativeWork
   */
  documentation(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiDocumentation */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const url = this._getLinkValue(object, this.ns.aml.vocabularies.core.url, objectContext);
    if (url && typeof url === 'string') {
      result.url = url;
    }
    const description = this._getValue(object, this.ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const title = this._getValue(object, this.ns.aml.vocabularies.core.title, objectContext);
    if (title && typeof title === 'string') {
      result.title = title;
    }
    return result;
  }

  /**
   * @param {Example} object The Example to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiExample} Serialized Example
   */
  example(object, context) {
    const objectContext = context || object['@context'];
    this._resolve(object);
    const result = /** @type ApiExample */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      strict: false,
    });
    const { ns } = this;
    const strict = this._getValue(object, ns.aml.vocabularies.document.strict, objectContext);
    if (typeof strict === 'boolean') {
      result.strict = strict;
    }
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const displayName = this._getValue(object, ns.aml.vocabularies.core.displayName, objectContext);
    if (displayName && typeof displayName === 'string') {
      result.displayName = displayName;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const raw = this._getValue(object, ns.aml.vocabularies.document.raw, objectContext);
    if (raw && typeof raw === 'string') {
      result.value = raw;
    }
    const location = this._getValue(object, ns.aml.vocabularies.document.location, objectContext);
    if (location && typeof location === 'string') {
      result.location = location;
    }
    // if (!mediaType.isNullOrEmpty) {
    //   result.mediaType = mediaType.value();
    // }
    const structuredValue = object[this._getAmfKey(ns.aml.vocabularies.document.structuredValue, objectContext)];
    if (Array.isArray(structuredValue) && structuredValue.length) {
      const [value] = structuredValue;
      result.structuredValue = this.unknownDataNode(value, objectContext);
    }
    return result;
  }

  /**
   * @param {XMLSerializer} object
   * @param {Record<string, string>=} context
   * @returns {ApiXMLSerializer}
   */
  xmlSerializer(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiXMLSerializer */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const xmlAttribute = this._getValue(object, ns.aml.vocabularies.shapes.xmlAttribute, objectContext);
    if (typeof xmlAttribute === 'boolean') {
      result.attribute = xmlAttribute;
    }
    const wrapped = this._getValue(object, ns.aml.vocabularies.shapes.xmlWrapped, objectContext);
    if (typeof wrapped === 'boolean') {
      result.wrapped = wrapped;
    }
    const name = this._getValue(object, ns.aml.vocabularies.shapes.xmlName, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const xmlNs = this._getValue(object, ns.aml.vocabularies.shapes.xmlNamespace, objectContext);
    if (xmlNs && typeof xmlNs === 'string') {
      result.namespace = xmlNs;
    }
    const xmlPrefix = this._getValue(object, ns.aml.vocabularies.shapes.xmlPrefix, objectContext);
    if (xmlPrefix && typeof xmlPrefix === 'string') {
      result.prefix = xmlPrefix;
    }
    return result;
  }

  /**
   * @param {DataNode} object
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiDataNodeUnion}
   */
  unknownDataNode(object, context) {
    const types = this.readTypes(object['@type'], context);
    const { ns } = this;
    if (types.includes(ns.aml.vocabularies.data.Scalar)) {
      return this.scalarNode(/** @type ScalarNode */(object), context);
    }
    if (types.includes(ns.aml.vocabularies.data.Object)) {
      return this.objectNode(/** @type ObjectNode */(object), context);
    }
    if (types.includes(ns.aml.vocabularies.data.Array)) {
      return this.arrayNode(/** @type ArrayNode */(object), context);
    }
    return undefined;
  }

  /**
   * @param {DataNode} object
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiDataNode}
   */
  dataNode(object, context) {
    const result = /** @type ApiDataNode */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], context),
      customDomainProperties: this.customDomainProperties(object, context),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, context);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    return result;
  }

  /**
   * @param {ScalarNode} object
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiScalarNode}
   */
  scalarNode(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiScalarNode */ (this.dataNode(object, context));
    const { ns } = this;
    const value = this._getValue(object, ns.aml.vocabularies.data.value, objectContext);
    if (value && typeof value === 'string') {
      result.value = value;
    }
    const dataType = this._getLinkValue(object, ns.w3.shacl.datatype, objectContext);
    if (dataType && typeof dataType === 'string') {
      result.dataType = dataType;
    }
    return result;
  }

  /**
   * @param {ObjectNode} object
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiObjectNode}
   */
  objectNode(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiObjectNode */ (this.dataNode(object, context));
    result.properties = {};
    const prefix = this.ns.aml.vocabularies.data.toString();
    const prefixCompact = `${this._getAmfKey(prefix, objectContext)}:`;
    Object.keys(object).forEach((key) => {
      if (key.startsWith(prefix) || key.startsWith(prefixCompact)) {
        let value = object[key];
        if (Array.isArray(value)) {
          [value] = value;
        }
        const name = key.replace(prefix, '').replace(prefixCompact, '');
        result.properties[name] = this.unknownDataNode(value, context);
      }
    });
    return result;
  }

  /**
   * @param {ArrayNode} object
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiArrayNode}
   */
  arrayNode(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiArrayNode */ (this.dataNode(object, objectContext));
    result.members = [];
    const members = /** @type DataNode[] */ (this._computePropertyArray(object, this.ns.w3.rdfSchema.member));
    if (Array.isArray(members) && members.length) {
      result.members = members.map((item) => this.unknownDataNode(item));
    }
    return result;
  }

  /**
   * Adds the custom domain properties to the currently processed property, a.k.a annotations.
   * @param {DomainElement} object 
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiCustomDomainProperty[]} The list of custom domain properties.
   */
  customDomainProperties(object, context) {
    const result = /** @type ApiCustomDomainProperty[] */ ([]);
    const objectContext = context || object['@context'];
    const ids = this._getLinkValues(object, this.ns.aml.vocabularies.document.customDomainProperties, objectContext);
    if (Array.isArray(ids) && ids.length) {
      ids.forEach((id) => {
        const key = `amf://id${id}`;
        let value = /** @type DomainElement */ (object[id] || object[key]);
        if (!value) {
          return;
        }
        if (Array.isArray(value)) {
          [value] = value;
        }
        const extension = this.unknownDataNode(value, objectContext);
        const name = this._getValue(value, this.ns.aml.vocabularies.core.extensionName, objectContext);
        if (!name || !extension) {
          return;
        }
        const cdp = /** @type ApiCustomDomainProperty */ ({
          id: key,
          name,
          extension,
        });
        result.push(cdp);
      });
    }
    return result;
  }

  /**
   * @param {EndPoint} object The EndPoint to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiEndPoint} Serialized EndPoint
   */
  endPoint(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiEndPoint */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object),
      path: '',
      operations: [],
      parameters: [],
      payloads: [],
      servers: [],
      security: [],
      extends: [],
    });
    const { ns } = this;
    const path = this._getValue(object, ns.aml.vocabularies.apiContract.path, objectContext);
    if (path && typeof path === 'string') {
      result.path = path;
    }
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const summary = this._getValue(object, ns.aml.vocabularies.core.summary, objectContext);
    if (summary && typeof summary === 'string') {
      result.summary = summary;
    }
    const operations = this[getArrayItems](object, ns.aml.vocabularies.apiContract.supportedOperation, objectContext);
    if (Array.isArray(operations) && operations.length) {
      result.operations = operations.map(i => this.operation(/** @type Operation */ (i), objectContext));
    }
    const parameters = this[getArrayItems](object, ns.aml.vocabularies.apiContract.parameter, objectContext);
    if (Array.isArray(parameters) && parameters.length) {
      result.parameters = parameters.map(i => this.parameter(i, objectContext));
    }
    const payloads = this[getArrayItems](object, ns.aml.vocabularies.apiContract.payload, objectContext);
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(i => this.payload(/** @type Payload */(i), objectContext));
    }
    const servers = this[getArrayItems](object, ns.aml.vocabularies.apiContract.server, objectContext);
    if (Array.isArray(servers) && servers.length) {
      result.servers = servers.map(i => this.server(i, objectContext));
    }
    const security = this[getArrayItems](object, ns.aml.vocabularies.security.security, objectContext);
    if (Array.isArray(security) && security.length) {
      result.security = security.map(i => this.securityRequirement(i, objectContext));
    }
    const extensions = this[getArrayItems](object, ns.aml.vocabularies.document.extends, objectContext);
    if (Array.isArray(extensions) && extensions.length) {
      result.extends = [];
      extensions.forEach((ex) => {
        let extension = ex;
        if (Array.isArray(extension)) {
          [extension] = extension;
        }
        if (this._hasType(extension, ns.aml.vocabularies.apiContract.ParametrizedResourceType, objectContext)) {
          result.extends.push(this.parametrizedResourceType(extension, objectContext));
        } else if (this._hasType(extension, ns.aml.vocabularies.apiContract.ParametrizedTrait, objectContext)) {
          result.extends.push(this.parametrizedTrait(extension, objectContext));
        }
      });
    }
    return result;
  }

  /**
   * @param {Operation} object The Operation to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiOperation} Serialized Operation
   */
  operation(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiOperation */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object),
      method: '',
      deprecated: false,
      callbacks: [],
      responses: [],
      servers: [],
      security: [],
      accepts: [],
      schemes: [],
      contentType: [],
      tags: [],
      extends: [],
    });
    const { ns } = this;
    const method = this._getValue(object, ns.aml.vocabularies.apiContract.method, objectContext);
    if (method && typeof method === 'string') {
      result.method = method;
    }
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const summary = this._getValue(object, ns.aml.vocabularies.apiContract.guiSummary, objectContext);
    if (summary && typeof summary === 'string') {
      result.summary = summary;
    }
    const deprecated = this._getValue(object, ns.aml.vocabularies.core.deprecated, objectContext);
    if (typeof deprecated === 'boolean') {
      result.deprecated = deprecated;
    }
    const operationId = this._getValue(object, ns.aml.vocabularies.apiContract.operationId, objectContext);
    if (operationId && typeof operationId === 'string') {
      result.operationId = operationId;
    }
    const accepts = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.apiContract.accepts, objectContext));
    if (Array.isArray(accepts)) {
      result.accepts = accepts;
    }
    const schemes = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.apiContract.scheme, objectContext));
    if (Array.isArray(schemes)) {
      result.schemes = schemes;
    }
    const contentType = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.apiContract.contentType, objectContext));
    if (Array.isArray(contentType)) {
      result.contentType = contentType;
    }

    let expects = object[this._getAmfKey(ns.aml.vocabularies.apiContract.expects, objectContext)];
    if (expects) {
      if (Array.isArray(expects)) {
        [expects] = expects;
      }
      result.request = this.request(expects, objectContext);
    }
    let documentation = object[this._getAmfKey(ns.aml.vocabularies.core.documentation, objectContext)];
    if (documentation) {
      if (Array.isArray(documentation)) {
        [documentation] = documentation;
      }
      result.documentation = this.documentation(documentation, objectContext);
    }
    const responses = object[this._getAmfKey(ns.aml.vocabularies.apiContract.returns, objectContext)];
    if (Array.isArray(responses)) {
      result.responses = responses.map(r => this.response(r, objectContext));
    }
    const callbacks = object[this._getAmfKey(ns.aml.vocabularies.apiContract.callback, objectContext)];
    if (Array.isArray(callbacks)) {
      result.callbacks = callbacks.map(c => this.callback(c, objectContext));
    }
    const servers = object[this._getAmfKey(ns.aml.vocabularies.apiContract.server, objectContext)];
    if (Array.isArray(servers)) {
      result.servers = servers.map(s => this.server(s));
    }
    const security = object[this._getAmfKey(ns.aml.vocabularies.security.security, objectContext)];
    if (Array.isArray(security)) {
      result.security = security.map(s => this.securityRequirement(s, objectContext));
    }
    const tags = object[this._getAmfKey(ns.aml.vocabularies.apiContract.tag, objectContext)];
    if (Array.isArray(tags) && tags.length) {
      result.tags = tags.map(s => this.tag(s, objectContext));
    }
    const traits = object[this._getAmfKey(ns.aml.vocabularies.document.extends, objectContext)];
    if (Array.isArray(traits) && traits.length) {
      result.extends = traits.map(t => this.parametrizedTrait(t, objectContext));
    }
    return result;
  }

  /**
   * @param {Tag} object 
   * @param {Record<string, string>=} context
   * @returns {ApiTag}
   */
  tag(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiTag */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object),
      name: '',
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    return result;
  }

  /**
   * @param {Callback} object
   * @param {Record<string, string>=} context
   * @returns {ApiCallback}
   */
  callback(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiCallback */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const expression = this._getValue(object, ns.aml.vocabularies.apiContract.expression, objectContext);
    if (expression && typeof expression === 'string') {
      result.expression = expression;
    }
    let endpoint = object[this._getAmfKey(ns.aml.vocabularies.apiContract.endpoint, objectContext)];
    if (endpoint) {
      if (Array.isArray(endpoint)) {
        [endpoint] = endpoint;
      }
      result.endpoint = this.endPoint(endpoint, objectContext);
    }
    return result;
  }

  /**
   * @param {Request} object The API request to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiRequest} Serialized API request
   */
  request(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiRequest */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object),
      required: false,
      headers: [],
      queryParameters: [],
      payloads: [],
      uriParameters: [],
      cookieParameters: [],
    });
    const { ns } = this;
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const required = this._getValue(object, ns.aml.vocabularies.apiContract.required, objectContext);
    if (required && typeof required === 'boolean') {
      result.required = required;
    }
    let queryString = object[this._getAmfKey(ns.aml.vocabularies.apiContract.queryString, objectContext)];
    if (queryString) {
      if (Array.isArray(queryString)) {
        [queryString] = queryString;
      }
      result.queryString = this.unknownShape(queryString, undefined, objectContext);
    }
    const headers = this[getArrayItems](object, ns.aml.vocabularies.apiContract.header, objectContext);
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => this.parameter(p, objectContext));
    }
    const queryParameters = this[getArrayItems](object, ns.aml.vocabularies.apiContract.parameter, objectContext);
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map(p => this.parameter(p, objectContext));
    }
    const uriParameters = this[getArrayItems](object, ns.aml.vocabularies.apiContract.uriParameter, objectContext);
    if (Array.isArray(uriParameters) && uriParameters.length) {
      result.uriParameters = uriParameters.map(p => this.parameter(p, objectContext));
    }
    const cookieParameters = this[getArrayItems](object, ns.aml.vocabularies.apiContract.cookieParameter, objectContext);
    if (Array.isArray(cookieParameters) && cookieParameters.length) {
      result.cookieParameters = cookieParameters.map(p => this.parameter(p, objectContext));
    }
    const payloads = this[getArrayItems](object, ns.aml.vocabularies.apiContract.payload, objectContext);
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => this.payload(/** @type Payload */ (p), objectContext));
    }
    return result;
  }

  /**
   * @param {Response} object The Response to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiResponse} Serialized Response
   */
  response(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiResponse */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      headers: [],
      payloads: [],
      examples: [],
      links: [],
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const statusCode = this._getValue(object, ns.aml.vocabularies.apiContract.statusCode, objectContext);
    if (statusCode && typeof statusCode === 'string') {
      result.statusCode = statusCode;
    }
    const headers = this[getArrayItems](object, ns.aml.vocabularies.apiContract.header, objectContext);
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => this.parameter(p, objectContext));
    }
    const payloads = this[getArrayItems](object, ns.aml.vocabularies.apiContract.payload, objectContext);
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => this.payload(/** @type Payload */(p), objectContext));
    }
    const examples = object[this._getAmfKey(ns.aml.vocabularies.apiContract.examples, objectContext)];
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(e => this.example(e, objectContext));
    }
    const links = object[this._getAmfKey(ns.aml.vocabularies.apiContract.link, objectContext)];
    if (Array.isArray(links) && links.length) {
      result.links = links.map(p => this.templatedLink(p, objectContext));
    }
    return result;
  }

  /**
   * @param {Payload} object The Payload to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiPayload} Serialized Payload
   */
  payload(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiPayload */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      examples: [],
      // encoding: [],
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const mediaType = this._getValue(object, ns.aml.vocabularies.core.mediaType, objectContext);
    if (mediaType && typeof mediaType === 'string') {
      result.mediaType = mediaType;
    }
    let schema = object[this._getAmfKey(ns.aml.vocabularies.shapes.schema, objectContext)];
    if (schema) {
      if (Array.isArray(schema)) {
        [schema] = schema;
      }
      result.schema = this.unknownShape(schema, {
        trackedId: result.id,
      }, objectContext);
    }
    const examples = object[this._getAmfKey(ns.aml.vocabularies.apiContract.examples, objectContext)];
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(e => this.example(e, objectContext));
    }
    // if (Array.isArray(encoding) && encoding.length) {
    //   result.encoding = encoding.map((p) => p.id);
    // }
    return result;
  }

  /**
   * @param {TemplatedLink} object The TemplatedLink to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiTemplatedLink} Serialized TemplatedLink
   */
  templatedLink(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiTemplatedLink */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      mapping: [],
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const operationId = this._getValue(object, ns.aml.vocabularies.apiContract.operationId, objectContext);
    if (operationId && typeof operationId === 'string') {
      result.operationId = operationId;
    }
    let server = object[this._getAmfKey(ns.aml.vocabularies.apiContract.server, objectContext)];
    if (server) {
      if (Array.isArray(server)) {
        [server] = server;
      }
      result.server = this.server(server, objectContext);
    }
    let mapping = /** @type IriTemplateMapping[] */ (object[this._getAmfKey(ns.aml.vocabularies.apiContract.mapping, objectContext)]);
    if (mapping) {
      if (mapping && !Array.isArray(mapping)) {
        mapping = [mapping];
      }
      if (mapping) {
        result.mapping = mapping.map(item => this.iriTemplateMapping(item, objectContext));
      }
    }
    // if (!template.isNullOrEmpty) {
    //   result.template = template.value();
    // }
    // if (!requestBody.isNullOrEmpty) {
    //   result.requestBody = requestBody.value();
    // }
    return result;
  }

  /**
   * @param {IriTemplateMapping} object 
   * @param {Record<string, string>=} context
   * @returns {ApiIriTemplateMapping}
   */
  iriTemplateMapping(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiIriTemplateMapping */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const templateVariable = this._getValue(object, ns.aml.vocabularies.apiContract.templateVariable, objectContext);
    if (templateVariable && typeof templateVariable === 'string') {
      result.templateVariable = templateVariable;
    }
    const linkExpression = this._getValue(object, ns.aml.vocabularies.apiContract.linkExpression, objectContext);
    if (linkExpression && typeof linkExpression === 'string') {
      result.linkExpression = linkExpression;
    }
    return result;
  }

  /**
   * @param {ParametrizedSecurityScheme} object The ParametrizedSecurityScheme to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiParametrizedSecurityScheme} Serialized ParametrizedSecurityScheme
   */
  parametrizedSecurityScheme(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiParametrizedSecurityScheme */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    let scheme = object[this._getAmfKey(ns.aml.vocabularies.security.scheme, objectContext)];
    if (scheme) {
      if (Array.isArray(scheme)) {
        [scheme] = scheme;
      }
      result.scheme = this.securityScheme(scheme, objectContext);
    }
    let settings = object[this._getAmfKey(ns.aml.vocabularies.security.settings, objectContext)];
    if (settings) {
      if (Array.isArray(settings)) {
        [settings] = settings;
      }
      result.settings = this.securitySettings(settings, objectContext);
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The SecurityScheme to serialize as a list item.
   * @param {Record<string, string>=} context
   * @returns {ApiSecuritySchemeListItem} Serialized SecurityScheme
   */
  securitySchemeListItem(object, context) {
    const objectContext = context || object['@context'];
    
    const result = /** @type ApiSecuritySchemeListItem */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      type: '',
    });
    const { ns } = this;
    const type = this._getValue(object, ns.aml.vocabularies.security.type, objectContext);
    if (type && typeof type === 'string') {
      result.type = type;
    }
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const displayName = this._getValue(object, ns.aml.vocabularies.core.displayName, objectContext);
    if (displayName && typeof displayName === 'string') {
      result.displayName = displayName;
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The SecurityScheme to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityScheme} Serialized SecurityScheme
   */
  securityScheme(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityScheme */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      headers: [],
      queryParameters: [],
      responses: [],
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const displayName = this._getValue(object, ns.aml.vocabularies.core.displayName, objectContext);
    if (displayName && typeof displayName === 'string') {
      result.displayName = displayName;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const type = this._getValue(object, ns.aml.vocabularies.security.type, objectContext);
    if (type && typeof type === 'string') {
      result.type = type;
    }
    let settings = object[this._getAmfKey(ns.aml.vocabularies.security.settings, objectContext)];
    if (settings) {
      if (Array.isArray(settings)) {
        [settings] = settings;
      }
      result.settings = this.securitySettings(settings, objectContext);
    }
    let queryString = object[this._getAmfKey(ns.aml.vocabularies.apiContract.queryString, objectContext)];
    if (queryString) {
      if (Array.isArray(queryString)) {
        [queryString] = queryString;
      }
      result.queryString = this.unknownShape(queryString, undefined, objectContext);
    }
    const headers = this[getArrayItems](object, ns.aml.vocabularies.apiContract.header, objectContext);
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => this.parameter(p, objectContext));
    }
    const queryParameters = this[getArrayItems](object, ns.aml.vocabularies.apiContract.parameter, objectContext);
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map(p => this.parameter(p, objectContext));
    }
    const responses = this[getArrayItems](object, ns.aml.vocabularies.apiContract.response, objectContext);
    if (Array.isArray(responses) && responses.length) {
      result.responses = responses.map(p => this.response(/** @type Response */ (p), objectContext));
    }
    return result;
  }

  /**
   * @param {SecurityRequirement} object The SecurityRequirement to serialize.
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityRequirement} Serialized SecurityRequirement
   */
  securityRequirement(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityRequirement */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      schemes: [],
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const schemes = /** @type ParametrizedSecurityScheme[] */ (object[this._getAmfKey(ns.aml.vocabularies.security.schemes, objectContext)]);
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map(p => this.parametrizedSecurityScheme(p, objectContext));
    }
    return result;
  }

  /**
   * @param {Settings} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecuritySettingsUnion}
   */
  securitySettings(object, context) {
    const objectContext = context || object['@context'];
    const { ns } = this;
    const types = this.readTypes(object['@type'], objectContext);
    if (types.includes(ns.aml.vocabularies.security.OAuth1Settings)) {
      return this.oAuth1Settings(/** @type OAuth1Settings */ (object), objectContext);
    }
    if (types.includes(ns.aml.vocabularies.security.OAuth2Settings)) {
      return this.oAuth2Settings(/** @type OAuth2Settings */ (object), objectContext);
    }
    if (types.includes(ns.aml.vocabularies.security.ApiKeySettings)) {
      return this.apiKeySettings(/** @type ApiKeySettings */ (object), objectContext);
    }
    if (types.includes(ns.aml.vocabularies.security.HttpSettings)) {
      return this.httpSettings(/** @type HttpSettings */ (object), objectContext);
    }
    if (types.includes(ns.aml.vocabularies.security.OpenIdConnectSettings)) {
      return this.openIdConnectSettings(/** @type OpenIdConnectSettings */ (object), objectContext);
    }
    return this.settings(object, objectContext);
  }

  /**
   * @param {Settings} object
   * @param {Record<string, string>=} context
   * @returns {ApiSecuritySettings}
   */
  settings(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecuritySettings */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    // if (additionalProperties && additionalProperties.id) {
    //   result.additionalProperties = this.unknownDataNode(additionalProperties);
    // }
    return result;
  }

  /**
   * @param {OAuth1Settings} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityOAuth1Settings}
   */
  oAuth1Settings(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityOAuth1Settings */ (this.settings(object, objectContext));
    const { ns } = this;
    const authorizationUri = this._getValue(object, ns.aml.vocabularies.security.authorizationUri, objectContext);
    if (authorizationUri && typeof authorizationUri === 'string') {
      result.authorizationUri = authorizationUri;
    }
    const requestTokenUri = this._getValue(object, ns.aml.vocabularies.security.requestTokenUri, objectContext);
    if (requestTokenUri && typeof requestTokenUri === 'string') {
      result.requestTokenUri = requestTokenUri;
    }
    const tokenCredentialsUri = this._getValue(object, ns.aml.vocabularies.security.tokenCredentialsUri, objectContext);
    if (tokenCredentialsUri && typeof tokenCredentialsUri === 'string') {
      result.tokenCredentialsUri = tokenCredentialsUri;
    }
    const signatures = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.security.signature, objectContext));
    if (Array.isArray(signatures) && signatures.length) {
      result.signatures = signatures;
    } else {
      result.signatures = [];
    }
    return result;
  }

  /**
   * @param {OAuth2Settings} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityOAuth2Settings}
   */
  oAuth2Settings(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityOAuth2Settings */ (this.settings(object, objectContext));
    const { ns } = this;
    const grants = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.security.authorizationGrant, objectContext));
    if (Array.isArray(grants) && grants.length) {
      result.authorizationGrants = grants;
    } else {
      result.authorizationGrants = [];
    }
    const flows = /** @type OAuth2Flow[] */ (object[this._getAmfKey(ns.aml.vocabularies.security.flows, objectContext)]);
    if (Array.isArray(flows) && flows.length) {
      result.flows = flows.map((p) => this.oAuth2Flow(p, objectContext));
    } else {
      result.flows = [];
    }
    return result;
  }

  /**
   * @param {OAuth2Flow} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityOAuth2Flow}
   */
  oAuth2Flow(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityOAuth2Flow */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      scopes: [],
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const authorizationUri = this._getValue(object, ns.aml.vocabularies.security.authorizationUri, objectContext);
    if (authorizationUri && typeof authorizationUri === 'string') {
      result.authorizationUri = authorizationUri;
    }
    const accessTokenUri = this._getValue(object, ns.aml.vocabularies.security.accessTokenUri, objectContext);
    if (accessTokenUri && typeof accessTokenUri === 'string') {
      result.accessTokenUri = accessTokenUri;
    }
    const flow = this._getValue(object, ns.aml.vocabularies.security.flow, objectContext);
    if (flow && typeof flow === 'string') {
      result.flow = flow;
    }
    const refreshUri = this._getValue(object, ns.aml.vocabularies.security.refreshUri, objectContext);
    if (refreshUri && typeof refreshUri === 'string') {
      result.refreshUri = refreshUri;
    }
    const scopes = object[this._getAmfKey(ns.aml.vocabularies.security.scope, objectContext)];
    if (Array.isArray(scopes) && scopes.length) {
      result.scopes = scopes.map((p) => this.scope(p, objectContext));
    }
    return result;
  }

  /**
   * @param {Scope} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityScope}
   */
  scope(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityScope */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    return result;
  }

  /**
   * @param {ApiKeySettings} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityApiKeySettings}
   */
  apiKeySettings(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityApiKeySettings */ (this.settings(object, objectContext));
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const inParam = this._getValue(object, ns.aml.vocabularies.security.in, objectContext);
    if (inParam && typeof inParam === 'string') {
      result.in = inParam;
    }
    return result;
  }

  /**
   * @param {HttpSettings} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityHttpSettings}
   */
  httpSettings(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityHttpSettings */ (this.settings(object, objectContext));
    const { ns } = this;
    const scheme = this._getValue(object, ns.aml.vocabularies.security.scheme, objectContext);
    if (scheme && typeof scheme === 'string') {
      result.scheme = scheme;
    }
    const bearerFormat = this._getValue(object, ns.aml.vocabularies.security.bearerFormat, objectContext);
    if (bearerFormat && typeof bearerFormat === 'string') {
      result.bearerFormat = bearerFormat;
    }
    return result;
  }

  /**
   * @param {OpenIdConnectSettings} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSecurityOpenIdConnectSettings}
   */
  openIdConnectSettings(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiSecurityOpenIdConnectSettings */ (this.settings(object, objectContext));
    const { ns } = this;
    const url = this._getValue(object, ns.aml.vocabularies.security.openIdConnectUrl, objectContext);
    if (url && typeof url === 'string') {
      result.url = url;
    }
    return result;
  }

  /**
   * Serializes source maps, when available.
   * @param {DocumentSourceMaps} object 
   * @param {Record<string, string>=} context
   * @returns {ApiDocumentSourceMaps|undefined}
   */
  sourceMap(object, context) {
    const objectContext = context || object['@context'];
    const { ns } = this;
    let sm = object[this._getAmfKey(ns.aml.vocabularies.docSourceMaps.sources, objectContext)];
    if (!sm) {
      return undefined;
    }
    if (Array.isArray(sm)) {
      [sm] = sm;
    }
    const result = /** @type ApiDocumentSourceMaps */ ({
      id: sm['@id'],
      types: this.readTypes(sm['@type']),
    });
    const synthesizedField = sm[this._getAmfKey(ns.aml.vocabularies.docSourceMaps.synthesizedField, objectContext)];
    if (Array.isArray(synthesizedField) && synthesizedField.length) {
      result.synthesizedField = synthesizedField.map(i => this.synthesizedField(i, objectContext));
    }
    const lexical = sm[this._getAmfKey(ns.aml.vocabularies.docSourceMaps.lexical, objectContext)];
    if (Array.isArray(lexical) && lexical.length) {
      result.lexical = lexical.map(i => this.synthesizedField(i, objectContext))
    }
    const trackedElement = sm[this._getAmfKey(ns.aml.vocabularies.docSourceMaps.trackedElement, objectContext)];
    if (Array.isArray(trackedElement) && trackedElement.length) {
      result.trackedElement = this.synthesizedField(trackedElement[0], objectContext);
    }
    const autoName = sm[this._getAmfKey(ns.aml.vocabularies.docSourceMaps.autoGeneratedName, objectContext)];
    if (Array.isArray(autoName) && autoName.length) {
      result.autoGeneratedName = autoName.map(i => this.synthesizedField(i, objectContext))
    }
    const jsonSchema = sm[this._getAmfKey(ns.aml.vocabularies.docSourceMaps.parsedJsonSchema, objectContext)];
    if (Array.isArray(jsonSchema) && jsonSchema.length) {
      result.parsedJsonSchema = this.synthesizedField(jsonSchema[0], objectContext);
    }
    const declaredElement = sm[this._getAmfKey(ns.aml.vocabularies.docSourceMaps.declaredElement, objectContext)];
    if (Array.isArray(declaredElement) && declaredElement.length) {
      result.declaredElement = this.synthesizedField(declaredElement[0], objectContext);
    }
    return result;
  }

  /**
   * @param {SynthesizedField} object 
   * @param {Record<string, string>=} context
   * @returns {ApiSynthesizedField}
   */
  synthesizedField(object, context) {
    const objectContext = context || object['@context'];
    // compact model
    if (typeof object === 'string') {
      return /** @type ApiSynthesizedField */ ({
        id: 'synthesizedField/generated',
        value: object,
      });
    }
    const result = /** @type ApiSynthesizedField */ ({
      id: object['@id'],
    });
    // @ts-ignore
    const element = this._getValue(object, this.ns.aml.vocabularies.docSourceMaps.element, objectContext);
    if (typeof element === 'string') {
      result.element = element;
    }
    // @ts-ignore
    const value = this._getValue(object, this.ns.aml.vocabularies.docSourceMaps.value, objectContext);
    if (typeof value === 'string') {
      result.value = value
    }
    return result;
  }

  /**
   * @param {ParametrizedDeclaration} object 
   * @param {Record<string, string>=} context
   * @returns {ApiParametrizedDeclaration}
   */
  parametrizedDeclaration(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiParametrizedDeclaration */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      variables: [],
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
    });
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    const variables = object[this._getAmfKey(ns.aml.vocabularies.document.variable, objectContext)];
    if (Array.isArray(variables)) {
      variables.forEach((item) => {
        result.variables.push(this.variableValue(item, objectContext));
      });
    }
    const targets = object[this._getAmfKey(ns.aml.vocabularies.document.target, objectContext)];
    if (Array.isArray(targets) && targets.length) {
      const [target] = targets;
      result.target = this.abstractDeclaration(target, objectContext);
    }
    return result;
  }

  /**
   * @param {ParametrizedTrait} object 
   * @param {Record<string, string>=} context
   * @returns {ApiParametrizedTrait}
   */
  parametrizedTrait(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiParametrizedTrait */ (this.parametrizedDeclaration(object, objectContext));
    return result;
  }

  /**
   * @param {ParametrizedResourceType} object
   * @param {Record<string, string>=} context 
   * @returns {ApiParametrizedResourceType}
   */
  parametrizedResourceType(object, context) {
    const objectContext = context || object['@context'];
    const result = /** @type ApiParametrizedResourceType */ (this.parametrizedDeclaration(object, objectContext));
    return result;
  }

  /**
   * @param {VariableValue} object 
   * @param {Record<string, string>=} context
   * @returns {ApiVariableValue}
   */
  variableValue(object, context) {
    const objectContext = context || object['@context'];
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    const result = /** @type ApiVariableValue */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      name,
    });
    const values = object[this._getAmfKey(ns.aml.vocabularies.document.value, objectContext)];
    if (Array.isArray(values)) {
      const [item] = values;
      result.value = this.unknownDataNode(item, objectContext);
    }
    return result;
  }

  /**
   * @param {AbstractDeclaration} object 
   * @param {Record<string, string>=} context
   * @returns {ApiAbstractDeclaration}
   */
  abstractDeclaration(object, context) {
    const objectContext = context || object['@context'];
    const { ns } = this;
    const name = this._getValue(object, ns.aml.vocabularies.core.name, objectContext);
    const result = /** @type ApiAbstractDeclaration */ ({
      id: object['@id'],
      types: this.readTypes(object['@type'], objectContext),
      customDomainProperties: this.customDomainProperties(object, objectContext),
      sourceMaps: this.sourceMap(object, objectContext),
      name,
      variables: [],
    });
    const variables = /** @type string[] */ (this._getValueArray(object, ns.aml.vocabularies.document.variable, objectContext));
    if (Array.isArray(variables)) {
      result.variables = variables;
    }
    const description = this._getValue(object, ns.aml.vocabularies.core.description, objectContext);
    if (description && typeof description === 'string') {
      result.description = description;
    }
    const dataNode = object[this._getAmfKey(ns.aml.vocabularies.document.dataNode, objectContext)];
    if (Array.isArray(dataNode)) {
      const [item] = dataNode;
      result.dataNode = this.unknownDataNode(item, objectContext);
    }
    return result;
  }

  /**
   * @param {EndPoint} object The EndPoint to serialize as a list item.
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiEndPointWithOperationsListItem} Serialized EndPoint as a list item.
   */
  endPointWithOperationsListItem(object, context) {
    const { ns } = this;
    const path = this._getValue(object, ns.aml.vocabularies.apiContract.path, context);

    const result = /** @type ApiEndPointWithOperationsListItem */ ({
      id: object['@id'],
      path,
      operations: [],
    });
    const operations = this[getArrayItems](object, ns.aml.vocabularies.apiContract.supportedOperation, context);
    if (Array.isArray(operations) && operations.length) {
      result.operations = operations.map(i => this.operationListItem(/** @type Operation */ (i), context));
    }
    const name = this._getValue(object, ns.aml.vocabularies.core.name, context);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    return result;
  }

  /**
   * @param {Operation} object The Operation to serialize as a list item.
   * @param {Record<string, string>=} context A context to use. If not set, it looks for the context of the passed model
   * @returns {ApiOperationListItem} Serialized Operation as a list item.
   */
  operationListItem(object, context) {
    const result = /** @type ApiOperationListItem */ ({
      id: object['@id'],
      method: '',
    });
    const { ns } = this;
    const method = this._getValue(object, ns.aml.vocabularies.apiContract.method, context);
    if (method && typeof method === 'string') {
      result.method = method;
    }
    const name = this._getValue(object, ns.aml.vocabularies.core.name, context);
    if (name && typeof name === 'string') {
      result.name = name;
    }
    return result;
  }
}
