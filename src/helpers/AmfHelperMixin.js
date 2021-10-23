/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
// @ts-ignore
import { AmfModelExpander, JsonLdOptions, JsonLd } from 'amf-json-ld-lib'
import { ns } from './Namespace.js';

/** @typedef {import('./Namespace').ns} Namespace */
/** @typedef {import('./amf').DomainElement} DomainElement */
/** @typedef {import('./amf').AmfDocument} AmfDocument */
/** @typedef {import('./amf').WebApi} WebApi */
/** @typedef {import('./amf').AsyncApi} AsyncApi */
/** @typedef {import('./amf').Server} Server */
/** @typedef {import('./amf').EndPoint} EndPoint */
/** @typedef {import('./amf').Operation} Operation */
/** @typedef {import('./amf').Shape} Shape */
/** @typedef {import('./amf').Parameter} Parameter */
/** @typedef {import('./amf').Request} Request */
/** @typedef {import('./amf').Response} Response */
/** @typedef {import('./amf').Payload} Payload */
/** @typedef {import('./amf').SecurityScheme} SecurityScheme */
/** @typedef {import('./api').ServersQueryOptions} ServersQueryOptions */
/** @typedef {import('./api').ServerQueryOptions} ServerQueryOptions */
/** @typedef {import('./api').ComputeUriOptions} ComputeUriOptions */

export const expandKey = Symbol('expandKey');
export const findAmfType = Symbol('findAmfType');
export const findReferenceObject = Symbol('findReferenceObject');
export const getArrayItems = Symbol('getArrayItems');
export const computeReferenceSecurity = Symbol('computeReferenceSecurity');

/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */

/**
 * Common functions used by AMF components to compute AMF values.
 * @param {*} base
 * @returns {*}
 * @mixin
 */
export const AmfHelperMixin = (base) => class extends base {
  static get properties() {
    return {
      /**
       * Generated AMF json/ld model form the API spec.
       * The element assumes the object of the first array item to be a
       * type of `"http://raml.org/vocabularies/document#Document`
       * on AMF vocabulary.
       *
       * It is only useful for the element to resolve references.
       *
       * @type {Object|Array<Object>}
       */
      amf: { type: Object }
    };
  }

  /**
   * A namespace for AMF model.
   * @returns {Namespace}
   */
  get ns() {
    return ns;
  }

  get amf() {
    return this._amf;
  }

  set amf(value) {
    const old = this._amf;
    if (old === value) {
      return;
    }
    let expanded;
    if (!value || AmfModelExpander.isInExpandedForm(value)) {
      this._flattenedAmf = undefined;
      expanded = value;
    } else {
      const oldFlattened = this._flattenedAmf;
      if (oldFlattened === value) {
        return;
      }
      this._flattenedAmf = value;
      expanded = this._expand(value);
    }
    // Cached keys cannot be static as this element can be using in the sane
    // document with different AMF models
    this.__cachedKeys = {};
    this._amf = expanded;
    this.__amfChanged(expanded);
    if (this.requestUpdate) {
      this.requestUpdate('amf', old);
    }
  }

  /**
   * This is an abstract method to be implemented by the components.
   * If, instead, the component uses `amf` setter you must use `super.amf` to
   * set the value.
   * @param {Array|Object} amf Current AMF model. Can be undefined.
   * @abstract
   */
  /* eslint-disable-next-line no-unused-vars */
  __amfChanged(amf) {}

  /**
   * Expands flattened AMF model
   * @param {Object} amf 
   */
  _expand(amf) {
    AmfModelExpander.preprocessLegacyRootNodeId(amf)
    const linkEmbeddingFilter = key => !key.endsWith("fixPoint")
    const rootNode = amf['@context'] ? '' : "amf://id";
    const options = JsonLdOptions.apply()
      .withEmbeddedLinks(linkEmbeddingFilter)
      .withCompactedIris()
      .withExpandedStructure()
      .withRootNode(rootNode)
    return JsonLd.process(amf, options)
  }

  /**
   * Returns compact model key for given value.
   * @param {string} property AMF original property
   * @returns {string} Compact model property name or the same value if
   * value not found in the context.
   */
  _getAmfKey(property) {
    if (!property) {
      return undefined;
    }
    let {amf} = this;
    if (!amf) {
      return property;
    }
    if (Array.isArray(amf)) {
      [amf] = amf;
    }
    if (!this.__cachedKeys) {
      this.__cachedKeys = {};
    }
    const ctx = amf['@context'];
    if (!ctx || !property) {
      return property;
    }
    const cache = this.__cachedKeys;
    if (property in cache) {
      return cache[property];
    }
    /* eslint-disable-next-line no-param-reassign */
    property = String(property);
    const hashIndex = property.indexOf('#');
    const hashProperty = property.substr(0, hashIndex + 1);
    const keys = Object.keys(ctx);
    for (let i = 0, len = keys.length; i < len; i++) {
      const k = keys[i];
      if (ctx[k] === property) {
        cache[property] = k;
        return k;
      } if (hashIndex === -1 && property.indexOf(ctx[k]) === 0) {
        const result = property.replace(ctx[k], `${k  }:`);
        cache[property] = result;
        return result;
      } if (ctx[k] === hashProperty) {
        const result = `${k  }:${  property.substr(hashIndex + 1)}`;
        cache[property] = result;
        return result;
      }
    }
    return property;
  }

  /**
   * Ensures that the model is AMF object.
   *
   * @param {any} amf AMF json/ld model
   * @returns {AmfDocument|undefined} API spec
   */
  _ensureAmfModel(amf) {
    if (!amf) {
      return undefined;
    }
    if (Array.isArray(amf)) {
      /* eslint-disable-next-line no-param-reassign */
      [amf] = amf;
    }
    if (this._hasType(amf, ns.aml.vocabularies.document.Document)) {
      return amf;
    }
    return undefined;
  }

  /**
   * Ensures that the value is an array.
   * It returns undefined when there's no value.
   * It returns the same array if the value is already an array.
   * It returns new array of the item is not an array.
   *
   * @param {Array|any} value An item to test
   * @returns {Array|undefined}
   */
  _ensureArray(value) {
    if (!value) {
      return undefined;
    }
    if (value instanceof Array) {
      return value;
    }
    return [value];
  }

  /**
   * Gets a single scalar value from a model.
   * @param {DomainElement} model Amf model to extract the value from.
   * @param {string} key Model key to search for the value
   * @returns {string|number|boolean|undefined|null} Value for key
   */
  _getValue(model, key) {
    /* eslint-disable-next-line no-param-reassign */
    key = this._getAmfKey(key);
    let data = model && model[key];
    if (!data) {
      // This includes "undefined", "false", "null" and "0"
      return data;
    }
    if (Array.isArray(data)) {
      /* eslint-disable-next-line no-param-reassign */
      [data] = data;
    }
    if (!data) {
      return undefined;
    }
    const type = typeof data;
    if (['string', 'number', 'boolean', 'undefined'].indexOf(type) !== -1) {
      return data;
    }
    return data['@value'];
  }

  /**
   * Gets values from a model as an array of `@value` properties.
   * @param {DomainElement} model Amf model to extract the value from.
   * @param {string} key Model key to search for the value
   * @returns {Array<string|number|boolean|null>|undefined} Value for key
   */
  _getValueArray(model, key) {
    /* eslint-disable-next-line no-param-reassign */
    key = this._getAmfKey(key);
    const data = model && this._ensureArray(model[key]);
    if (!Array.isArray(data)) {
      return undefined;
    }
    return data.map((item) => item['@value'] || item);
  }

  /**
   * Reads an array from the model.
   * 
   * @param {DomainElement} model Amf model to extract the value from.
   * @param {string} key Model key to search for the value
   * @returns {DomainElement[]|undefined} Value for the key
   */
  [getArrayItems](model, key) {
    const k = this._getAmfKey(key);
    const data = model && this._ensureArray(model[k]);
    if (!Array.isArray(data)) {
      return undefined;
    }
    return data;
  }

  /**
   * Reads the value of the `@id` property.
   * @param {DomainElement} model Amf model to extract the value from.
   * @param {string} key Model key to search for the @id
   * @returns {string|undefined}
   */
  _getLinkValue(model, key) {
    const k = this._getAmfKey(key);
    let data = model && model[k];
    if (!data) {
      return undefined;
    }
    if (Array.isArray(data)) {
      [data] = data;
    }
    if (!data) {
      return undefined;
    }
    return data['@id'];
  }

  /**
   * Reads the list of value for the `@id` property.
   * @param {DomainElement} model Amf model to extract the value from.
   * @param {string} key Model key to search for the @id
   * @returns {string[]|undefined}
   */
  _getLinkValues(model, key) {
    const k = this._getAmfKey(key);
    let data = /** @type DomainElement[] */ (model && model[k]);
    if (!data) {
      return undefined;
    }
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data.map(i => i['@id']);
  }

  /**
   * Checks if a model has a type.
   * @param {DomainElement} model Model to test
   * @param {string} type Type name
   * @returns {boolean} True if model has a type.
   */
  _hasType(model, type) {
    const types = this._ensureArray(model && model['@type']);
    if (!types || !types.length) {
      return false;
    }
    const key = this._getAmfKey(type);
    for (let i = 0; i < types.length; i++) {
      if (types[i] === key) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if a shape has a property.
   * @param {DomainElement} shape The shape to test
   * @param {string} key Property name to test
   * @returns {boolean}
   */
  _hasProperty(shape, key) {
    /* eslint-disable-next-line no-param-reassign */
    key = this._getAmfKey(key);
    return !!(shape && key && key in shape);
  }

  /**
   * Computes array value of a property in a model (shape).
   *
   * @param {DomainElement} shape AMF shape object
   * @param {string} key Property name
   * @returns {Array<string|number|boolean|null|Object>|undefined}
   */
  _computePropertyArray(shape, key) {
    if (!shape) {
      return undefined;
    }
    /* eslint-disable-next-line no-param-reassign */
    key = this._getAmfKey(key);
    const data = this._ensureArray(shape && shape[key]);
    if (!data || !Array.isArray(data)) {
      return undefined;
    }
    return data;
  }

  /**
   * Computes API version from the AMF model.
   *
   * @param {AmfDocument} amf
   * @returns {string}
   */
  _computeApiVersion(amf) {
    const api = this._computeApi(amf);
    if (!api) {
      return undefined;
    }
    return /** @type string */ (this._getValue(api, this.ns.aml.vocabularies.core.version));
  }

  /**
   * Computes model's `encodes` property.
   *
   * @param {AmfDocument} model AMF data model
   * @returns {DomainElement|undefined} List of encodes
   */
  _computeEncodes(model) {
    if (!model) {
      return undefined;
    }
    if (Array.isArray(model)) {
      /* eslint-disable-next-line no-param-reassign */
      [model] = model;
    }
    const key = this._getAmfKey(this.ns.aml.vocabularies.document.encodes);
    const data = model[key];
    if (data) {
      return Array.isArray(data) ? data[0] : data;
    }
    return undefined;
  }

  /**
   * Computes list of declarations in the AMF api model.
   *
   * @param {AmfDocument} model AMF json/ld model for an API
   * @returns {DomainElement[]|undefined} List of declarations
   */
  _computeDeclares(model) {
    if (!model) {
      return undefined;
    }
    if (Array.isArray(model)) {
      /* eslint-disable-next-line no-param-reassign */
      [model] = model;
    }
    if (!model) {
      return undefined;
    }
    const key = this._getAmfKey(this.ns.aml.vocabularies.document.declares);
    const data = this._ensureArray(model[key]);
    return Array.isArray(data) ? data : undefined;
  }

  /**
   * Computes list of references in the AMF api model.
   *
   * @param {AmfDocument} model AMF json/ld model for an API
   * @returns {DomainElement[]|undefined} List of declarations
   */
  _computeReferences(model) {
    if (!model) {
      return undefined;
    }
    if (Array.isArray(model)) {
      /* eslint-disable-next-line no-param-reassign */
      [model] = model;
    }
    if (!model) {
      return undefined;
    }
    const key = this._getAmfKey(this.ns.aml.vocabularies.document.references);
    const data = this._ensureArray(model[key]);
    return data instanceof Array ? data : undefined;
  }

  /**
   * Computes AMF's `http://schema.org/WebAPI` model
   *
   * @param {AmfDocument} model AMF json/ld model for an API
   * @returns {WebApi|undefined} Web API declaration.
   */
  _computeWebApi(model) {
    const enc = this._computeEncodes(model);
    if (!enc) {
      return undefined;
    }
    if (this._hasType(enc, this.ns.schema.webApi)) {
      return enc;
    }
    return undefined;
  }

  /**
   * Computes AMF's `http://schema.org/API` model
   *
   * @param {AmfDocument} model AMF json/ld model for an API
   * @returns {AsyncApi|WebApi} API declaration.
   */
  _computeApi(model) {
    const enc = this._computeEncodes(model);
    if (!enc) {
      return undefined;
    }
    if (this._isAPI(model) || this._isWebAPI(model) || this._isAsyncAPI(model)) {
      return enc;
    }
    return undefined;
  }

  /**
   * Returns whether an AMF node is a WebAPI node
   * 
   * @param {AmfDocument} model  AMF json/ld model for an API
   * @returns {boolean}
   */
  _isWebAPI(model) {
    const enc = this._computeEncodes(model);
    if (!enc) {
      return false;
    }
    return this._hasType(enc, this.ns.aml.vocabularies.apiContract.WebAPI);
  }

  /**
   * Returns whether an AMF node is an AsyncAPI node
   * 
   * @param {AmfDocument} model  AMF json/ld model for an API
   * @returns {boolean}
   */
  _isAsyncAPI(model) {
    const enc = this._computeEncodes(model);
    if (!enc) {
      return false;
    }
    return this._hasType(enc, this.ns.aml.vocabularies.apiContract.AsyncAPI);
  }

  /**
   * Returns whether an AMF node is an API node
   * 
   * @param {AmfDocument} model  AMF json/ld model for an API
   * @returns {boolean}
   */
  _isAPI(model) {
    const enc = this._computeEncodes(model);
    if (!enc) {
      return false;
    }
    return this._hasType(enc, this.ns.aml.vocabularies.apiContract.API);
  }

  /**
   * Determines whether a partial model is valid for reading servers from
   * Current valid values:
   * - Operation
   * - Endpoint
   * @param {Object} model The partial model to evaluate
   * @returns {boolean} Whether the model's type is part of the array of valid node types from which
   * to read servers
   * @private
   */
  _isValidServerPartial(model) {
    if (Array.isArray(model)) {
      /* eslint-disable-next-line no-param-reassign */
      [model] = model;
    }
    if (!model) {
      return false;
    }
    const oKey = this.ns.aml.vocabularies.apiContract.Operation;
    const eKey = this.ns.aml.vocabularies.apiContract.EndPoint;
    const allowedPartialModelTypes = [this._getAmfKey(oKey), this._getAmfKey(eKey)];
    const types = model['@type'];
    for (const type of types) {
      if (allowedPartialModelTypes.indexOf(type) !== -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {ServersQueryOptions=} [options={}] Server query options
   * @returns {Server[]} List of servers for method, if defined, or endpoint, if defined, or root level
   */
  _getServers(options = {}) {
    const { endpointId, methodId } = options;
    const { amf } = this;
    if (!amf) {
      return undefined;
    }
    let api = this._computeApi(amf);
    if (Array.isArray(api)) {
      [api] = api;
    }
    if (!api) {
      if (this._isValidServerPartial(amf)) {
        api = amf;
      } else {
        return undefined;
      }
    }

    const serverKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.server);

    const getRootServers = () => /** @type Server[] */ (this[getArrayItems](api, serverKey));
    const getEndpointServers = () => {
      const endpoint = this._computeEndpointModel(api, endpointId);
      const servers = /** @type Server[] */ (this[getArrayItems](endpoint, serverKey));
      if (servers) {
        return servers;
      }
      return getRootServers();
    };
    const getMethodServers = () => {
      const method = this._computeMethodModel(api, methodId);
      const servers = /** @type Server[] */ (this[getArrayItems](method, serverKey));
      if (servers) {
        return servers;
      }
      return getEndpointServers();
    };

    if (methodId) {
      return getMethodServers();
    } if (endpointId) {
      return getEndpointServers();
    }
    return getRootServers();
  }

  /**
   * Computes value for the `expects` property.
   *
   * @param {Operation} method AMF `supportedOperation` model
   * @returns {Request}
   */
  _computeExpects(method) {
    const operationKey = this.ns.aml.vocabularies.apiContract.Operation;
    const expectsKey = this.ns.aml.vocabularies.apiContract.expects;
    if (this._hasType(method, operationKey)) {
      const key = this._getAmfKey(expectsKey);
      const expects = this._ensureArray(method[key]);
      if (expects) {
        return Array.isArray(expects) ? expects[0] : expects;
      }
    }
    return undefined;
  }

  /**
   * Computes list of endpoints from a WebApi model.
   * @param {WebApi} webApi
   * @returns {EndPoint[]|undefined} An array of endpoints.
   */
  _computeEndpoints(webApi) {
    if (!webApi) {
      return [];
    }
    const endpointKey = this.ns.aml.vocabularies.apiContract.endpoint;
    const key = this._getAmfKey(endpointKey);
    return this._ensureArray(webApi[key]);
  }

  /**
   * Computes model for an endpoint documentation.
   *
   * @param {WebApi} webApi Current value of `webApi` property
   * @param {string} id Selected shape ID
   * @returns {EndPoint} An endpoint definition
   */
  _computeEndpointModel(webApi, id) {
    if (this._hasType(webApi, this.ns.aml.vocabularies.apiContract.EndPoint)) {
      return webApi;
    }
    const endpoints = this._computeEndpoints(webApi);
    if (!endpoints) {
      return undefined;
    }
    return endpoints.find((item) => item['@id'] === id);
  }

  /**
   * Computes method for the method documentation.
   *
   * @param {WebApi} webApi Current value of `webApi` property
   * @param {string} selected Selected shape
   * @returns {Operation} A method definition
   */
  _computeMethodModel(webApi, selected) {
    const methods = this.__computeMethodsListForMethod(webApi, selected);
    if (!methods) {
      return undefined;
    }
    return methods.find((item) => item['@id'] === selected);
  }

  /**
   * Computes an endpoint for a method.
   * @param {WebApi} webApi The WebApi AMF model
   * @param {string} methodId Method id
   * @returns {EndPoint|undefined} An endpoint model of undefined.
   */
  _computeMethodEndpoint(webApi, methodId) {
    if (!webApi || !methodId) {
      return undefined;
    }
    if (this._hasType(webApi, this.ns.aml.vocabularies.apiContract.EndPoint)) {
      return webApi;
    }
    const endpoints = this._computeEndpoints(webApi);
    if (!endpoints) {
      return undefined;
    }
    const opKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation);
    for (let i = 0, len = endpoints.length; i < len; i++) {
      const endpoint = endpoints[i];
      let methods = endpoint[opKey];
      if (!methods) {
        continue;
      }
      if (!Array.isArray(methods)) {
        methods = [methods];
      }
      for (let j = 0, jLen = methods.length; j < jLen; j++) {
        if (methods[j]['@id'] === methodId) {
          return endpoint;
        }
      }
    }
    return undefined;
  }

  /**
   * Computes a list of methods for an endpoint that contains a method with
   * given id.
   *
   * @param {WebApi} webApi WebApi model
   * @param {string} methodId Method id.
   * @returns {Operation[]|undefined} A list of sibling methods or undefined.
   */
  __computeMethodsListForMethod(webApi, methodId) {
    const endpoint = this._computeMethodEndpoint(webApi, methodId);
    if (!endpoint) {
      return undefined;
    }
    const opKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation);
    return this._ensureArray(endpoint[opKey]);
  }

  /**
   * Computes a type documentation model.
   *
   * @param {DomainElement[]} declares Current value of `declares` property
   * @param {DomainElement[]} references Current value of `references` property
   * @param {string} selected Selected shape
   * @returns {Shape} A type definition
   */
  _computeType(declares, references, selected) {
    if ((!declares && !references) || !selected) {
      return undefined;
    }
    // In compact model some IDs are presented in long version (in source maps for examples)
    // This must test for this case as well.
    const compactId = selected.replace('amf://id', '');
    let type = declares && declares.find((item) => item['@id'] === selected || item['@id'] === compactId);
    if (!type && references && references.length) {
      for (let i = 0, len = references.length; i < len; i++) {
        if (!this._hasType(references[i], this.ns.aml.vocabularies.document.Module)) {
          continue;
        }
        type = this._computeReferenceType(references[i], selected);
        if (type) {
          break;
        }
      }
    }
    return type;
  }

  /**
   * Finds a type in the model declares and references.
   * @param {string} domainId The domain id of the type (AMF's shape).
   * @returns {Shape|undefined} The AMF shape or undefined when not found.
   */
  [findAmfType](domainId) {
    let { amf } = this;
    if (!amf) {
      return undefined;
    }
    if (Array.isArray(amf)) {
      [amf] = amf;
    }
    const declares = this._computeDeclares(amf);
    const compactId = domainId.replace('amf://id', '');
    if (Array.isArray(declares)) {
      const result = declares.find((item) => item['@id'] === domainId || item['@id'] === compactId);
      if (result) {
        return result;
      }
    }
    return this[findReferenceObject](domainId);
  }

  /**
   * Searches for an object in model's references list.
   * It does not resolve the object (useful for handling links correctly).
   * 
   * @param {string} domainId The domain of the object to find in the references.
   * @returns {DomainElement|undefined} The domain object or undefined.
   */
  [findReferenceObject](domainId) {
    let { amf } = this;
    if (!amf) {
      return undefined;
    }
    if (Array.isArray(amf)) {
      [amf] = amf;
    }
    const references = this._computeReferences(amf);
    if (!Array.isArray(references) || !references.length) {
      return undefined;
    }
    const compactId = domainId.replace('amf://id', '');
    for (let i = 0, len = references.length; i < len; i++) {
      const ref = /** @type AmfDocument */ (references[i]);
      const declares = this._computeDeclares(ref);
      if (!Array.isArray(declares)) {
        continue;
      }
      for (let j = 0, lenDecl = declares.length; j < lenDecl; j++) {
        let declared = declares[j];
        if (Array.isArray(declared)) {
          [declared] = declared;
        }
        if (declared['@id'] === domainId || declared['@id'] === compactId) {
          return declared;
        }
      }
    }
    return undefined;
  }

  /**
   * Computes a type model from a reference (library for example).
   * @param {DomainElement} reference AMF model for a reference to extract the data from
   * @param {string} selected Node ID to look for
   * @returns {Shape|undefined} Type definition or undefined if not found.
   */
  _computeReferenceType(reference, selected) {
    const declare = this._computeDeclares(reference);
    if (!declare) {
      return undefined;
    }
    // In compact model some IDs are presented in long version (in source maps for examples)
    // This must test for this case as well.
    const compactId = selected.replace('amf://id', '');
    let result = declare.find((item) => {
      if (Array.isArray(item)) {
        /* eslint-disable-next-line no-param-reassign */
        [item] = item;
      }
      return item['@id'] === selected || item['@id'] === compactId;
    });
    if (Array.isArray(result)) {
      [result] = result;
    }
    return this._resolve(result);
  }

  /**
   * Computes a documentation model.
   *
   * @param {WebApi} webApi Current value of `webApi` property
   * @param {string} selected Selected shape
   * @returns {DomainElement|undefined}
   */
  _computeDocument(webApi, selected) {
    if (!webApi || !selected) {
      return undefined;
    }
    const key = this._getAmfKey(this.ns.aml.vocabularies.core.documentation);
    const docs = this._ensureArray(webApi[key]);
    return docs && docs.find((item) => item['@id'] === selected);
  }

  /**
   * Resolves a reference to an external fragment.
   *
   * @param {any} shape A shape to resolve
   * @returns {any} Resolved shape.
   */
  _resolve(shape) {
    const {amf} = this;
    if (typeof shape !== 'object' || shape instanceof Array || !amf || shape.__apicResolved) {
      return shape;
    }
    let refKey = this._getAmfKey(this.ns.aml.vocabularies.document.linkTarget);
    let refValue = this._ensureArray(shape[refKey]);
    let refData;
    if (refValue) {
      const rk = refValue[0]['@id'];
      if (rk === shape['@id']) {
        // recursive shape.
        /* eslint-disable-next-line no-param-reassign */
        shape.__apicResolved = true;
        return shape;
      }
      refData = this._getLinkTarget(amf, rk);
    } else {
      refKey = this._getAmfKey(this.ns.aml.vocabularies.document.referenceId);
      refValue = this._ensureArray(shape[refKey]);
      if (refValue) {
        const rk = refValue[0]['@id'];
        if (rk === shape['@id']) {
          // recursive shape.
          /* eslint-disable-next-line no-param-reassign */
          shape.__apicResolved = true;
          return shape;
        }
        refData = this._getReferenceId(amf, rk);
      }
    }
    if (!refData) {
      this._resolveRecursive(shape);
      /* eslint-disable-next-line no-param-reassign */
      shape.__apicResolved = true;
      return shape;
    }
    const copy = { ...refData};
    delete copy['@id'];
    const types = copy['@type'];
    if (types) {
      if (shape['@type']) {
        /* eslint-disable-next-line no-param-reassign */
        shape['@type'] = shape['@type'].concat(types);
      } else {
        /* eslint-disable-next-line no-param-reassign */
        shape['@type'] = types;
      }
      delete copy['@type'];
    }
    this._mergeShapes(shape, copy);
    /* eslint-disable-next-line no-param-reassign */
    shape.__apicResolved = true;
    this._resolveRecursive(shape);
    return shape;
  }

  /**
   * @param {AmfDocument} amf References object to search in
   * @param {string} id Id of the shape to resolve
   * @returns {DomainElement | undefined} Resolved shape for given reference, undefined otherwise
   */
  _getLinkTarget(amf, id) {
    if (!amf || !id) {
      return undefined;
    }
    let target;
    const declares = this._computeDeclares(amf);
    if (declares) {
      target = this._findById(declares, id);
    }
    if (!target) {
      const references = this._computeReferences(amf);
      target = this._obtainShapeFromReferences(references, id)
    }
    if (!target) {
      return undefined;
    }
    // Declaration may contain references
    target = this._resolve(target);
    return target;
  }

  /**
   * Resolves the shape of a given reference.
   *
   * @param {DomainElement[]} references References object to search in
   * @param {string} id Id of the shape to resolve
   * @returns {DomainElement | undefined} Resolved shape for given reference, undefined otherwise
   */
  _obtainShapeFromReferences(references, id) {
    if (!Array.isArray(references) || !references.length) {
      return undefined;
    }
    let target;
    for (let i = 0; i < references.length; i++) {
      const _ref = references[i];
      // case of fragment that encodes the shape
      const encoded = this._computeEncodes(_ref);
      if (encoded && encoded['@id'] === id) {
        target = encoded;
        break;
      }
      // case of a library which declares types
      if (!encoded) {
        target = this._findById(this._computeDeclares(_ref), id);
        if (target) break;
      }
    }
    return target;
  }

  /**
   * Searches a node with a given ID in an array
   *
   * @param {DomainElement[]} array Array to search for a given ID
   * @param {string} id Id to search for
   * @returns {DomainElement | undefined} Node with the given ID when found, undefined otherwise
   */
  _findById(array, id) {
    if (!array) return undefined;
    let target;
    for (let i = 0; i < array.length; i++) {
      const _current = array[i];
      if (_current && _current['@id'] === id) {
        target = _current;
        break;
      }
    }
    return target;
  }

  _getReferenceId(amf, id) {
    if (!amf || !id) {
      return undefined;
    }
    const refs = this._computeReferences(amf);
    if (!refs) {
      return undefined;
    }
    for (let i = 0; i < refs.length; i++) {
      const _ref = refs[i];
      const enc = this._computeEncodes(_ref);
      if (enc) {
        if (enc['@id'] === id) {
          return enc;
        }
      }
    }
    return undefined;
  }

  _resolveRecursive(shape) {
    Object.keys(shape).forEach((key) => {
      const currentShape = shape[key];
      if (currentShape instanceof Array) {
        for (let i = 0, len = currentShape.length; i < len; i++) {
          currentShape[i] = this._resolve(currentShape[i]);
        }
      } else if (typeof currentShape === 'object') {
        /* eslint-disable-next-line no-param-reassign */
        shape[key] = this._resolve(currentShape);
      }
    });
  }

  /**
   * Merge two shapes together. If the resulting shape has one of the "special merge" keys,
   * then the special merge function for that key will be used to match that property
   * @param {any} shapeA AMF node
   * @param {any} shapeB AMF node
   * @returns {*} Merged AMF node
   * @private
   */
  _mergeShapes(shapeA, shapeB) {
    const merged = { ...shapeA, ...shapeB };
    const specialMerges = [
      { key: this._getAmfKey(this.ns.aml.vocabularies.docSourceMaps.sources), merger: this._mergeSourceMapsSources.bind(this) },
    ];
    specialMerges.forEach(({ key, merger }) => {
      if (this._hasProperty(merged, key)) {
        merged[key] = merger(shapeA, shapeB);
      }
    });
    return Object.assign(shapeA, merged);
  }

  /**
   * Obtains source map sources value from two shapes and returns the merged result
   * If neither shape has a sources node, then an empty object will be returned.
   * Result is wrapped in an array as per AMF model standard
   * @param shapeA AMF node
   * @param shapeB AMF node
   * @returns {(*|{})[]} Empty object or resulting merge, wrapped in an array
   * @private
   */
  _mergeSourceMapsSources(shapeA, shapeB) {
    const sourcesKey = this._getAmfKey(this.ns.aml.vocabularies.docSourceMaps.sources);
    let aSources = shapeA[sourcesKey] || {};
    if (Array.isArray(aSources)) {
      /* eslint-disable prefer-destructuring */
      aSources = aSources[0];
    }
    let bSources = shapeB[sourcesKey] || {};
    if (Array.isArray(bSources)) {
      /* eslint-disable prefer-destructuring */
      bSources = bSources[0];
    }
    return [Object.assign(aSources, bSources)];
  }

  /**
   * Expands the key property from compacted mode to full mode.
   * @param {string} value The value to process
   * @returns {string} The expanded value.
   */
  [expandKey](value) {
    let { amf } = this;
    if (!value || typeof value !== 'string' || !amf) {
      return value;
    }
    if (Array.isArray(amf)) {
      [amf] = amf;
    }
    const ctx = amf['@context'];
    if (!ctx) {
      return value;
    }
    const [root, key] = value.split(':');
    if (!root || !key) {
      return value;
    }
    const prefix = ctx[root];
    if (!prefix) {
      return value;
    }
    return `${prefix}${key}`;
  }

  /**
   * Computes a security model from a reference (library for example).
   * @param {string} domainId Domain id of the security requirement to find.
   * @returns {SecurityScheme|undefined} Type definition or undefined if not found.
   */
  findSecurityScheme(domainId) {
    const { amf } = this;
    const declares = this._computeDeclares(amf);
    let result;
    if (declares) {
      result = declares.find((item) => item['@id'] === domainId);
    }
    if (result) {
      result = this._resolve(result);
      return result;
    }
    const references = this._computeReferences(amf);
    if (Array.isArray(references) && references.length) {
      for (const ref of references) {
        if (this._hasType(ref, this.ns.aml.vocabularies.document.Module)) {
          result = this[computeReferenceSecurity](ref, domainId);
          if (result) {
            result = this._resolve(result);
            return result;
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Computes a security model from a reference (library for example).
   * @param {DomainElement} reference AMF model for a reference to extract the data from
   * @param {string} selected Node ID to look for
   * @returns {SecurityScheme|undefined} Type definition or undefined if not found.
   */
  [computeReferenceSecurity](reference, selected) {
    const declare = this._computeDeclares(reference);
    if (!declare) {
      return undefined;
    }
    let result = declare.find((item) => {
      let declared = item;
      if (Array.isArray(declared)) {
        [declared] = declared;
      }
      return declared['@id'] === selected;
    });
    if (Array.isArray(result)) {
      [result] = result;
    }
    return this._resolve(result);
  }
};
