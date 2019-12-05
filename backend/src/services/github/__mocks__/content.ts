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
      sha: 'a56507ed892d05a37c6d6128c260937ea4d287bd',
      size: 9,
    },
    commit: {},
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
