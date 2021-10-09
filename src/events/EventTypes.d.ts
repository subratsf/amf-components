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

interface IEventTypes {
  Security: Readonly<Security>;
  Request: Readonly<Request>;
  Server: Readonly<Server>;
}

export const EventTypes: Readonly<IEventTypes>;
