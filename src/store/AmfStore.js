import { AmfHelperMixin, AmfSerializer } from '@api-components/amf-helper-mixin';

/** @typedef {import('@api-components/amf-helper-mixin').AmfDocument} AmfDocument */
/** @typedef {import('@api-components/amf-helper-mixin').DomainElement} DomainElement */
/** @typedef {import('@api-components/amf-helper-mixin').ApiSummary} ApiSummary */

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
