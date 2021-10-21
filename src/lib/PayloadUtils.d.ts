import { ApiTypes } from '@advanced-rest-client/events';
import { ApiPayload } from '../helpers/api';

export interface PayloadInfo {
  value: string|FormData|Blob;
  model?: ApiTypes.ApiType[];
  schemas?: any;
}

export function getPayloadValue(payload: ApiPayload): PayloadInfo;

/**
 * @param id The ApiPayload id.
 * @param value The value to cache.
 * @param model Optional model to set.
 */
export function cachePayloadValue(id: string, value: string, model?: ApiTypes.ApiType[]): void;
/**
 * @param id Payload id to read the value.
 */
export function readCachePayloadValue(id: string): PayloadInfo;
