import axios from 'axios';
import { ConfigurationListItem } from '_models/ConfigurationListItem';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class LogProvider {

  public async getAll(): Promise<string[]> {

    const url = $localStorageRepository.read<string[]>('couchpotatoApiPath');
    const result = await axios.get<string[]>(`${url}/couchpotato/logs/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status !== 200) {
      return [];
    }
    
    return result.data;
  }

  public async get(id: string): Promise<string> {

    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
    const result = await axios.get<string>(`${url}/couchpotato/logs/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status !== 200) {
      return '';
    }
    
    return result.data;
  }

  public async deleteLog(id: string): Promise<boolean> {

    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
    const result = await axios.delete(`${url}/couchpotato/logs/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status !== 200) {
      return false;
    }
    
    return true;
  }

}

const $logProvider = new LogProvider();
export { $logProvider };
