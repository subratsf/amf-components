/** @typedef {import('@api-client/context-menu').ContextMenuCommand} ContextMenuCommand */
/** @typedef {import('../elements/ApiNavigationElement').default} ApiNavigationElement */


const commands = /** @type ContextMenuCommand[] */ ([
  {
    target: 'all',
    label: 'Expand all',
    execute: (ctx) => {
      const menu = /** @type ApiNavigationElement */ (ctx.root);
      menu.expandAll();
    },
  },
  {
    target: 'all',
    label: 'Collapse all',
    execute: (ctx) => {
      const menu = /** @type ApiNavigationElement */ (ctx.root);
      menu.collapseAll();
    },
  },
  {
    target: 'endpoints',
    label: 'Expand all endpoints',
    execute: (ctx) => {
      const menu = /** @type ApiNavigationElement */ (ctx.root);
      menu.expandAllEndpoints();
    },
  },
  {
    target: 'endpoints',
    label: 'Collapse all endpoints',
    execute: (ctx) => {
      const menu = /** @type ApiNavigationElement */ (ctx.root);
      menu.collapseAllEndpoints();
    },
  },
]);
export default commands;
