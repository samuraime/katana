import fs from 'fs';
import { Middleware } from 'koa';
import serialize from 'serialize-javascript';
import { UserDocument } from '../models/User';
import config from '../config';

interface PreloadState {
  user: UserDocument | null;
}

let entryHTML: string;

function getEntryHTML(): string {
  if (entryHTML) {
    return entryHTML;
  }

  return fs.readFileSync(config.frontendEntry, 'utf8');
}

function getPreloadStateScript(state: PreloadState): string {
  const serialized = serialize(state, { isJSON: true });
  return `window.__PRELOADED_STATE__=${serialized};`;
}

function getPreloadStateHTML(state: PreloadState): string {
  const html = getEntryHTML();
  const script = getPreloadStateScript(state);

  return html.replace(
    '<script src="/preloadState.js"></script>',
    `<script>${script}</script>`
  );
}

const SPA: Middleware = ctx => {
  const { user } = ctx.session;
  const state: PreloadState = {
    user: user ? { ...user, id: user._id } : null, // eslint-disable-line no-underscore-dangle
  };

  if (ctx.path === '/preloadState.js') {
    ctx.body = getPreloadStateScript(state);
    ctx.type = 'application/javascript';
    return;
  }

  ctx.body = getPreloadStateHTML(state);
  ctx.type = 'text/html';
};

export default SPA;
