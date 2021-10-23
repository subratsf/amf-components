import { ApiEndPointListItem, ApiEndpointsTreeItem } from "../types";

export interface CommonRootInfo {
  index: number;
  item: ApiEndpointsTreeItem;
  common: string;
}

/**
 * A class that transforms the list of endpoints and methods into
 * a tree structure with indentation
 */
export declare class EndpointsTree {
  result: ApiEndpointsTreeItem[];
  indents: Record<string, number>;
  constructor();

  /**
   * @param list Sorted list of endpoints.
   */
  create(list: ApiEndPointListItem[]): ApiEndpointsTreeItem[];

  /**
   * @param parts Path parts of the currently evaluated endpoint
   */
  findParentEndpoint(parts: string[]): string|undefined;

  /**
   * @param parts Path parts of the currently evaluated endpoint
   */
  findCommonRootInfo(parts: string[]): CommonRootInfo|undefined;

  prepareLabel(item: ApiEndpointsTreeItem, prevPath?: string): ApiEndpointsTreeItem;

  /**
   * Updates paths and indentation of children after inserting a new (abstract) parent.
   */
  postInsertParent(parent: ApiEndpointsTreeItem): void;
}
