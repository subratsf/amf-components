# API Components architecture

API Components is a set of web components based on the LitElement library. Their primary purpose is to visualizes the AMF graph model in a form of a developer documentation portal. In most cases AMF generates models for APIs (at least for the use of MuleSoft) but in the future the library may expand the number of supported models.

## Working with the graph model

Previously, the API components were passively consuming the graph model by setting the `amf` property. This was the easies way to build the components and to pass values needed to render the documentation. However, over the years we have got a number of use cases where this architecture is not efficient anymore. For the use cases like querying a backend for partial models, or supporting different formats of the graph model (like flattened model) we had to came up with a series of workarounds. These were usually put into the `AmfHelperMixin` mixin or directly in the `<api-documentation>`. This doesn't scale well and we needed to design a more scalable solution.

## Introducing the AmfStore

AMF store is a library that has an interface that is used by the API components to request for specific data from the store. The components actively query the store via the DOM events when they need a new information to render the view. For example, API operation document (the `<api-operation-document>` element) actively queries the store when the current selection change (the `domainId` and sometimes `domainType` properties). The store reads the graph from it's own store (by default it is in-memory raw js+ld model), transforms it to the expected format, and response to the request.

Only the major API components are querying the store for the data. The rest expects the values to be passed via properties.

The following elements query the store:

- api-documentation
- api-channel-document
- api-documentation-document
- api-operation-document
- api-payload-document
- api-request-document
- api-request-editor
- api-resource-document
- api-response-document
- api-security-document
- api-security-requirement-document
- api-server-selector
- api-summary

For convenience this library offers a version of the store that has the DOM events listeners attached: `DomEventsAmfStore`. When using this class the developer need to set the AMF model only on the instance of `DomEventsAmfStore`. These events are registered in the src/store/AmfStoreDomEventsMixin.js mixin.

Because these components of the store are decoupled, a developer has flexibility of implementing their own version of the store that processes data from a different location (like AMF service or an HTTP store). See `demo/lib/AmfPartialGraphStore.js` for an example of a such implementation.

## Components structure

For the majority of use cases, at least for an API documentation purpose, a developer needs to use only 3 major components: `api-navigation`, `api-documentation`, and `api-request`. This components represent the three major UI regions of an API documentation (in order): navigation through the API, presenting the documentation, and rendering an HTTP editor.

These components work together when the `handleNavigationEvents` property is set in the documentation and the HTTP request editor. One a user makes a selection in the navigation the other two will handle the event and change the selection to render selected view. However, this won't work in some cases like when the components are being attached to the DOM. Therefore you need to decide to have a default selection, like `summary` view.

Another way of dealing with the selection is to handle the navigation event, set the selection state in your application, and propagate it to the components.

## DOM events

The way HTML elements communicate with each other are DOM events. This library has a definition of all events used by the components and the store.

```javascript
import { ApiEvents, ApiEventTypes } from '@api-components/amf-components';

const servers = await ApiEvents.Server.query(document.body); // queries for the list of servers in the current API

// the event dispatched when a navigation occur.
window.addEventListener(ApiEventTypes.Navigation.apiNavigate, (e) => {
  console.log(e.detail);
});
```
