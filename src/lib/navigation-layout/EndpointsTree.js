/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/** @typedef {import('../../types').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../types').ApiEndpointsTreeItem} ApiEndpointsTreeItem */
/** @typedef {import('./EndpointsTree').CommonRootInfo} CommonRootInfo */

/**
 * A class that transforms the list of endpoints and methods into
 * a tree structure with indentation
 */
export class EndpointsTree {
  constructor() {
    /** 
     * @type ApiEndpointsTreeItem[] 
     */
    this.result = [];
    /** @type Record<string, number> */
    this.indents = {};
  }

  /**
   * @param {ApiEndPointListItem[]} list Sorted list of endpoints.
   * @returns {ApiEndpointsTreeItem[]}
   */
  create(list) {
    if (!Array.isArray(list) || !list.length) {
      return [];
    }
    const { result, indents } = this;
    let prev = /** @type ApiEndpointsTreeItem */ (null);
    for (let i = 0, len = list.length; i < len; i++) {
      const item = /** @type ApiEndpointsTreeItem */ ({ ...list[i], indent: 0, label: '' });
      const { path } = item;
      const parts = path.split('/');
      const hasParts = parts.length > 1 && !(parts.length === 2 && !parts[0]);
      if (i === 0) {
        if (hasParts) {
          const parent = {
            indent: 0,
            path: parts.slice(0, parts.length - 1).join('/'),
            label: undefined,
            operations: [],
            hasChildren: true,
          };
          parent.label = parent.path;
          prev = parent;
          indents[parent.path] = item.indent;
          result.push(parent);
        } else {
          prev = item;
          indents[item.path] = item.indent;
          result.push(this.prepareLabel(item));
          continue;
        }
      }
      // this is similar to the next block but is faster when the previous item is parent.
      if (path.startsWith(prev.path)) {
        item.indent = prev.indent + 1;
        prev.hasChildren = true;
        indents[item.path] = item.indent;
        result.push(this.prepareLabel(item, prev.path));
        prev = item;
        continue;
      }
      const upPath = this.findParentEndpoint(parts);
      if (upPath) {
        item.indent = indents[upPath] + 1;
        const parent = result.find((p) => p.path === upPath);
        parent.hasChildren = true;
        indents[item.path] = item.indent;
        result.push(this.prepareLabel(item, upPath));
      } else {
        if (hasParts) {
          const info = this.findCommonRootInfo(parts);
          if (info) {
            const parent = {
              indent: info.item.indent,
              path: info.common,
              label: info.common,
              operations: [],
              hasChildren: true,
            };
            this.postInsertParent(parent);
            indents[parent.path] = parent.indent;
            result.splice(info.index, 0, parent);
            item.indent = parent.indent + 1;
            indents[item.path] = item.indent;
            result.push(this.prepareLabel(item, parent.path));
            continue;
          }
        }
        item.indent = 0;
        indents[item.path] = item.indent;
        result.push(this.prepareLabel(item));
      }
      prev = item;
    }
    return result;
  }

  /**
   * @param {string[]} parts Path parts of the currently evaluated endpoint
   */
  findParentEndpoint(parts) {
    const { indents } = this;
    const list = Array.from(parts);
    const compare = Object.keys(indents).reverse();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const path = list.join('/');
      if (!path) {
        break;
      }
      const upPath = compare.find((candidate) => path.startsWith(candidate));
      if (upPath) {
        return upPath;
      }
      list.pop();
      if (!list.length) {
        break;
      }
    }
    return undefined;
  }

  /**
   * @param {string[]} parts Path parts of the currently evaluated endpoint
   * @returns {CommonRootInfo|undefined}
   */
  findCommonRootInfo(parts) {
    const { result } = this;
    const list = Array.from(parts);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      list.pop();
      if (!list.length) {
        break;
      }
      const path = list.join('/');
      if (!path) {
        break;
      }
      const index = result.findIndex((candidate) => candidate.path.startsWith(path));
      if (index !== -1) {
        return {
          index,
          item: result[index],
          common: path,
        };
      }
    }
    return undefined;
  }

  /**
   * @param {ApiEndpointsTreeItem} item 
   * @param {string=} prevPath 
   * @returns {ApiEndpointsTreeItem}
   */
  prepareLabel(item, prevPath) {
    const { name, path, indent } = item;
    item.label = path;
    if (name) {
      item.label = name;
    } else if (indent > 0 && prevPath) {
      let label = item.label.replace(prevPath, '');
      if (label.startsWith('-')) {
        label = label.substr(1);
      }
      item.label = label
      item.hasShortPath = true;
      if (!item.label.startsWith('/')) {
        item.label = `/${item.label}`;
      }
    }
    return item;
  }

  /**
   * Updates paths and indentation of children after inserting a new (abstract) parent.
   * @param {ApiEndpointsTreeItem} parent 
   */
  postInsertParent(parent) {
    const { result } = this;
    result.forEach((item) => {
      const { path } = item;
      if (path.startsWith(parent.path)) {
        item.indent += 1;
        item.label = item.label.replace(parent.path, '');
      }
    });
  }
}
