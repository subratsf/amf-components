import { amfParserApi } from './dev/amf-server/api.mjs';

/** @typedef {import('@web/dev-server').DevServerConfig} DevServerConfig */

export default /** @type DevServerConfig */ ({
  open: true,
  nodeResolve: true,
  appIndex: 'demo/index.html',
  rootDir: '.',
  watch: true,
  middleware: [
    amfParserApi,
  ],
})
