import { ApiSecurityScheme, ApiSecurityRequirement } from '../helpers/api';
import { ApiSecuritySchemeListItem } from '../types';

declare interface ISecurityEvents {
  /**
   * Reads a Security definition from the store.
   * Note, do not use this method to read the definition of a security scheme applied to an endpoint or operation.
   * For that use `getRequirement()` instead.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  get(target: EventTarget, id: string): Promise<ApiSecurityScheme>;
  /**
   * Reads a security requirement for an endpoint or operation.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRequirement(target: EventTarget, id: string): Promise<ApiSecurityRequirement>;
  /**
   * Lists the security definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiSecuritySchemeListItem[]>;
  /** 
   * Dispatched to inform about security settings change.
   * @param target The node on which to dispatch the event
   * @param settings The settings to apply.
   */
  settingsChanged(target: EventTarget, settings: unknown): void;
}

export declare const SecurityEvents: Readonly<ISecurityEvents>;
