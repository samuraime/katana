const fs = require('fs');
const serialize = require('serialize-javascript');
const config = require('../config');

let entryHTML;

function getEntryHTML() {
  if (entryHTML) {
    return entryHTML;
  }

  return fs.readFileSync(config.frontendEntry, 'utf8');
}

function getPreloadStateScript(state) {
  const serialized = serialize(state, { isJSON: true });
  return `window.__PRELOADED_STATE__=${serialized};`;
}

function getPreloadStateHTML(state) {
  const html = getEntryHTML();
  const script = getPreloadStateScript(state);

  return html.replace(
    '<script src="/preloadState.js"></script>',
    `<script>${script}</script>`
  );
}

function SPA(ctx) {
  const { user } = ctx.session;
  const state = {
    user: user ? { ...user, id: user._id } : null, // eslint-disable-line no-underscore-dangle
  };

  if (ctx.path === '/preloadState.js') {
    ctx.body = getPreloadStateScript(state);
    ctx.type = 'application/javascript';
    return;
  }

  ctx.body = getPreloadStateHTML(state);
  ctx.type = 'text/html';
}

module.exports = SPA;
