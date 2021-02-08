import axios from 'axios';
import { Configuration } from '_models/Configuration';
import { ConfigurationListItem } from '_models/ConfigurationListItem';

class ConfigurationProvider {
  private apiBasePath: string = 'http://couchpotato.automagiskdatabehandling.se/api';

  public async getAllForUser(id: string): Promise<ConfigurationListItem[]> {
    const result = await axios.get<ConfigurationListItem[]>(`${this.apiBasePath}/configuration/${id}`, {
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
    const result = await axios.get(`/config/${id}.json`);
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
      `/api/configuration`,
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
    const result = await axios.post(`${this.apiBasePath}/configuration/copy`, { id: id });

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }
}

const $configurationProvider = new ConfigurationProvider();
export { $configurationProvider };
