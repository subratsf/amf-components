interface Security {
  settingsChanged: string;
  get: string;
  getRequirement: string;
  list: string;
}
interface Request {
  apiRequest: string;
  apiRequestLegacy: string;
  abortApiRequest: string;
  abortApiRequestLegacy: string;
  apiResponse: string;
  apiResponseLegacy: string;
  redirectUriChange: string;
  redirectUriChangeLegacy: string;
  populateAnnotatedFields: string;
  populateAnnotatedFieldsLegacy: string;
  get: string;
}

interface Response {
  get: string;
}

interface Server {
  serverChange: string;
  serverCountChange: string;
  query: string;
}

declare interface ApiEvents {
  summary: string;
  protocols: string;
  version: string;
  documentMeta: string;
}
declare interface Navigation {
  apiNavigate: string;
  navigateExternal: string;
}

declare interface EndpointEvents {
  get: string;
  byPath: string;
  list: string;
}

declare interface OperationEvents {
  get: string;
  getParent: string;
}

declare interface ReportingEvents {
  error: string;
}

declare interface TelemetryEvents {
  view: string;
  event: string;
  exception: string;
  social: string;
  timing: string;
}

declare interface StoreEvents {
  graphChange: string;
}

declare interface DocumentationEvents {
  get: string;
  list: string;
}

declare interface PayloadEvents {
  get: string;
}

declare interface TypeEvents {
  get: string;
  list: string;
}

interface IEventTypes {
  Security: Readonly<Security>;
  Request: Readonly<Request>;
  Response: Readonly<Response>;
  Payload: Readonly<PayloadEvents>;
  Server: Readonly<Server>;
  Api: Readonly<ApiEvents>;
  Navigation: Readonly<Navigation>;
  Endpoint: Readonly<EndpointEvents>;
  Operation: Readonly<OperationEvents>;
  Reporting: Readonly<ReportingEvents>;
  Telemetry: Readonly<TelemetryEvents>;
  Store: Readonly<StoreEvents>;
  Documentation: Readonly<DocumentationEvents>;
  Type: Readonly<TypeEvents>;
}

export const EventTypes: Readonly<IEventTypes>;
