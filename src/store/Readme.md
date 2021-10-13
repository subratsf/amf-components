# Graph store

The concept of a graph store is based on the DOM events communication between the components and the store that has the AMF model and prepares serialized values rendered by the components.

> This is a work in progress and a change planned for the next major release of the components.

## The store

The store keeps the AMF model, whether it is a partial (from the AMF service) or a full model. The store registers event listeners for the context store events. The components dispatch the events when they request an information about a particular part of the model. In response, the store reads the part of the model requested by the component, serializes it to a JS object using the AmfSerializer, and returns with the same event.

All operations are asynchronous so the store can be extended to support async architecture, like reading the AMF model values from a server.

## The events

The events are defined in the src/events/ folder. The components uses helper functions to dispatch an event. This function is asynchronous and returns the value set be the store.
This communication is based on setting by the store the `result` property on the Event's `detail` object. The value set on this property on the store is passed directly to the component that called the event.

```javascript
import { ApiEvents } from './src/events/ApiEvents.js';

const apiSummary = ApiEvents.summary(document.body);
```

The event above is requesting a serialized summary of the API from the store. The argument is the Element (or wider EventTarget) that is used to dispatch the event on. This can be used to limit the scope of the events bubbling in the DOM.

This example is equivalent to the following:

```javascript
import { EventTypes } from './src/events/ApiEvents.js';

const e = new CustomEvent(EventTypes.Api.summary, {
  bubbles: true,
  composed: true,
  detail: {}, // must be set when creating the event.
});
document.body.dispatchEvent(e);
const apiSummary = e.detail.result;
```

If the event is handled by the store the `e.detail.result` contains a promise created by the store. This promise is resolved to the serialized graph object.
