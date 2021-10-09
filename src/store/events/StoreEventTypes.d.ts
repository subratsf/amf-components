/**
 * Events types definition.
 */
declare interface IStoreEventTypes {
  Api: Readonly<ApiEvents>;
}
export const StoreEventTypes: Readonly<IStoreEventTypes>;

declare interface ApiEvents {
  summary: string;
}
