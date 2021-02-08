import axios, { AxiosRequestConfig } from 'axios';

export class GitHubRepositoryContent {
  name: string;
  path: string;
  size: number;
  url: string;
  type: string;
}

class GitHubProvider {
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

  public async getReadme(pluginId: string, accessToken: string): Promise<string>{
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };
    const result = await axios.get<any>(
      
      `https://api.github.com/repos/mattiasnorell/couchpotato-plugins/git/blobs/513b8f1514c5cb90d66cc78374ac1b66c53bc74a`,
      config
    );
    if (result.status !== 200) {
      return '';
    }
    
    return atob(result.data.content);
  }
}

const $githubProvider = new GitHubProvider();
export { $githubProvider };
