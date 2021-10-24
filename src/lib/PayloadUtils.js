import { ApiExampleGenerator } from '../schema/ApiExampleGenerator.js';
import { ApiMonacoSchemaGenerator } from '../schema/ApiMonacoSchemaGenerator.js';
import { ApiSchemaGenerator } from '../schema/ApiSchemaGenerator.js';

/** @typedef {import('@advanced-rest-client/events').ApiTypes.ApiType} ApiType */
/** @typedef {import('../helpers/api').ApiPayload} ApiPayload */
/** @typedef {import('../helpers/api').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('../helpers/api').ApiAnyShape} ApiAnyShape */
/** @typedef {import('./PayloadUtils').PayloadInfo} PayloadInfo */

/** @type {Map<string, PayloadInfo>} */
const cache = new Map();

/**
 * @param {ApiPayload} payload
 * @returns {PayloadInfo}
 */
export function getPayloadValue(payload) {
  if (cache.has(payload.id)) {
    return cache.get(payload.id);
  }
  const { id, mediaType='text/plain', schema } = payload;
  if (mediaType === 'multipart/form-data') {
    // schema generators don't support this yet,
    const info = /** @type PayloadInfo */ ({ value: new FormData(), schemas: [] });
    cache.set(id, info);
    return info;
  }
  const schemaFactory = new ApiMonacoSchemaGenerator();
  const monacoSchemes = schemaFactory.generate(schema, id);
  let { examples } = payload;
  if (!Array.isArray(examples) || !examples.length) {
    examples = /** @type ApiAnyShape */ (schema).examples;
  }
  if (Array.isArray(examples) && examples.length) {
    const [example] = examples;
    const generator = new ApiExampleGenerator();
    const value = generator.read(example, mediaType);
    const info = { value, schemas: monacoSchemes };
    cache.set(id, info);
    return info;
  }
  // generate values.
  const result = ApiSchemaGenerator.asExample(schema, mediaType, {
    selectedUnions: [],
    renderExamples: true,
    renderOptional: true,
    renderMocked: true,
  });
  if (!result || !result.renderValue) {
    const info = { value: '', schemas: monacoSchemes };
    cache.set(id, info);
    return info;
  }
  const info = { value: result.renderValue, schemas: monacoSchemes };
  cache.set(id, info);
  return info;
}

/**
 * @param {string} id The ApiPayload id.
 * @param {string} value The value to cache.
 * @param {ApiType[]=} model Optional model to set.
 */
export function cachePayloadValue(id, value, model) {
  if (cache.has(id)) {
    const info = cache.get(id);
    info.value = value;
    if (model) {
      info.model = model;
    }
    return;
  }
  cache.set(id, { value, model });
}

/**
 * @param {string} id Payload id to read the value.
 * @returns {PayloadInfo}
 */
export function readCachePayloadValue(id) {
  return cache.get(id);
}
