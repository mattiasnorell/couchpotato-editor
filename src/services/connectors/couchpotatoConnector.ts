import axios, { CancelToken } from 'axios';
import { ILocalStorageRepository } from '_services/repositories/localStorageRepository';
import { injectable, inject } from 'inversify-props';

export interface ICouchpotatoConnector{
  ping(): Promise<boolean>;
  restartBackend(): Promise<boolean>;
  updateBackend(): Promise<boolean>;
  restartCron(): Promise<boolean>;
}

@injectable()
export class CouchpotatoConnector {
  @inject() public localStorageRepository: ILocalStorageRepository;

  public ping(): Promise<boolean> {
    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');
    const timeout = axios.CancelToken.source();
    setTimeout(() => {
      timeout.cancel();
    }, 3000);

    return axios
      .get(`${url}/ping/`, { cancelToken: timeout.token })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  public restartBackend(): Promise<boolean> {
    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/restartbackend/`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  public updateBackend(): Promise<boolean> {
    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/backend/update/`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  public restartCron(): Promise<boolean> {
    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/cron/restart/`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
}