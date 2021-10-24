import { TemplateResult } from "lit-element";
import { ApiShapeUnion, ApiScalarShape, ApiUnionShape, ApiFileShape } from '../helpers/api';
/**
 * @param label The label to render.
 * @param title The value of the title attribute
 * @param [css=[]] The list of class names to add
 * @return The template for a pill visualization object
 */
export function pillTemplate(label: string, title: string, css?: string[]): TemplateResult;

/**
 * @param name The name of the parameter
 * @param required Whether the parameter is required
 * @param deprecated Whether the parameter is deprecated
 * @param paramName When set it renders the parameter name. Should be used when `name` is a `display name`.
 * @return The template for the property name value. 
 */
export function paramNameTemplate(name: string, required?: boolean, deprecated?: boolean, paramName?: string): TemplateResult;

/**
 * @param type The parameter type label to render.
 * @return The template for the parameter data type. 
 */
export function typeValueTemplate(type: string): TemplateResult;

/**
 * @param description The description to render.
 * @return The template for the markdown description
 */
export function descriptionValueTemplate(description: string): TemplateResult;

/**
 * @param label The label to render
 * @param value The value to render
 * @param name Optional data-name attribute value.
 */
export function tablePropertyTemplate(label: string, value: string, name?: string): TemplateResult;

export function detailSectionTemplate(items: TemplateResult[]): TemplateResult;

/**
 * @param noDetail When true it always render all properties, without the detail element.
 * @return The template for the details of the scalar schema
 */
export function scalarDetailsTemplate(schema: ApiScalarShape, noDetail?: boolean): TemplateResult;

/**
 * @return The template for the details of the Union schema
 */
export function unionDetailsTemplate(schema: ApiUnionShape): TemplateResult;

/**
 * @param noDetail When true it always render all properties, without the detail element.
 * @return The template for the details of the File schema
 */
export function fileDetailsTemplate(schema: ApiFileShape, noDetail?: boolean): TemplateResult;

/**
 * @param schema The schema definition.
 * @return The template for the property details.
 */
export function detailsTemplate(schema: ApiShapeUnion): TemplateResult|string;
