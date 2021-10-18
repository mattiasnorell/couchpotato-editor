import axios from 'axios';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { inject } from 'inversify-props';
import { injectable } from 'inversify-props';

export class CronJob {
  id: string;
  hour: number;
  minute: number;
  command: string;
  active: boolean = false;
}

export interface ICronConnector {
  status(): Promise<boolean>;
  getAll(showInactive: boolean): Promise<CronJob[]>;
  create(jobs: CronJob): Promise<CronJob>;
  save(jobs: CronJob[]): Promise<CronJob[]>;
  remove(id: string): Promise<boolean>;
}

@injectable()
export class CronConnector {
  @inject() private localStorageHelper: ILocalStorageHelper;

  public status(): Promise<boolean> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    if(!url){
      return Promise.resolve(false);
    }

    return axios
      .get(`${url}/cron/status/`)
      .then((response) => {
        return response.data.trim() === '* cron is running';
      })
      .catch(() => {
        return false;
      });
  }

  public getAll(showInactive: boolean): Promise<CronJob[]> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    if(!url){
      return Promise.resolve([]);
    }

    return axios
      .get(`${url}/cron/?showInactive=${showInactive}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  }

  public create(jobs: CronJob): Promise<CronJob> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    if(!url){
      return Promise.reject();
    }

    return axios
      .post(`${url}/cron/`, jobs)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  }

  public save(jobs: CronJob[]): Promise<CronJob[]> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    if(!url){
      return Promise.reject();
    }

    return axios
      .put(`${url}/cron/`, jobs)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  }

  public remove(id: string): Promise<boolean> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    if(!url){
      return Promise.reject();
    }
    
    return axios
      .delete(`${url}/cron/${id}/`)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}