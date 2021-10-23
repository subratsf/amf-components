import { SelectionType } from '../types';

export interface ApiNavigationEventDetail {
  /**
   * The domain id (graph id) of the selected object.
   */
  domainId: string;
  /**
   *  The type of the selected domain object.
   */
  domainType: SelectionType;
  /**
   * Optional, the parent object domain id (for an operation it is an endpoint)
   */
  parentId?: string;
  /**
   * Whether the selection came from the system processing rather than user interaction.
   */
  passive?: boolean;
}

export declare class ApiNavigationEvent extends CustomEvent<ApiNavigationEventDetail> {
  /**
   * @param domainId The domain id (graph id) of the selected object
   * @param domainType The type of the selected domain object.
   * @param parentId Optional, the parent object domain id (for an operation it is an endpoint)
   * @param passive Whether the selection came from the system processing rather than user interaction.
   */
  constructor(domainId: string, domainType: SelectionType, parentId?: string, passive?: boolean);
}

export declare interface INavigationEvents {
  /**
   * Reads basic info about the API.
   * @param target The node on which to dispatch the event
   * @param domainId The domain id (graph id) of the selected object
   * @param domainType The type of the selected domain object.
   * @param parentId Optional, the parent object domain id (for an operation it is an endpoint)
   * @param passive Whether the selection came from the system processing rather than user interaction.
   */
  apiNavigate(target: EventTarget, domainId: string, domainType: SelectionType, parentId?: string, passive?: boolean): void;
  /**
   * Dispatches an event to inform the application to open a browser window.
   * This is a general purpose action. It has the `detail` object with optional
   * `purpose` property which can be used to support different kind of external navigation.
   * 
   * @param target A node on which to dispatch the event.
   * @param url The URL to open
   * @returns True when the event was cancelled meaning the navigation handled.
   */
  navigateExternal(target: EventTarget, url: string): boolean;
}

export declare const NavigationEvents: Readonly<INavigationEvents>;
