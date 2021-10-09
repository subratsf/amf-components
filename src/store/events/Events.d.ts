// import { IEndpointEvents } from './EndpointEvents';
// import { IOperationEvents } from './OperationEvents';
import { IApiEvents } from './ApiEvents';
// import { IServerEvents } from './ServerEvents';
// import { IDocumentationEvents } from './DocumentationEvents';
// import { ISecurityEvents } from './SecurityEvents';
// import { ITypeEvents } from './TypeEvents';
// import { IResponseEvents } from './ResponseEvents';
// import { IRequestEvents } from './RequestEvents';
// import { IPayloadEvents } from './PayloadEvents';
// import { IParameterEvents } from './ParameterEvents';
// import { IExampleEvents } from './ExampleEvents';
// import { ICustomPropertyEvents } from './CustomPropertyEvents';

declare interface IEvents {
  Api: IApiEvents;
  // Endpoint: IEndpointEvents;
  // Operation: IOperationEvents;
  // Server: IServerEvents;
  // Documentation: IDocumentationEvents;
  // Security: ISecurityEvents;
  // Type: ITypeEvents;
  // Response: IResponseEvents;
  // Request: IRequestEvents;
  // Payload: IPayloadEvents;
  // Parameter: IParameterEvents;
  // Example: IExampleEvents;
  // CustomProperty: ICustomPropertyEvents;
}

export const Events: Readonly<IEvents>;
