/* eslint-disable no-param-reassign */
import { AmfStoreDomEventsMixin, AmfStore } from '../../index.js';
import { AmfPartialModel } from './AmfPartialModel.js';

/** @typedef {import('../../src/helpers/amf').AmfDocument} AmfDocument */
/** @typedef {import('../../src/helpers/api').ApiSummary} ApiSummary */
/** @typedef {import('../../src/helpers/api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../../src/helpers/api').ApiOperation} ApiOperation */
/** @typedef {import('../../src/helpers/api').ApiShapeUnion} ApiShapeUnion */

export class AmfPartialGraphStore extends AmfStoreDomEventsMixin(AmfStore) {
  /**
   * @param {EventTarget=} eventsTarget The event target to dispatch the events on.
   * @param {AmfDocument=} graph The full API model.
   */
  constructor(eventsTarget=window, graph) {
    super(eventsTarget, graph);
    this.partial = new AmfPartialModel(graph);
  }

  /**
   * @param {AmfDocument} amf
   */
  __amfChanged(amf) {
    this.partial.amf = amf;
    super.__amfChanged(amf);
  }

  /**
   * @returns {Promise<ApiSummary>} The API base definition 
   */
  async apiSummary() {
    const model = this.partial.summaryPartial();
    return this.serializer.apiSummary(model);
  }

  /**
   * Reads an endpoint by its id.
   * @param {string} id The domain id of the endpoint.
   * @returns {Promise<ApiEndPoint|null>} 
   */
  async getEndpoint(id) {
    const model = this.partial.endpoint(id);
    return this.serializer.endPoint(model);
  }

  /**
   * Reads the operation model.
   * @param {string} operationId The domain id of the operation to read.
   * @param {string=} endpointId Optional endpoint id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  async getOperation(operationId, endpointId) {
    const model = this.partial.endpoint(endpointId);
    if (!model) {
      return undefined;
    }
    const endpoint = this.serializer.endPoint(model);
    const op = endpoint.operations.find(i => i.id === operationId);
    return op;
  }

  /**
   * Finds an endpoint that has the operation.
   * @param {string} id Method name or the domain id of the operation to find
   * @returns {Promise<ApiEndPoint|undefined>}
   */
  async getOperationParent(id) {
    const model = this.partial.partialOperationEndpoint(id);
    if (!model) {
      return undefined;
    }
    return this.serializer.endPoint(model);
  }

  /**
   * @param {string} domainId The domain id of the API type (schema).
   * @returns {Promise<ApiShapeUnion>}
   */
  async getType(domainId) {
    const model = this.partial.schema(domainId);
    if (!model) {
      return undefined;
    }
    return this.serializer.unknownShape(model);
  }
}
