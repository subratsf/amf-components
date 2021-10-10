import {LitElement, TemplateResult} from 'lit-element';
import { AmfHelperMixin } from '../helpers/AmfHelperMixin';
import { EndPoint } from '../helpers/amf';
import { MethodItem, EndpointItem, SecurityItem, TypeItem, DocumentationItem, TargetModel, NavigationItem, SelectionType } from '../types';

export const collectData: unique symbol;
export const queryValue: unique symbol;
export const queryDebouncer: unique symbol;
export const hasPassiveSelection: unique symbol;
export const getFilteredType: unique symbol;
export const docsValue: unique symbol;
export const typesValue: unique symbol;
export const securityValue: unique symbol;
export const endpointsValue: unique symbol;
export const endpointsTemplate: unique symbol;
export const documentationTemplate: unique symbol;
export const typesTemplate: unique symbol;
export const securityTemplate: unique symbol;
export const overviewTemplate: unique symbol;
export const endpointPathTemplate: unique symbol;
export const endpointTemplate: unique symbol;
export const methodTemplate: unique symbol;
export const documentationItemTemplate: unique symbol;
export const isFragmentValue: unique symbol;
export const selectedItemValue: unique symbol;
export const updatedOpenedOperations: unique symbol;
export const domainIdValue: unique symbol;
export const domainTypeValue: unique symbol;
export const selectedChanged: unique symbol;
export const selectionChanged: unique symbol;
export const operationsOpened: unique symbol;
export const shiftTabPressed: unique symbol;
export const focusedItemPrivate: unique symbol;
export const focusedItemValue: unique symbol;
export const summaryTemplate: unique symbol;
export const itemClickHandler: unique symbol;
export const queryChanged: unique symbol;
export const flushQuery: unique symbol;
export const rearrangeEndpointsValue: unique symbol;
export const renderFullPathsValue: unique symbol;
export const itemsValue: unique symbol;
export const resetTabindices: unique symbol;
export const navigationHandler: unique symbol;
export const focusHandler: unique symbol;
export const keydownHandler: unique symbol;
export const collectSecurityData: unique symbol;
export const collectDocumentationData: unique symbol;
export const collectTypeData: unique symbol;
export const traverseDeclarations: unique symbol;
export const traverseReferences: unique symbol;
export const traverseEncodes: unique symbol;
export const rearrangeEndpoints: unique symbol;
export const closeCollapses: unique symbol;
export const appendSecurityItem: unique symbol;
export const appendTypeItem: unique symbol;
export const validUrl: unique symbol;
export const appendDocumentationItem: unique symbol;
export const appendEndpointItem: unique symbol;
export const appendModelItem: unique symbol;
export const createOperationModel: unique symbol;
export const toggleSectionHandler: unique symbol;
export const toggleSection: unique symbol;
export const selectItem: unique symbol;
export const addSelection: unique symbol;
export const clearSelection: unique symbol;
export const cleanPassiveSelection: unique symbol;
export const handlePassiveNavigation: unique symbol;
export const selectMethodPassive: unique symbol;
export const toggleEndpoint: unique symbol;
export const toggleEndpointDocumentation: unique symbol;
export const toggleEndpointButton: unique symbol;
export const computeEndpointPadding: unique symbol;
export const computeEndpointPaddingLeft: unique symbol;
export const computeMethodPadding: unique symbol;
export const computeOperationPaddingLeft: unique symbol;
export const getFilteredEndpoints: unique symbol;
export const listActiveItems: unique symbol;
export const listSectionActiveNodes: unique symbol;
export const onUpKey: unique symbol;
export const onDownKey: unique symbol;
export const onEscKey: unique symbol;
export const onSpace: unique symbol;
export const onShiftTabDown: unique symbol;

/**
 * Computes label for an endpoint when name is missing and the endpoint
 * is indented, hence name should be truncated.
 *
 * @param currentPath Endpoint's path
 * @param parts Path parts
 * @param indent Endpoint indentation
 * @param basePaths List of base paths already used.
 * @returns Name of the path to render.
 */
export declare function computePathName(currentPath: string, parts: string[], indent: number, basePaths: Array<string>): string;


/**
 * Computes condition value to render path label.
 *
 * @param allowPaths Component configuration property.
 * @param renderPath Endpoint property
 * @returns True if both arguments are truly.
 */
export declare function computeRenderPath(allowPaths: boolean, renderPath: boolean): boolean;

/**
 * `api-navigation`
 * A navigation for an API spec using AMF model.
 *
 * This element is to replace deprecated `raml-path-selector`.
 * It is lightweight and much less complex in comparison.
 *
 * The element works with [AMF](https://github.com/mulesoft/amf)
 * json/ld model. When the model is set it computes list of documentation
 * nodes, types, endpoints, methods and security schemas.
 * As a result user can select any of the items in the UI and the application
 * is informed about user choice via custom event.
 *
 * The selection is a selected API shape `@id`. The application is responsible
 * for computing the model selected by the user.
 *
 * Note, this element does not contain polyfills for Array platform features.
 * Use `arc-polyfills` to add support for IE and Safari 9.
 *
 * ## Passive navigation
 *
 * Passive navigation means that a navigation event occurred but it wasn't
 * invoked by intentional user interaction. For example
 * `api-endpoint-documentation` component renders list of documentations for
 * HTTP methods. While scrolling through the list navigation context
 * changes (user reads documentation of a method) but the navigation never
 * was caused by user intentional interaction.
 * This event, annotated with `passive: true` property in the detail object
 * prohibits other element from taking a navigation action but some
 * may reflect the change in the UI.
 * 
 * @fires apinavigate
 */
export default class ApiNavigationElement extends AmfHelperMixin(LitElement) {
  [queryValue]: string;
  [queryDebouncer]: boolean;
  [hasPassiveSelection]: boolean;
  [selectedItemValue]: HTMLElement;
  [domainIdValue]: string;
  [domainTypeValue]: string;
  [operationsOpened]: boolean;
  [shiftTabPressed]: boolean;
  [rearrangeEndpointsValue]: boolean;
  [renderFullPathsValue]: boolean;
  [focusedItemPrivate]: HTMLElement;
  [focusedItemValue]: HTMLElement;
  [itemsValue]: Element[];
  /**
   * A model `@id` of selected documentation part.
   * Special case is for `summary` view. It's not part of an API
   * but most applications has some kins of summary view for the
   * API.
   * @attribute
   */
  domainId: string;

  /**
   * Type of the selected item.
   * One of `documentation`, `type`, `security`, `endpoint`, `method`
   * or `summary`.
   *
   * This property is set after `domainId` property.
   * @attribute
   */
  domainType: SelectionType;

  /**
   * If set it renders `API summary` menu option.
   * It will allow to set `domainId` and `domainType` to `summary`
   * when this option is set.
   * @attribute
   */
  summary: boolean;

  /**
   * A label for the `summary` section.
   * @default "Summary"
   * @attribute
   */
  summaryLabel: string;

  /**
   * Computed list of documentation items in the API.
   */
  [docsValue]: DocumentationItem[];

  /**
   * Determines and changes state of documentation panel.
   * @attribute
   */
  docsOpened: boolean;

  /**
   * Computed list of "type" items in the API.
   */
  [typesValue]: TypeItem[];

  /**
   * Determines and changes state of types panel.
   * @attribute
   */
  typesOpened: boolean;

  /**
   * Computed list of Security schemes items in the API.
   */
  [securityValue]: SecurityItem[];

  /**
   * Determines and changes state of security panel.
   * @attribute
   */
  securityOpened: boolean;

  /**
   * Computed list of endpoint items in the API.
   */
  [endpointsValue]: EndpointItem[];

  /**
   * Determines and changes state of endpoints panel.
   * @attribute
   */
  endpointsOpened: boolean;

  /**
   * If true, the element will not produce a ripple effect when interacted with via the pointer.
   * @attribute
   */
  noink: boolean;

  /**
   * Filters list elements by this value when set.
   * Clear the value to reset the search.
   *
   * This is not currently exposed in element's UI due
   * to complexity of search and performance.
   * @attribute
   */
  query: string;

  /**
   * Size of endpoint indentation for nested resources.
   * In pixels.
   *
   * The attribute name for this property is `indent-size`. Note, that this
   * will change to web consistent name `indentSize` in the future.
   * @attribute
   */
  indentSize: number;

  /**
   * Flag set when passed AMF model is a RAML fragment.
   */
  [isFragmentValue]: boolean;

  /**
   * When set it renders full path below endpoint name if the endpoint has
   * a name (different than the path).
   * This is not always recommended to use this option as some complex APIs
   * may render this component difficult to understand.
   * @attribute
   */
  allowPaths: boolean;

  /**
   * If this value is set, then the navigation component will sort the list
   * of endpoints based on the `path` value of the endpoint, keeping the order
   * of which endpoint was first in the list, relative to each other
   * @attribute
   */
  rearrangeEndpoints: boolean;

  /**
   * Enables compatibility with Anypoint components.
   * @attribute
   */
  compatibility: boolean;

  /**
   * Determines and changes state of endpoints.
   * @attribute
   */
  operationsOpened: boolean;

  /**
   * No overview as a separated element. Overview can be seen by clicking the endpoint label.
   * @attribute
   */
  noOverview: boolean;

  /**
   * When set, avoids truncating and indentation of endpoint paths.
   * Instead, the full path for each endpoint will be rendered.
   * @attribute
   */
  renderFullPaths: boolean;

  /**
   * true when `[docsValue]` property is set with values
   */
  get hasDocs(): boolean;

  /**
   * true when `[typesValue]` property is set with values
   */
  get hasTypes(): boolean;

  /**
   * true when `[securityValue]` property is set with values
   */
  get hasSecurity(): boolean;

  /**
   * true when `[endpointsValue]` property is set with values
   */
  get hasEndpoints(): boolean;
  /**
   * True when summary should be rendered.
   * Summary should be rendered only when `summary` is set and
   * current model is not a RAML fragment.
   */
  get summaryRendered(): boolean;

  /**
   * The currently selected item.
   */
  get selectedItem(): HTMLElement;
  /**
   * The currently focused item.
   */
  get focusedItem(): HTMLElement;

  /**
   * Ensures aria role attribute is in place.
   * Attaches element's listeners.
   */
  connectedCallback(): void;
  disconnectedCallback(): void;

  /**
   * Collects the information about the API and creates data model
   * for the navigation element
   *
   * @returns Data model for the API navigation
   */
  [collectData](model: object): TargetModel;

  /**
   * Collects the data from the security fragment
   *
   * @param model Security fragment model
   */
  [collectSecurityData](model: object): TargetModel|undefined;

  /**
   * Collects the data from the documentation fragment
   *
   * @param model Documentation fragment model
   */
  [collectDocumentationData](model: object): TargetModel|undefined;

  /**
   * Collects the data from the type fragment
   *
   * @param model Type fragment model
   */
  [collectTypeData](model: object): TargetModel|undefined;

  /**
   * Traverses the `http://raml.org/vocabularies/document#declares`
   * node to find types and security schemes.
   *
   * @param target Target object where to put data.
   */
  [traverseDeclarations](model: object, target: TargetModel): void;

  /**
   * Traverses the `http://raml.org/vocabularies/document#references`
   *
   * @param model AMF model
   * @param target Target object where to put data.
   */
  [traverseReferences](model: object, target: TargetModel): void;

  /**
   * Traverses the `http://raml.org/vocabularies/document#encodes`
   * node to find documentation and endpoints.
   *
   * @param target Target object where to put data.
   */
  [traverseEncodes](model: object, target: TargetModel): void;

  /**
   * Sort endpoints alphabetically based on path
   */
  [rearrangeEndpoints](endpoints: EndPoint[]): EndPoint[];

  /**
   * Appends declaration of navigation data model to the target if
   * it matches documentation or security types.
   */
  [appendModelItem](item: object, target: TargetModel): void;

  /**
   * Appends "type" item to the results.
   *
   * @param item Type item declaration
   */
  [appendTypeItem](item: object, target: TargetModel): void;

  /**
   * Appends "security" item to the results.
   *
   * @param item Type item declaration
   */
  [appendSecurityItem](item: object, target: TargetModel): void;

  /**
   * Appends "documentation" item to the results.
   *
   * @param item Type item declaration
   */
  [appendDocumentationItem](item: object, target: TargetModel): void;

  /**
   * Appends "endpoint" item to the results.
   * This also iterates over methods to extract method data.
   *
   * @param item Endpoint item declaration
   */
  [appendEndpointItem](item: object, target: TargetModel): void;

  /**
   * Creates the view model for an operation.
   *
   * @param item Operation AMF model
   * @returns Method view model
   */
  [createOperationModel](item: object): MethodItem;

  /**
   * Click handler for section name item.
   * Toggles the view.
   */
  [toggleSectionHandler](e: MouseEvent): void;
  [toggleSection](node: HTMLElement): void;

  /**
   * Selects new item in the menu.
   */
  [selectItem](node: HTMLElement): void;

  /**
   * Toggles selection state of a node that has `data-api-id` set to
   * `id`.
   *
   * @param id Selected node id.
   * @returns Type of selected node.
   */
  [addSelection](id: string): string|undefined;

  /**
   * Removes any current selection that may exist.
   */
  [clearSelection](): void;

  /**
   * Toggles endpoint operations list.
   *
   * @param id ID of the endpoint.
   */
  toggleOperations(id: string): void;

  /**
   * Updates the state of selected element when `domainId` changes.
   *
   * @param current New selection
   */
  [selectedChanged](current: string): void;

  /**
   * When `query` property change it runs the filter function
   * in a debouncer set for ~50 ms.
   */
  [queryChanged](): void;

  /**
   * Calls `render()` function on each data repeater that have filterable
   * items.
   * It set's `__effectiveQuery` property on the element that is beyond
   * Polymer's data binding system so it skips 2 function calls each time
   * it is read. In a repeater filter function that can be a lot.
   *
   * Also the `__effectiveQuery` is transformed to perform text search.
   */
  [flushQuery](): void;

  /**
   * Dispatches the navigation event on selection change.
   *
   * @param selected Selected id
   * @param selectedType Type of AMF shape
   */
  [selectionChanged](selected: string, selectedType: string): void;

  /**
   * Navigation item click handler.
   * It used to be common function for all clicks inside the element
   * but in tests not all events were handled.
   */
  [itemClickHandler](e: MouseEvent): void;

  /**
   * Handler for the navigation event. Updates the selection
   * if dispatched from other element.
   */
  [navigationHandler](e: CustomEvent): void;
  [handlePassiveNavigation](detail: object): void;
  [cleanPassiveSelection](): void;
  [selectMethodPassive](id: string): void;

  /**
   * Endpoint label click handler.
   * Toggles endpoint's methods list.
   */
  [toggleEndpoint](e: MouseEvent): void;

  /**
   * Computes `style` attribute value for endpoint item.
   * It sets padding-left property to indent resources.
   * See https://github.com/mulesoft/api-console/issues/571.
   *
   * @param factor Computed indent factor for the resource
   * @param size The size of indentation in pixels.
   * @returns Style attribute value for the item.
   */
  [computeEndpointPadding](factor: Number, size: Number): String;
  [computeMethodPadding](factor: Number, size: Number): string;

  /**
   * Computes operation list item left padding from CSS variables.
   */
  [computeOperationPaddingLeft](): Number;

  /**
   * Computes endpoint list item left padding from CSS variables.
   */
  [computeEndpointPaddingLeft](): Number;

  /**
   * Returns filtered list of items to render in the menu list.
   * When `query` is set it tests `label` property of each item if it contains
   * the query. Otherwise it returns all items.
   *
   * @param prop Name of the source property keeping array values to render.
   */
  [getFilteredType](prop: NavigationItem[]): NavigationItem[]|undefined;

  /**
   * Returns a list of endpoints to render.
   * When `query` is set it returns filtered list of endpoints for given query.
   * Otherwise it returns all endpoints.
   *
   * @returns Filtered list of endpoints
   */
  [getFilteredEndpoints](): EndpointItem[]|undefined;

  /**
   * Closes all `iron-collapse` elements
   */
  [closeCollapses](): void;

  /**
   * A handler for the focus event on this element.
   */
  [focusHandler](e: FocusEvent): void;

  /**
   * Focuses on the previous item in the navigation.
   */
  focusPrevious(): void;

  /**
   * Focuses on the next item in the navigation.
   */
  focusNext(): void;

  /**
   * Resets all tabindex attributes to the appropriate value based on the
   * current selection state. The appropriate value is `0` (focusable) for
   * the default selected item, and `-1` (not keyboard focusable) for all
   * other items. Also sets the correct initial values for aria-selected
   * attribute, true for default selected item and false for others.
   */
  [resetTabindices](): void;

  /**
   * Lists all HTML elements that are currently rendered in the view.
   * @returns Currently rendered items.
   */
  [listActiveItems](): Element[];

  /**
   * @param selector The prefix for the query selector
   * @returns Nodes returned from query function.
   */
  [listSectionActiveNodes](selector: string): Element[];

  /**
   * Handler for the keydown event.
   */
  [keydownHandler](e: KeyboardEvent): void;

  /**
   * Handler that is called when the up key is pressed.
   *
   * @param e A key combination event.
   */
  [onUpKey](e: KeyboardEvent): void;

  /**
   * Handler that is called when the down key is pressed.
   *
   * @param e A key combination event.
   */
  [onDownKey](e: KeyboardEvent): void;

  /**
   * Handler that is called when the esc key is pressed.
   */
  [onEscKey](): void;

  /**
   * A handler for the space bar key down.
   */
  [onSpace](e: KeyboardEvent): void;

  /**
   * Handler that is called when a shift+tab keypress is detected by the menu.
   */
  [onShiftTabDown](): void;

  /**
   * Renders a template for endpoints and methods list.
   */
  [endpointsTemplate](): TemplateResult|string;
  [endpointTemplate](item: EndpointItem): TemplateResult;
  [methodTemplate](endpointItem: EndpointItem, methodItem: MethodItem): TemplateResult;

  /**
   * Renders a template for documentation list.
   */
  [documentationTemplate](): TemplateResult|string;

  /**
   * @returns Template for an docs item
   */
  [documentationItemTemplate](item: DocumentationItem): TemplateResult;

  /**
   * Renders a template for types list.
   */
  [typesTemplate](): TemplateResult|string;

  /**
   * Renders a template for security schemes list.
   */
  [securityTemplate](): TemplateResult|string;
  render(): TemplateResult;
}
