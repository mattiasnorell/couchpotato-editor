import axios from 'axios';
import { CronJobs } from '_components/cronJobs/cronJobs';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

export class CronJob {
  id: string;
  hour: number;
  minute: number;
  command: string;
  active: boolean = false;
}

class CronConnector {
  public status(): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/cron/status/`)
      .then((response) => {
        return response.data.trim() === '* cron is running';
      })
      .catch((error) => {
        return false;
      });
  }

  public getAll(showInactive: boolean): Promise<CronJob[]> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/cron/?showInactive=${showInactive}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

  public create(jobs: CronJob): Promise<CronJob> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .post(`${url}/cron/`, jobs )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

  public save(jobs: CronJob[]): Promise<CronJob[]> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .put(`${url}/cron/`, jobs )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

  public remove(id: string): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .delete(`${url}/cron/${id}/`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
}

const $cronConnector = new CronConnector();
export { $cronConnector };
