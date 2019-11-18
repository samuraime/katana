/**
 * @see https://developer.github.com/v3/repos/contents/
 * @TODO catch GitHub API error
 */

import { HttpMethod, HttpRequestOptions, request } from '../../utils/http';
import config from '../../config/blog';

function base64(string: string) {
  return Buffer.from(string).toString('base64');
}

// TODO: refactor this
const makeRequest = (method: HttpMethod) => (
  path: string,
  params?: Record<string, any>,
  options?: HttpRequestOptions
) => {
  const uri = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${config.token}`,
  };

  return request(method)(uri, params, { headers, ...options });
};

const contentRequest = {
  get: makeRequest(HttpMethod.GET),
  post: makeRequest(HttpMethod.POST),
  put: makeRequest(HttpMethod.PUT),
  delete: makeRequest(HttpMethod.DELETE),
};

interface GitHubFileResponse {
  content?: GitHubFile;
  commit: GitHubCommit;
}

function index(path: string): Promise<GitHubFile[]> {
  return contentRequest.get(path);
}

function get(path: string): Promise<GitHubFile> {
  return contentRequest.get(path);
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
  return contentRequest.put(path, {
    ...params,
    content: base64(params.content),
  });
}

interface UpdateParams extends CreateParams {
  sha?: string;
}

function update(
  path: string,
  params: UpdateParams
): Promise<GitHubFileResponse> {
  return contentRequest.put(path, {
    ...params,
    content: base64(params.content),
  });
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
  return contentRequest.delete(path, params);
}

export default {
  index,
  get,
  create,
  update,
  remove,
};
