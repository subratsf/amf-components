import { EventsTargetMixin } from  '@advanced-rest-client/events-target-mixin';

export declare const eventHandler: unique symbol;

export declare function AmfStoreDomEventsMixin<T extends new (...args: any[]) => {}>(base: T): T & AmfStoreDomEventsMixinConstructor;

export declare interface AmfStoreDomEventsMixinConstructor {
  new(...args: any[]): AmfStoreDomEventsMixin;
  constructor(...args: any[]): AmfStoreDomEventsMixin;
}

/**
 * This mixin adds events listeners for DOM events related to the AMF store.
 * It does not provide implementations for the functions called by each handler.
 * This to be mixed in with an instance of the `AmfStoreService`.
 * 
 * The implementation by default listens on the `window` object.
 * Set `eventsTarget` property to listen to the events on a specific node.
 */
export declare interface AmfStoreDomEventsMixin extends EventsTargetMixin {
  [eventHandler](e: CustomEvent): void;
}
