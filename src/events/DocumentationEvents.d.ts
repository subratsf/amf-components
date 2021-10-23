import { ApiDocumentation } from '../helpers/api';

declare interface IDocumentationEvents {
  /**
   * Reads RAML's/OAS's documentation page.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation.
   */
  get(target: EventTarget, id: string): Promise<ApiDocumentation>;
}

export declare const DocumentationEvents: Readonly<IDocumentationEvents>;
