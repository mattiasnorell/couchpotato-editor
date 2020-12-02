import axios from 'axios';
import { Configuration } from '../../models/Configuration';

class ConfigurationProvider {
  public async load(id: string): Promise<Configuration | null> {
    const result = await axios.get(`/config/${id}.json`);
    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }

  public async save(id: string, config: Configuration): Promise<string | null> {
    const result = await axios.post(`/api/configuration/${id}`, config, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }
}

const $configurationProvider = new ConfigurationProvider();
export { $configurationProvider };
