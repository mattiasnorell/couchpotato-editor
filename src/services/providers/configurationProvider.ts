declare var __APIURL__: string;
import axios from 'axios';
import { Configuration } from '_models/Configuration';
import { ConfigurationListItem } from '_models/ConfigurationListItem';
import { injectable, inject } from 'inversify-props';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';

export interface IConfigurationProvider {
  getAllForUser(): Promise<ConfigurationListItem[]>;
  load(id: string): Promise<Configuration | null>;
  save(id: string, config: Configuration): Promise<string | null>;
  create(id: string): Promise<Configuration | null>;
  rename(id: string, newName: string): Promise<string | null>;
  delete(id: string): Promise<void>;
  copy(id: string): Promise<string | null>;
  getLogos(): Promise<any[]>;
  removeLogo(name: string): Promise<void>;
  addLogo(formData: FormData): Promise<void>;
}

@injectable()
export class ConfigurationProvider {
  @inject() private localStorageHelper: ILocalStorageHelper;

  private apiBasePath: string = __APIURL__;

  public async getAllForUser(): Promise<ConfigurationListItem[]> {
    const result = await axios.get<ConfigurationListItem[]>(`${this.apiBasePath}/configuration/list`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status !== 200) {
      return [];
    }

    return result.data;
  }

  public async getLogos(): Promise<any[]> {
    const result = await axios.get(`${this.apiBasePath}/configuration/logos`);
    if (result.status !== 200) {
      return [];
    }

    return result.data;
  }

  public async removeLogo(name: string): Promise<void> {
    await axios.delete(`${this.apiBasePath}/configuration/logos?logo=${name}`);
  }

  public async addLogo(formData: FormData): Promise<void> {
    const result = await axios.post(
      `${this.apiBasePath}/configuration/logos`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (result.status !== 200) {
      return;
    }

    return result.data;
  }

  public async load(id: string): Promise<Configuration | null> {
    const userName = this.localStorageHelper.read('user');
    const result = await axios.get(`${this.apiBasePath}/configuration/${userName}/${id}`);
    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }

  public async save(id: string, config: Configuration): Promise<string | null> {
    const result = await axios.put(`${this.apiBasePath}/configuration/${id}`, config, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }

  public async create(id: string): Promise<Configuration | null> {
    const result = await axios.post(
      `${this.apiBasePath}/configuration/create`,
      {
        id: id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }

  public async rename(id: string, newName: string): Promise<string | null> {
    const result = await axios.post(
      `/api/configuration/${id}/rename`,
      {
        newName: newName
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }

  public async delete(id: string): Promise<void> {
    const result = await axios.delete(`${this.apiBasePath}/configuration/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status !== 200) {
      return;
    }

    return result.data;
  }

  public async copy(id: string): Promise<string | null> {
    const result = await axios.post(`${this.apiBasePath}/configuration/${id}/copy`);

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }
}
