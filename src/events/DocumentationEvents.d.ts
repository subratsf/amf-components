import { ApiDocumentation } from '../helpers/api';

declare interface IDocumentationEvents {
  /**
   * Lists the documentation definitions for the API.
   * @param target The node on which to dispatch the event
   * @returns The list of documentations.
   */
  list(target: EventTarget): Promise<ApiDocumentation[]>;
  /**
   * Reads RAML's/OAS's documentation page.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation.
   */
  get(target: EventTarget, id: string): Promise<ApiDocumentation>;
}

export declare const DocumentationEvents: Readonly<IDocumentationEvents>;
