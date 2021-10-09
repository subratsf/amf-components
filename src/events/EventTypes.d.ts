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
}

declare interface ApiEvents {
  summary: string;
}

interface IEventTypes {
  Security: Readonly<Security>;
  Request: Readonly<Request>;
  Server: Readonly<Server>;
  Api: Readonly<ApiEvents>;
}

export const EventTypes: Readonly<IEventTypes>;
