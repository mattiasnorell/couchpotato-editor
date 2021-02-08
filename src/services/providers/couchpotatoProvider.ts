import axios from 'axios';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class CouchpotatoProvider {
  public async getCouchpotatoVersion(): Promise<string> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
    const timeout = axios.CancelToken.source();
    setTimeout(() => {
      timeout.cancel();
    }, 3000);

    const result = await axios.get<string>(`${url}/couchpotato/version/`, { cancelToken: timeout.token });

    if (result.status !== 200) {
      return '';
    }

    return result.data;
  }

  public async getCouchpotatoLastRun(): Promise<LastRunResult | null> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
    const timeout = axios.CancelToken.source();
    setTimeout(() => {
      timeout.cancel();
    }, 3000);

    const result = await axios.get<LastRunResult>(`${url}/couchpotato/lastrun/`, { cancelToken: timeout.token });

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }
}

export class LastRunResult {
  public missingStreams: string[] = [];
  public validationErrors: string[] = [];
  public epgErrors: string[] = [];
}

const $couchpotatoProvider = new CouchpotatoProvider();
export { $couchpotatoProvider };
