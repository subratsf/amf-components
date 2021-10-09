import { AmfHelperMixin } from '../helpers/AmfHelperMixin.js';
import { AmfSerializer } from '../helpers/AmfSerializer.js';

/** @typedef {import('../helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../helpers/amf').DomainElement} DomainElement */
/** @typedef {import('../helpers/api').ApiSummary} ApiSummary */

/**
 * The store that provides an API to read data from the AMF graph model.
 */
export class AmfStore extends AmfHelperMixin(Object) {
  /**
   * @param {AmfDocument} graph The full API model.
   */
  constructor(graph) {
    super();
    let amf = graph;
    if (Array.isArray(graph)) {
      [amf] = graph;
    }
    /** 
     * The API serializer
     */
    this.serializer = new AmfSerializer(amf);
    /** 
     * The graph model.
     */
    this.amf = amf;
    /** 
     * For future use.
     * Indicates that this store is read only.
     */
    this.readonly = true;
  }

  /**
   * @param {AmfDocument} amf
   */
  __amfChanged(amf) {
    this.serializer.amf = amf;
  }

  /**
   * @returns {Promise<ApiSummary|null>} 
   */
  async apiSummary() {
    const { amf } = this;
    if (!amf) {
      return null;
    }
    const result = this.serializer.apiSummary(amf);
    return result;
  }
}
