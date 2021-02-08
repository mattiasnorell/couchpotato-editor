import axios, { CancelToken } from 'axios';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class CouchpotatoConnector {
  public ping(): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
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
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

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
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

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
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

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

const $couchpotatoConnector = new CouchpotatoConnector();
export { $couchpotatoConnector };
