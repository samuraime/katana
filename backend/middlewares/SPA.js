const fs = require('fs');
// const serialize = require('serialize-javascript');
const config = require('../config');

const entryHTML = fs.readFileSync(config.frontendEntry, 'utf8');

function preloadState(state) {
  const serialized = JSON.stringify(state);
  return entryHTML.replace(/(?<=__PRELOADED_STATE__=){}/, serialized);
}

function SPA(ctx) {
  // ctx.body = fs.createReadStream(config.frontendEntry);
  ctx.body = preloadState({ user: ctx.session.user });
  ctx.type = 'text/html';
}

module.exports = SPA;
