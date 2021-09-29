import axios from 'axios';
import { ILocalStorageRepository } from '_services/repositories/localStorageRepository';
import { inject, injectable } from 'inversify-props';

export interface ICouchpotatoProvider{
  getCouchpotatoVersion(): Promise<string>;
  getCouchpotatoLastRun(): Promise<LastRunResult | null>;
}

@injectable()
export class CouchpotatoProvider {
  @inject() public localStorageRepository: ILocalStorageRepository;
  
  public async getCouchpotatoVersion(): Promise<string> {
    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');
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
    const url = this.localStorageRepository.read<string>('couchpotatoApiPath');
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