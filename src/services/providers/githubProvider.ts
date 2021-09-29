import axios, { AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify-props';

export class GitHubRepositoryContent {
  name: string;
  path: string;
  size: number;
  url: string;
  git_url: string;
  type: string;
}

export class GitHubRepositoryTree {
  tree: GitHubRepositoryTreeItem[];
}

export class GitHubRepositoryTreeItem {
  path: string;
  model: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

export class GitHubRepositoryBlob {
  path: string;
  model: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

export interface IGitHubProvider {
  getRepositoryContent(repositoryId: string, accessToken: string): Promise<GitHubRepositoryContent[]>;
  getRepositoryTreeContent(path: string, accessToken: string): Promise<GitHubRepositoryTree | null>;
  getRepositoryBlobContent(path: string, accessToken: string): Promise<GitHubRepositoryBlob[]>;
  getCouchpotatoVersion(): Promise<string>;
  getReadme(path: string, accessToken: string): Promise<string>;
}

@injectable()
export class GitHubProvider {
  public async getRepositoryContent(repositoryId: string, accessToken: string): Promise<GitHubRepositoryContent[]> {
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };
    const result = await axios.get<GitHubRepositoryContent[]>(
      `https://api.github.com/repos/mattiasnorell/${repositoryId}/contents/`,
      config
    );
    if (result.status !== 200) {
      return [];
    }

    return result.data;
  }

  public async getRepositoryTreeContent(path: string, accessToken: string): Promise<GitHubRepositoryTree | null> {
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };
    const result = await axios.get<GitHubRepositoryTree>(
      path,
      config
    );
    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }

  public async getRepositoryBlobContent(path: string, accessToken: string): Promise<GitHubRepositoryBlob[]> {
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };
    const result = await axios.get<GitHubRepositoryBlob[]>(
      path,
      config
    );
    if (result.status !== 200) {
      return [];
    }

    return result.data;
  }

  public async getCouchpotatoVersion(): Promise<string> {
    const result = await axios.get<string>(
      `https://raw.githubusercontent.com/mattiasnorell/couchpotato/master/couchpotato.csproj`
    );


    if (result.status !== 200) {
      return '';
    }

    const regExp = /<AssemblyVersion[^>]*>([^<]+)<\/AssemblyVersion>/ig;
    const version = regExp.exec(result.data);

    return version ? version[1] : '';
  }

  public async getReadme(path: string, accessToken: string): Promise<string> {
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };
    const result = await axios.get<any>(

      path,
      config
    );
    if (result.status !== 200) {
      return '';
    }

    return atob(result.data.content);
  }
}
