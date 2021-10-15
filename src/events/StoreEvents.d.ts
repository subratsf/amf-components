declare interface IStoreEvents {
  /**
   * Dispatched by the store when the API model change.
   * @param target A node on which to dispatch the event
   */
  graphChange(target: EventTarget): void;
}

export declare const StoreEvents: Readonly<IStoreEvents>;
