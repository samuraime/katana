/* eslint-disable @typescript-eslint/camelcase */

interface CreateParams {
  message: string;
  content: string;
  committer?: GitHubCommitter;
}

interface UpdateParams extends CreateParams {
  sha?: string;
}

async function update(): Promise<GitHubFileResponse> {
  return {
    content: {
      name: 'hello.txt',
      path: 'notes/hello.txt',
      encoding: 'base64',
      content: 'encoded content ...',
      sha: '95b966ae1c166bd92f8ae7d1c313e738c731dfc3',
      size: 9,
      url:
        'https://api.github.com/repos/octocat/Hello-World/contents/notes/hello.txt',
      html_url:
        'https://github.com/octocat/Hello-World/blob/master/notes/hello.txt',
      git_url:
        'https://api.github.com/repos/octocat/Hello-World/git/blobs/95b966ae1c166bd92f8ae7d1c313e738c731dfc3',
      download_url:
        'https://raw.githubusercontent.com/octocat/HelloWorld/master/notes/hello.txt',
      type: 'file',
      _links: {
        self:
          'https://api.github.com/repos/octocat/Hello-World/contents/notes/hello.txt',
        git:
          'https://api.github.com/repos/octocat/Hello-World/git/blobs/95b966ae1c166bd92f8ae7d1c313e738c731dfc3',
        html:
          'https://github.com/octocat/Hello-World/blob/master/notes/hello.txt',
      },
    },
    commit: {
      sha: '7638417db6d59f3c431d3e1f261cc637155684cd',
      node_id:
        'MDY6Q29tbWl0NzYzODQxN2RiNmQ1OWYzYzQzMWQzZTFmMjYxY2M2MzcxNTU2ODRjZA==',
      url:
        'https://api.github.com/repos/octocat/Hello-World/git/commits/7638417db6d59f3c431d3e1f261cc637155684cd',
      html_url:
        'https://github.com/octocat/Hello-World/git/commit/7638417db6d59f3c431d3e1f261cc637155684cd',
      author: {
        date: '2014-11-07T22:01:45Z',
        name: 'Monalisa Octocat',
        email: 'octocat@github.com',
      },
      committer: {
        date: '2014-11-07T22:01:45Z',
        name: 'Monalisa Octocat',
        email: 'octocat@github.com',
      },
      message: 'my commit message',
    },
  };
}

interface DeleteParams {
  message: string;
  sha: string;
  committer?: GitHubCommitter;
}

async function remove(): Promise<null> {
  return null;
}

export default {
  update,
  remove,
};
