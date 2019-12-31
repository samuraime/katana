/**
 * @see https://developer.github.com/v3/repos/contents/
 * @TODO catch GitHub API error
 */

import ky from 'ky-universal';
import config from '../../config/blog';

function base64(string: string): string {
  return Buffer.from(string).toString('base64');
}

const contentRequest = ky.extend({
  prefixUrl: `https://api.github.com/repos/${config.owner}/${config.repo}/contents/`,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${config.token}`,
  },
});

function index(path: string): Promise<GitHubFile[]> {
  return contentRequest.get(path).json();
}

function get(path: string): Promise<GitHubFile> {
  return contentRequest.get(path).json();
}

interface CreateParams {
  message: string;
  content: string;
  committer?: GitHubCommitter;
}

function create(
  path: string,
  params: CreateParams
): Promise<GitHubFileResponse> {
  return contentRequest
    .put(path, {
      json: {
        ...params,
        content: base64(params.content),
      },
    })
    .json();
}

interface UpdateParams extends CreateParams {
  sha?: string;
}

function update(
  path: string,
  params: UpdateParams
): Promise<GitHubFileResponse> {
  return contentRequest
    .put(path, {
      json: {
        ...params,
        content: base64(params.content),
      },
    })
    .json();
}

interface DeleteParams {
  message: string;
  sha: string;
  committer?: GitHubCommitter;
}

function remove(
  path: string,
  params: DeleteParams
): Promise<GitHubFileResponse> {
  return contentRequest
    .delete(path, {
      json: params,
    })
    .json();
}

export default {
  index,
  get,
  create,
  update,
  remove,
};
