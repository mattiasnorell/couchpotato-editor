import axios from 'axios';
import { ConfigurationListItem } from '_models/ConfigurationListItem';
import { ILocalStorageRepository } from '_services/repositories/localStorageRepository';
import { inject, injectable } from 'inversify-props';

export interface ILogProvider {
  getAll(): Promise<string[]>;
  get(id: string): Promise<string>;
  deleteLog(id: string): Promise<boolean>;
}

@injectable()
export class LogProvider {
  @inject() public localStorageRepository: ILocalStorageRepository;

  public async getAll(): Promise<string[]> {

    const url = this.localStorageRepository.read<string[]>('couchpotatoApiPath');
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

    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');
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

    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');
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
