interface Security {
  settingsChanged: string;
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
}

interface Server {
  serverChange: string;
  serverCountChange: string;
  query: string;
}

declare interface ApiEvents {
  summary: string;
}
declare interface Navigation {
  apiNavigate: string;
}

declare interface EndpointEvents {
  get: string;
  byPath: string;
  list: string;
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

interface IEventTypes {
  Security: Readonly<Security>;
  Request: Readonly<Request>;
  Server: Readonly<Server>;
  Api: Readonly<ApiEvents>;
  Navigation: Readonly<Navigation>;
  Endpoint: Readonly<EndpointEvents>;
  Reporting: Readonly<ReportingEvents>;
  Telemetry: Readonly<TelemetryEvents>;
  Store: Readonly<StoreEvents>;
}

export const EventTypes: Readonly<IEventTypes>;
