declare interface GitHubUser {
  id: number;
  avatar_url: string;
  email: string;
  login: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  created_at: Date;
  updated_at: Date;
}

declare interface GitHubFile {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: GitHubFileLink;
}

interface GitHubFileLink {
  git: string;
  self: string;
  html: string;
}

declare interface GitHubCommit {
  sha: string;
  node_id: string;
  url: string;
  html_url: string;
  author: GitHubCommitter;
  committer: GitHubCommitter;
  message: string;
}

declare interface GitHubCommitter {
  date?: Date;
  name: string;
  email: string;
}
