import { LitElement, TemplateResult } from 'lit-element';
import { ApiServer } from '../helpers/api';
import { ServerType, SelectionType } from '../types';

export const domainIdValue: unique symbol;
export const domainTypeValue: unique symbol;
export const debounceValue: unique symbol;
export const processDebounce: unique symbol;
export const customNodesCount: unique symbol;
export const allowCustomValue: unique symbol;
export const baseUriValue: unique symbol;
export const valueValue: unique symbol;
export const customItems: unique symbol;
export const serversValue: unique symbol;
export const onServersCountChangeValue: unique symbol;
export const onApiServerChange: unique symbol;
export const getServerIndexByUri: unique symbol;
export const getSelectionInfo: unique symbol;
export const getExtraServers: unique symbol;
export const resetSelection: unique symbol;
export const updateServerSelection: unique symbol;
export const notifyServersCount: unique symbol;
export const setValue: unique symbol;
export const customUriChangeHandler: unique symbol;
export const selectionChangeHandler: unique symbol;
export const childrenHandler: unique symbol;
export const dropDownOpenedHandler: unique symbol;
export const listboxItemsHandler: unique symbol;
export const slotTemplate: unique symbol;
export const selectorTemplate: unique symbol;
export const selectorListTemplate: unique symbol;
export const serverListTemplate: unique symbol;
export const serverListItemTemplate: unique symbol;
export const customUriTemplate: unique symbol;
export const customUriInputTemplate: unique symbol;
export const graphChangeHandler: unique symbol;
export const queryServers: unique symbol;

/**
 * An element that renders a selection of servers defined in AMF graph model for an API.
 *
 * This component receives an AMF model, and selected node's id and type
 * to know which servers to render
 *
 * When the selected server changes, it dispatches an `api-server-changed`
 * event, with the following details:
 * - Server value: the server id (for listed servers in the model), the URI
 *    value (when custom base URI is selected), or the value of the `anypoint-item`
 *    component rendered into the extra slot
 * - Selected type: `server` | `custom` | `extra`
 *    - `server`: server from the AMF model
 *    - `custom`: custom base URI input change
 *    - `extra`: extra slot's anypoint-item `value` attribute (see below)
 *
 * Adding extra slot:
 * This component renders a `slot` element to render anything the users wants
 * to add in there. To enable this, sit the `extraOptions` value in this component
 * to true, and render an element associated to the slot name `custom-base-uri`.
 * The items rendered in this slot should be `anypoint-item` components, and have a
 * `value` attribute. This is the value that will be dispatched in the `api-server-changed`
 * event.
 * 
 * @fires serverscountchanged
 * @fires apiserverchanged
 */
export default class ApiServerSelectorElement extends LitElement {
  /**
   * The baseUri to override any server definition
   * @attribute
   */
  baseUri: string;

  /**
   * When set the `Custom base URI` is rendered in the dropdown
   * @attribute
   */
  allowCustom: boolean;

  /**
   * The current list of servers to render
   */
  servers: ApiServer[];

  /**
   * Currently selected type of the input.
   * `server` | `extra` | `custom`
   * @attribute
   */
  type: ServerType;

  /**
   * Current value of the server
   * @attribute
   */
  value: string;

  /**
   * Enables outlined material theme
   * @attribute
   */
  outlined: boolean;

  /**
   * Enables Anypoint platform styles.
   * @attribute
   */
  anypoint: boolean;

  /**
   * When set it automatically selected the first server from the list
   * of servers when selection is missing.
   * @attribute
   */
  autoSelect: boolean;

  /**
   * A programmatic access to the opened state of the drop down.
   * Note, this does nothing when custom element is rendered.
   * @attribute
   */
  opened: boolean;

  /**
   * An `@id` of selected AMF shape.
   * When changed, it computes servers for the selection
   * @attribute
   */
  domainId: string;
  /**
   * The type of the selected AMF shape.
   * When changed, it computes servers for the selection
   * @attribute
   */
  domainType: SelectionType;
  /**
   * @returns Computed list of all URI values from both the servers
   * and the list of rendered custom items.
   */
  get serverValues(): string[];

  /**
   * @returns True if selected type is "custom" type.
   */
  get isCustom(): boolean;

  /**
   * Checks whether the current value is a custom value related to current list of servers.
   * @returnS True if the value is not one of the server values or custom
   * servers.
   */
  get isValueCustom(): boolean;

  /**
   * @returns Previously registered callback function for
   * the `api-server-changed` event.
   */
  get onapiserverchange(): EventListener|null;

  /**
   * @param value A callback function to be called
   * when `api-server-changed` event is dispatched.
   */
  set onapiserverchange(value: EventListener);

  /**
   * @returns Previously registered callback function for
   * the `servers-count-changed` event.
   */
  get onserverscountchange(): EventListener|null;

  /**
   * @param value A callback function to be called
   * when `servers-count-changed` event is dispatched.
   */
  set onserverscountchange(value: EventListener);

  /**
   * @returns Total number of list items being rendered.
   */
  get serversCount(): number;
  /** 
     * The timeout after which the `queryGraph()` function is called 
     * in the debouncer.
     */
  queryDebouncerTimeout: number;

  // /**
  //  * Async function to set value after component has finished updating
  //  */
  // [setValue](value: string): Promise<void>;
  // /**
  //  * Receives shape id and shape type, and looks for endpointId
  //  * if the type is 'endpoint'
  //  * @param id AMF shape id
  //  * @param type AMF shape type
  //  */
  // [processShapeChange](id: string, type: ServerType): void;

  // /**
  //  * Computes the endpoint id based on a given method id
  //  * Returns undefined is endpoint is not found
  //  * @param methodId The AMF id of the method
  //  */
  // [getEndpointIdForMethod](methodId: string): string|undefined;

  // /**
  //  * Dispatches the `servers-count-changed` event with the current number of rendered servers.
  //  */
  // [notifyServersCount](): void;

  // /**
  //  * A handler called when slotted number of children change.
  //  * It sets the `[customNodesCount]` property with the number of properties
  //  * and notifies the change.
  //  */
  // [childrenHandler](): void;

  /**
   * Queries for the current API server data from the store.
   */
  processGraph(): Promise<void>;

  /**
   * Executes auto selection logic.
   * 
   * @param preferred The value that should be selected when possible.
   */
  selectIfNeeded(preferred?: string): void;

  // /**
  //  * Collects information about selection from the current value.
  //  * @param value Current value for the server URI.
  //  * @returns A selection info object
  //  */
  // [getSelectionInfo](value?: string): SelectionInfo;

  // /**
  //  * Takes care of recognizing whether a server selection should be cleared.
  //  * This happens when list of servers change and with the new list of server
  //  * current selection does not exist.
  //  * This ignores the selection when current type is not a `server`.
  //  *
  //  * @param servers List of new servers
  //  */
  // [updateServerSelection](servers: ApiServer[]): void;

  // /**
  //  * @param servers List of current servers
  //  * @param value The value to look for
  //  * @returns The index of found server or -1 if none found.
  //  */
  // [getServerIndexByUri](servers: ApiServer[], value: string): number;

  // /**
  //  * Handler for the listbox's change event
  //  */
  // [selectionChangeHandler](e: CustomEvent): void;

  // /**
  //  * Retrieves custom base uris elements assigned to the
  //  * custom-base-uri slot
  //  *
  //  * @returns Elements assigned to custom-base-uri slot
  //  */
  // [getExtraServers](): Element[];

  // /**
  //  * Handler for the input field change.
  //  */
  // [customUriChangeHandler](e: Event): void;

  // /**
  //  * Resets current selection to a default value.
  //  */
  // [resetSelection](): void;

  // /**
  //  * Handler for the drop down's `opened-changed` event. It sets local value
  //  * for the opened flag.
  //  */
  // [dropDownOpenedHandler](e: CustomEvent): void;

  // /**
  //  * Updates list of custom items rendered in the selector.
  //  */
  // [listboxItemsHandler](e: CustomEvent): void;

  render(): TemplateResult;

  // /**
  //  * @returns Template result for the custom input.
  //  */
  // [customUriInputTemplate](): TemplateResult;

  // /**
  //  * @returns Template result for the drop down element.
  //  */
  // [selectorTemplate](): TemplateResult;

  // /**
  //  * Call the render functions for
  //  * - Server options (from AMF Model)
  //  * - Custom URI option
  //  * - Extra slot
  //  * @returns The combination of all options
  //  */
  // [selectorListTemplate](): TemplateResult;

  // /**
  //  * @returns The template for the custom URI list item.
  //  */
  // [customUriTemplate](): TemplateResult|string;

  // /**
  //  * @returns Template result for the drop down list options for current servers
  //  */
  // [serverListTemplate](): TemplateResult[]|string;

  // /**
  //  * @param server The server definition
  //  * @returns The template for a server list item.
  //  */
  // [serverListItemTemplate](server: ApiServer): TemplateResult;

  // /**
  //  * @returns Template result for the `slot` element
  //  */
  // [slotTemplate](): TemplateResult;
}
