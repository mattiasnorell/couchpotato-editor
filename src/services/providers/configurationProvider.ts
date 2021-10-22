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
}

@injectable()
export class ConfigurationProvider {
  @inject() private localStorageHelper: ILocalStorageHelper;
  
  private apiBasePath: string = 'http://couchpotato.automagiskdatabehandling.se.185-133-206-111.preview.beeweb.se/api';

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

  public async load(id: string): Promise<Configuration | null> {
    const result = await axios.get(`${this.apiBasePath}/configuration/${id}`);
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
