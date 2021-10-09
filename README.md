# amf-components

A set of web components based on LitElement that creates the visualization layer on top of the [AMF's](https://a.ml) graph model.

This project replaces all `api-*` components from this organization and consolidates the code base under a single repository.

## Version compatibility

[![Published on NPM](https://img.shields.io/npm/v/@api-components/amf-components.svg)](https://www.npmjs.com/package/@api-components/amf-components)

[![Tests and publishing](https://github.com/advanced-rest-client/amf-components/actions/workflows/deployment.yml/badge.svg)](https://github.com/advanced-rest-client/amf-components/actions/workflows/deployment.yml)

## Usage

### Installation

```sh
npm install --save @api-components/amf-components
```

### Example

```html
<html>
  <head>
    <script type="module">
      import '@api-components/amf-components/api-documentation.js';
      import '@api-components/amf-components/api-request.js';
      import '@api-components/amf-components/api-navigation.js';
      import '@api-components/amf-components/xhr-simple-request.js';
      import '@advanced-rest-client/authorization/oidc-authorization.js';
      import '@advanced-rest-client/authorization/oauth2-authorization.js';
      import { AmfDomStore } from '@api-components/amf-components';
      // read the AMF's json+ld representation of the graph model.
      const amfModel = await getAmfModelSomehow();
      // initialize the store with the support of the DOM events.
      const store = new AmfDomStore(amfModel);
      // the argument is the node on which to listen for the events.
      store.listen(window);
    </script>
  </head>
  <body>
    <!-- A helper library that works with <api-request> to perform an HTTP request in the browser. -->
    <xhr-simple-request></xhr-simple-request>
    <!-- Authorization libraries to perform OAuth and OIDC authorization. -->
    <oauth2-authorization></oauth2-authorization>
    <oidc-authorization></oidc-authorization>
    <nav>
      <!-- The navigation element. Starts with the "summary" page selection. -->
      <api-navigation summary domainId="summary" domainType="summary"></api-navigation>
    </nav>
    <main>
      <!-- The main documentation element. Starts with the "summary" page selection. -->
      <api-documentation handleNavigationEvents domainId="summary" domainType="summary"></api-documentation>
    </main>
    <aside>
      <!-- The HTTP request editor. Renders forms for user input to make an HTTP request -->
      <api-request handleNavigationEvents></api-request>
    </aside>
  </body>
</html>
```

### Monaco editor

The request editor uses the Monaco editor (by Microsoft) to render the body editor.
The library has to be loaded to the document before the request editor is rendered. Use the `@advanced-rest-client/monaco-support` module and `MonacoLoader` class to load the editor with defaults.

```javascript
import { MonacoLoader } from '@advanced-rest-client/monaco-support';

const base = new URL(`../node_modules/monaco-editor/`, window.location.href).toString();
MonacoLoader.createEnvironment(base);
await MonacoLoader.loadMonaco(base);
await MonacoLoader.monacoReady();
```

## Development

```sh
git clone https://github.com/advanced-rest-client/amf-components
cd amf-components
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
