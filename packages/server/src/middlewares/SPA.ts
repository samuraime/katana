import fs from 'fs';
import path from 'path';
import { Middleware } from 'koa';
import serialize from 'serialize-javascript';
import { UserDocument } from '../models/User';
import config from '../config';

interface PreloadState {
  user: UserDocument | null;
}

let entryHTML: string;

function getEntryHTML(clientVersion: string): string {
  if (entryHTML) {
    return entryHTML;
  }

  const clientEntry = process.env.CI
    ? path.resolve(__dirname, '../../../client/public/index.html')
    : // e.g. client/versions/1.0.0/dist/index.html
      path.resolve(
        __dirname,
        `${config.clientVersionsPath}/${clientVersion}/dist/index.html`
      );

  const versions = `\n<!-- ClientVersion: ${clientVersion} -->`;

  return fs.readFileSync(clientEntry, 'utf8').concat(versions);
}

function getPreloadStateScript(state: PreloadState): string {
  const serialized = serialize(state, { isJSON: true });
  return `window.__PRELOADED_STATE__=${serialized};`;
}

function getPreloadStateHTML(
  state: PreloadState,
  clientVersion: string
): string {
  const html = getEntryHTML(clientVersion);
  const script = getPreloadStateScript(state);

  return html.replace(
    '<script src="/preloadState.js"></script>',
    `<script>${script}</script>`
  );
}

const SPA: Middleware = (ctx) => {
  const { user } = ctx.session;
  const state: PreloadState = {
    user: user ? { ...user, id: user._id } : null, // eslint-disable-line no-underscore-dangle
  };

  if (ctx.path === '/preloadState.js') {
    ctx.body = getPreloadStateScript(state);
    ctx.type = 'application/javascript';
    return;
  }

  if (process.env.ci) {
    ctx.body = '';
    ctx.type = 'text/html';
    return;
  }

  const clientVersion = ctx.query['client-version'] || config.clientVersion;

  ctx.body = getPreloadStateHTML(state, clientVersion);
  ctx.type = 'text/html';
};

export default SPA;
