import { ServerType } from '../types';
import { ServersQueryOptions, ApiServer } from '../helpers/api';

export interface ServerChangeEventDetail {
  /**
   * The server id (for listed servers in the model), the URI value (when custom base URI is selected), or the `data-value` of the `anypoint-item` attribute rendered into the extra slot.
   */
  value: string;
  /**
   * The changed server type.
   */
  type: ServerType;
}

export interface ServerCountChangeEventDetail {
  /**
   * @param count The number of servers rendered in the selector.
   */
  value: number;
}

/**
 * The event dispatched when a server selection change.
 */
export class ServerChangeEvent extends CustomEvent<ServerChangeEventDetail> {
  /**
   * @param value The server id (for listed servers in the model), the URI value (when custom base URI is selected), or the `data-value` of the `anypoint-item` attribute rendered into the extra slot.
   * @param type The changed server type.
   */
  constructor(value: string, type: ServerType);
}

/**
 * The event dispatched when a server count change. This happens when the server selector discover a change in the number of available servers.
 */
export class ServerCountChangeEvent extends CustomEvent<ServerCountChangeEventDetail> {
  /**
   * @param count The number of servers rendered in the selector.
   */
  constructor(count: number);
}

interface IServerEvents {
  /** 
   * @param target The node on which to dispatch the event.
   * @param value The server id (for listed servers in the model), the URI value (when custom base URI is selected), or the `data-value` of the `anypoint-item` attribute rendered into the extra slot.
   * @param type The changed server type.
   */
  serverChange(target: EventTarget, value: string, type: ServerType): void;
  /** 
   * @param target The node on which to dispatch the event.
   * @param count The number of servers rendered in the selector.
   */
  serverCountChange(target: EventTarget, count: number): void;
  /**
   * Queries for the list of servers for method, if defined, or endpoint, if defined, or root level 
   * @param target The node on which to dispatch the event.
   * @param query Server query options. When omitted then queries for root servers only.
   * @returns The list of servers for given query.
   */
  query(target: EventTarget, query?: ServersQueryOptions): Promise<ApiServer[]>;
}

export const ServerEvents: IServerEvents;
