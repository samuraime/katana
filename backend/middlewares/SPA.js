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

function preloadState(state) {
  const html = getEntryHTML();
  const serialized = serialize(state, { isJSON: true });
  const scriptTag = `<script>window.__PRELOADED_STATE__=${serialized}</script>`;
  return html.replace(/(?<=<div id="root"><\/div>)\B/, scriptTag);
}

function SPA(ctx) {
  // ctx.body = fs.createReadStream(config.frontendEntry);
  ctx.body = preloadState({ user: ctx.session.user });
  ctx.type = 'text/html';
}

module.exports = SPA;
