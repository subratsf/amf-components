import { TemplateResult } from 'lit-element';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { Shape } from '../helpers/amf';
import { ApiShape, ApiShapeUnion, ApiScalarShape, ApiNodeShape, ApiUnionShape, ApiFileShape, ApiSchemaShape, ApiAnyShape, ApiArrayShape, ApiTupleShape, ApiPropertyShape } from '../helpers/api';

export const mimeTypeValue: unique symbol;
export const querySchema: unique symbol;
export const schemaValue: unique symbol;
export const expandedValue: unique symbol;
export const selectedUnionsValue: unique symbol;
export const processSchema: unique symbol;
export const titleTemplate: unique symbol;
export const expandHandler: unique symbol;
export const expandKeydownHandler: unique symbol;
export const anyOfSelectedHandler: unique symbol;
export const schemaContentTemplate: unique symbol;
export const scalarShapeTemplate: unique symbol;
export const nodeShapeTemplate: unique symbol;
export const unionShapeTemplate: unique symbol;
export const fileShapeTemplate: unique symbol;
export const schemaShapeTemplate: unique symbol;
export const arrayShapeTemplate: unique symbol;
export const tupleShapeTemplate: unique symbol;
export const anyShapeTemplate: unique symbol;
export const shapePropertyTemplate: unique symbol;
export const shapePropertyWithoutRangeTemplate: unique symbol;
export const anyOfUnionTemplate: unique symbol;
export const anyOfOptionsTemplate: unique symbol;
export const propertyDescriptionTemplate: unique symbol;
export const propertyDescriptionEditor: unique symbol;
export const checkSchemaPropertyUpdate: unique symbol;
export const propertyDecoratorTemplate: unique symbol;
export const toggleExpandedProperty: unique symbol;
export const andUnionItemTemplate: unique symbol;
export const orderUnion: unique symbol;
export const inheritanceNameTemplate: unique symbol;
export const nilShapeTemplate: unique symbol;

export default class ApiSchemaDocumentElement extends ApiDocumentationBase {
  [mimeTypeValue]: string;
  /** 
   * The mime type to use to render the examples.
   */
  get mimeType(): string;
  /**
   * @attribute
   */
  set mimeType(value: string);
  [schemaValue]: ApiShapeUnion;
  get schema(): ApiShapeUnion;
  set schema(value: ApiShapeUnion);
  /** 
   * Generates examples from the schema properties for the given mime type 
   * when examples are not defined in the schema.
   * @attribute
   */
  forceExamples: boolean;
  /** 
  * When set it allows to manipulate the properties.
  * This is to be used with a combination with the `edit` property.
  * @attribute
  */
  editProperties: boolean;
  /** 
  * When set it renders the title with lower emphasis and adding `schema` prefix.
  * @attribute
  */
  schemaTitle: boolean;
  /** 
  * When set it does not render read only items.
  * Read only property is a feature of OAS.
  * @attribute
  */
  noReadOnly: boolean;

  [expandedValue]: string[];
  [selectedUnionsValue]: Record<string, string>;
  [propertyDescriptionEditor]: string;
  domainModel: Shape;

  constructor();

  processGraph(): Promise<void>;

  /**
   * The logic to perform after schema is ready.
   * This processes examples for the schema.
   */
  [processSchema](): void;

  /**
   * Checks the current schema whether it contains a property with the given id
   * and if so it updates its value.
   */
  [checkSchemaPropertyUpdate](schema: ApiShapeUnion, id: string, updated: any): void;
  [expandHandler](e: Event): void;
  [expandKeydownHandler](e: KeyboardEvent): void;

  /**
   * Toggles an "expanded" state for a property children.
   * @param id Parent property id that has children to toggle visibility of.
   */
  [toggleExpandedProperty](id: string): void;

  [anyOfSelectedHandler](e: Event): void;

  /**
   * Orders union items so the first is the one that has properties defined inline.
   */
  [orderUnion](shapes: ApiShapeUnion[]): ApiShapeUnion[];

  render(): TemplateResult;

  /**
   * @returns The template for the schema title.
   */
  [titleTemplate](): TemplateResult|string;

  /**
   * @param schema The shape to render.
   * @returns The template for the schema properties depending on the type
   */
  [schemaContentTemplate](schema: ApiShapeUnion): TemplateResult|string;

  /**
   * @returns The template for the scalar shape.
   */
  [scalarShapeTemplate](schema: ApiScalarShape): TemplateResult|string;
  /**
   * @returns The template for the node shape.
   */
  [nodeShapeTemplate](schema: ApiNodeShape): TemplateResult|string;

  // [inheritedTemplate](parents: ApiShapeUnion[]): TemplateResult|string;

  /**
   * @returns The template for the union shape.
   */
  [unionShapeTemplate](schema: ApiUnionShape): TemplateResult|string;
  [andUnionItemTemplate](shape: ApiShapeUnion): TemplateResult|string;
  /**
   * @returns The template for the "and" union item's title, if inherited from another type.
   */
  [inheritanceNameTemplate](shape: ApiShapeUnion): TemplateResult|string;

  /**
   * @returns The template for the `any of` union.
   */
  [anyOfUnionTemplate](schemaId: string, items: ApiShapeUnion[]): TemplateResult|string;

  /**
   * @param schemaId The parent schema id value
   * @param options The options to render.
   * @returns The template for the union any of selector.
   */
  [anyOfOptionsTemplate](schemaId: string, options: any[], selected: string): TemplateResult|string;

  /**
   * @returns The template for the file shape.
   */
  [fileShapeTemplate](schema: ApiFileShape): TemplateResult|string;

  /**
   * @returns The template for the schema shape.
   */
  [schemaShapeTemplate](schema: ApiSchemaShape): TemplateResult|string;

  /**
   * @returns The template for the array shape.
   */
  [arrayShapeTemplate](schema: ApiArrayShape): TemplateResult|string;

  /**
   * @returns The template for the tuple shape.
   */
  [tupleShapeTemplate](schema: ApiTupleShape): TemplateResult|string;

  /**
   * @returns The template for the Any shape.
   */
  [anyShapeTemplate](schema: ApiAnyShape): TemplateResult|string;

  /**
   * @returns The template for the Any shape.
   */
  [nilShapeTemplate](schema: ApiShape): TemplateResult|string;

  /**
   * @returns The template for the schema property item.
   */
  [shapePropertyTemplate](schema: ApiPropertyShape): TemplateResult|string;

  /**
   * @returns THe template for the line decorator in front of the property name.
   */
  [propertyDecoratorTemplate](isComplex: boolean, expanded: boolean, schemaId: string): TemplateResult|string;

  /**
   * @returns The template for the schema property item that has no range information.
   */
  [shapePropertyWithoutRangeTemplate](schema: ApiPropertyShape): TemplateResult|string;
  [propertyDescriptionTemplate](schema: ApiPropertyShape): TemplateResult|string;
}
