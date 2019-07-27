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
  if (ctx.path === '/preloadState.js') {
    ctx.body = getPreloadStateScript({ user: ctx.session.user });
    ctx.type = 'application/javascript';
    return;
  }

  // ctx.body = fs.createReadStream(config.frontendEntry);
  ctx.body = getPreloadStateHTML({ user: ctx.session.user });
  ctx.type = 'text/html';
}

module.exports = SPA;
