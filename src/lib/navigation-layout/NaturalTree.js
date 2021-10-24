/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/** @typedef {import('../../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../../types').ApiEndpointsTreeItem} ApiEndpointsTreeItem */

/**
 * A class that transforms the list of endpoints and methods into
 * a "natural" tree structure with indentation.
 * This is consistent with the legacy API navigation element sorting.
 */
export class NaturalTree {
  constructor() {
    /** 
     * @type ApiEndpointsTreeItem[] 
     */
    this.result = [];
    /** @type string[] */
    this.basePaths = [];
  }

  /**
   * @param {ApiEndPointWithOperationsListItem[]} list The list of endpoints as they appear in the API.
   * @returns {ApiEndpointsTreeItem[]}
   */
  create(list) {
    list.forEach((item) => this.appendEndpointItem(item));
    return this.result;
  }

  /**
   * @param {ApiEndPointWithOperationsListItem} item
   */
  appendEndpointItem(item) {
    const { path, name, id, operations,  } = item;
    const result = /** @type ApiEndpointsTreeItem */ ({
      path,
      label: name,
      name,
      id,
      indent: 0,
      operations,
      hasChildren: false,
      hasShortPath: false,
    });

    let tmpPath = path;
    if (tmpPath[0] === '/') {
      tmpPath = tmpPath.substr(1);
    }
    const parts = tmpPath.split('/');
    let indent = 0;
    this.basePaths.push(path);

    if (parts.length > 1 /* && !this.renderFullPaths */) {
      const lowerParts = parts.slice(0, parts.length - 1);
      if (lowerParts.length) {
        for (let i = lowerParts.length - 1; i >= 0; i--) {
          const currentPath = `/${lowerParts.slice(0, i + 1).join('/')}`;
          const previousBasePathItem = this.basePaths[this.basePaths.length - 2];
          if (previousBasePathItem && (previousBasePathItem === currentPath || previousBasePathItem.startsWith(`${currentPath}/`))) {
            indent++;
          }
        }
      }
    }
    if (!result.label) {
      if (indent > 0) {
        try {
          result.label = this.computePathName(path, parts, indent);
        } catch (_) {
          result.label = path;
        }
      } else {
        result.label = path;
      }
    }
    result.indent = indent;
    this.result.push(result);
  }

  /**
   * Computes label for an endpoint when name is missing and the endpoint
   * is indented, hence name should be truncated.
   * @param {string} currentPath Endpoint's path
   * @param {string[]} parts Path parts
   * @param {number} indent Endpoint indentation
   * @returns {string} 
   */
   computePathName(currentPath, parts, indent) {
    const { basePaths } = this;
    let path = '';
    
    const latestBasePath = basePaths[basePaths.length - 1];
    for (let i = 0, len = parts.length - 1; i < len; i++) {
      path += `/${parts[i]}`;
      if (!latestBasePath || latestBasePath.indexOf(`${path}/`) !== -1) {
        indent--;
      }
      if (indent === 0) {
        break;
      }
    }
    return currentPath.replace(path, '');
  }
}
