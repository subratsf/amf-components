export const EventTypes = Object.freeze({
  Security: Object.freeze({
    settingsChanged: 'securitysettingsinfochanged',
  }),
  Request: Object.freeze({
    apiRequest: 'apirequest',
    apiRequestLegacy: 'api-request',
    abortApiRequest: 'apiabort',
    abortApiRequestLegacy: 'abort-api-request',
    apiResponse: 'apiresponse',
    apiResponseLegacy: 'api-response',
    redirectUriChange: 'oauth2redirecturichange',
    redirectUriChangeLegacy: 'oauth2-redirect-uri-changed',
    populateAnnotatedFields: 'populateannotatedfields',
    populateAnnotatedFieldsLegacy: 'populate_annotated_fields',
  }),
  Server: Object.freeze({
    serverChange: 'apiserverchanged',
    serverCountChange: 'serverscountchanged',
    query: 'apistoreserverquery',
  }),
  Api: Object.freeze({
    summary: 'amfstoreapisummary',
  }),
  Navigation: Object.freeze({
    apiNavigate: 'apinavigate',
  }),
  Endpoint: Object.freeze({
    get: 'amfstoreendpointget',
    byPath: 'amfstoreendpointbypath',
    list: 'amfstoreendpointlist',
  }),
  Reporting: Object.freeze({
    error: 'apierror',
  }),
  Telemetry: Object.freeze({
    view: 'telemetryscreenview',
    event: 'telemetryevent',
    exception: 'telemetryexception',
    social: 'telemetrysocial',
    timing: 'telemetrytiming',
  }),
  Store: Object.freeze({
    graphChange: 'apistoregraphchange',
  }),
});
