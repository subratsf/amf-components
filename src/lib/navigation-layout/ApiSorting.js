/** @typedef {import('../../types').ApiEndPointListItem} ApiEndPointListItem */

export class ApiSorting {
  /**
   * Sorts endpoints by path.
   * @param {ApiEndPointListItem[]} list 
   * @returns {ApiEndPointListItem[]}
   */
  static sortEndpointsByPath(list) {
    list.sort((a,b) => {
      if (a.path < b.path){
        return -1;
      }
      if (a.path > b.path){
        return 1;
      }
      return 0;
    });
    return list;
  }
}
