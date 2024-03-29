import axios from 'axios';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { inject, injectable } from 'inversify-props';

export interface ICouchpotatoProvider{
  getCouchpotatoVersion(): Promise<string>;
  getCouchpotatoLastRun(): Promise<LastRunResult | null>;
}

@injectable()
export class CouchpotatoProvider {
  @inject() public localStorageHelper: ILocalStorageHelper;
  
  public async getCouchpotatoVersion(): Promise<string> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    if(!url){
      return Promise.reject();
    }
    
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
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    if(!url){
      return Promise.reject();
    }

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