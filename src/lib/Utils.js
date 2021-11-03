import { HeadersParser } from '@advanced-rest-client/base/api.js';
import sanitizer from 'dompurify';
import { ns } from '../helpers/Namespace.js';

/** @typedef {import('../helpers/api').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('../helpers/api').ApiScalarShape} ApiScalarShape */
/** @typedef {import('../helpers/api').ApiArrayShape} ApiArrayShape */
/** @typedef {import('../helpers/api').ApiTupleShape} ApiTupleShape */
/** @typedef {import('../helpers/api').ApiUnionShape} ApiUnionShape */
/** @typedef {import('../helpers/api').ApiParameter} ApiParameter */
/** @typedef {import('../helpers/api').ApiPropertyShape} ApiPropertyShape */
/** @typedef {import('../helpers/api').ApiNodeShape} ApiNodeShape */
/** @typedef {import('../helpers/api').ApiAnyShape} ApiAnyShape */
/** @typedef {import('../helpers/api').ApiServer} ApiServer */
/** @typedef {import('../helpers/api').ApiParametrizedDeclaration} ApiParametrizedDeclaration */
/** @typedef {import('../types').OperationParameter} OperationParameter */

/**
 * Stops an event and cancels it.
 * @param {Event} e The event to stop
 */
export function cancelEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
}

/**
 * @param {string[]} types Shape's types
 */
export function isScalarType(types=[]) {
  const { shapes } = ns.aml.vocabularies;
  return types.includes(shapes.ScalarShape) || 
    types.includes(shapes.NilShape) ||
    types.includes(shapes.FileShape);
}

/**
 * @param {string} value The value from the graph model to use to read the value from
 */
export function schemaToType(value) {
  const typed = String(value);
  let index = typed.lastIndexOf('#');
  if (index === -1) {
    index = typed.lastIndexOf('/');
  }
  let v = typed.substr(index + 1);
  if (v) {
    v = `${v[0].toUpperCase()}${v.substr(1)}`
  }
  return v;
}

/**
 * Reads the label for a data type for a shape union.
 * @param {ApiShapeUnion} schema
 * @param {boolean=} [isArray] Used internally
 * @returns {string|undefined} Computed label for a shape.
 */
export function readPropertyTypeLabel(schema, isArray=false) {
  if (!schema) {
    return undefined;
  }
  const { types } = schema;
  if (types.includes(ns.aml.vocabularies.shapes.NilShape)) {
    return 'Nil';
  }
  if (types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
    const scalar = /** @type ApiScalarShape */ (schema);
    return schemaToType(scalar.dataType || '');
  }
  if (types.includes(ns.aml.vocabularies.shapes.TupleShape)) {
    const array = /** @type ApiTupleShape */ (schema);
    if (!array.items || !array.items.length) {
      return undefined;
    }
    const label = readPropertyTypeLabel(array.items[0], true);
    return `List of ${label}`;
  }
  if (types.includes(ns.aml.vocabularies.shapes.ArrayShape)) {
    const array = /** @type ApiArrayShape */ (schema);
    if (!array.items) {
      return undefined;
    }
    let label = readPropertyTypeLabel(array.items, true);
    if (label === 'items' && !isScalarType(array.items.types)) {
      label = 'objects';
    }
    return `List of ${label}`;
  }
  if (types.includes(ns.w3.shacl.NodeShape)) {
    let { name } = /** @type ApiNodeShape */ (schema);
    const { properties } = /** @type ApiNodeShape */ (schema);
    if (isArray && properties && properties.length === 1) {
      const potentialScalar = /** @type ApiScalarShape */ (properties[0].range);
      if (potentialScalar.types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
        return schemaToType(potentialScalar.dataType || '');
      }
    }
    if (name === 'type') {
      // AMF seems to put `type` value into a property that is declared inline (?).
      name = undefined;
    }
    return name || 'Object';
  }
  if (types.includes(ns.aml.vocabularies.shapes.UnionShape)) {
    const union = /** @type ApiUnionShape */ (schema);
    const items = union.anyOf.map(i => readPropertyTypeLabel(i));
    return items.join(' or ');
  }
  if (types.includes(ns.aml.vocabularies.shapes.FileShape)) {
    return 'File';
  }
  return schema.name || 'Unknown';
}

/**
 * @param {ApiShapeUnion[]} shapes
 * @returns {boolean} true when all of passed shapes are scalar.
 */
function isAllScalar(shapes=[]) {
  return !shapes.some(i => !isScalarType(i.types));
}

/**
 * @param {ApiUnionShape} shape
 * @returns {boolean} true when the passed union type consists of scalar values only. Nil counts as scalar.
 */
export function isScalarUnion(shape) {
  const { anyOf=[], or=[], and=[], xone=[] } = shape;
  if (anyOf.length) {
    return isAllScalar(anyOf);
  }
  if (or.length) {
    return isAllScalar(or);
  }
  if (and.length) {
    return isAllScalar(and);
  }
  if (xone.length) {
    return isAllScalar(xone);
  }
  return true;
}

/**
 * @param {string} HTML 
 * @returns {string}
 */
export function sanitizeHTML(HTML) {
  const result = sanitizer.sanitize(HTML, { 
    ADD_ATTR: ['target', 'href'],
    ALLOWED_TAGS: ['a'],
    USE_PROFILES: {html: true},
  });

  if (typeof result === 'string') {
    return result;
  }

  // @ts-ignore
  return result.toString();
}

/**
 * @param {ApiParametrizedDeclaration[]} traits
 */
export function joinTraitNames(traits) {
  const names = traits.map(trait => trait.name).filter(i => !!i);
  let value = '';
  if (names.length === 2) {
    value = names.join(' and ');
  } else if (value.length > 2) {
    const last = names.pop();
    value = names.join(', ');
    value += `, and ${last}`;
  } else {
    value = names.join(', ');
  }
  return value;
}

/**
 * @param {Record<string, any>} params
 * @returns {string}
 */
 export function generateHeaders(params) {
  if (typeof params !== 'object') {
    return '';
  }
  const lines = Object.keys(params).map((name) => {
    let value = params[name];
    if (value === undefined) {
      value = '';
    } else if (Array.isArray(value)) {
      value = value.join(',');
    } else {
      value = String(value);
    }
    let result = `${name}: `;
    value = value.split('\n').join(' ');
    result += value;
    return result;
  });
  return lines.join('\n');
}

/**
 * Ensures the headers have content type header.
 * @param {string} headers The generated headers string
 * @param {string} mime The expected by the selected payload media type. If not set then it does nothing.
 */
export function ensureContentType(headers, mime) {
  if (!mime) {
    return headers;
  }
  const list = HeadersParser.toJSON(headers);
  const current = HeadersParser.contentType(list);
  if (!current && mime) {
    list.push({ name: 'content-type', value: mime, enabled: true });
  }
  return HeadersParser.toString(list);
}

/**
 * @param {ApiParameter} parameter
 * @param {ApiShapeUnion} schema
 * @returns {string} The name to use in the input.
 */
export function readLabelValue(parameter, schema) {
  let label = parameter.paramName || schema.displayName || parameter.name ||  schema.name;
  const { required } = parameter;
  if (required) {
    label += '*';
  }
  return label;
}
