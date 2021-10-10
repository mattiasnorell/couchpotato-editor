import axios from 'axios';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { injectable, inject } from 'inversify-props';

export class CouchpotatoPlugin {
  public name: string = '';
  public version: string = '';
  public active: boolean = false;
}

export interface ICouchpotatoPluginConnector {
  getInstalled(): Promise<CouchpotatoPlugin[]>;
  getSettings(pluginId: string): Promise<{ [key: string]: any }>;
  activate(pluginId: string): Promise<boolean>;
  deactivate(pluginId: string): Promise<boolean>;
  saveSettings(pluginId: string, settings: { [key: string]: any }): Promise<{ [key: string]: any }>;
  getSettingsFile(path: string): Promise<string>;
  saveSettingsFile(path: string, contents: string): Promise<boolean>;
  uninstall(pluginId: string): Promise<boolean>;
}

@injectable()
export class CouchpotatoPluginConnector {
  @inject() private localStorageHelper: ILocalStorageHelper;


  public async getInstalled(): Promise<CouchpotatoPlugin[]> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/installed/`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  }

  public async getSettings(pluginId: string): Promise<{ [key: string]: any }> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/settings/${pluginId}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  }

  public async activate(pluginId: string): Promise<boolean> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/activate/${pluginId}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
  }

  public async deactivate(pluginId: string): Promise<boolean> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/deactivate/${pluginId}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return false;
      });
  }

  public async saveSettings(pluginId: string, settings: { [key: string]: any }): Promise<{ [key: string]: any }> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    return axios
      .post(`${url}/plugins/settings/${pluginId}`, settings)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  }

  public async getSettingsFile(path: string): Promise<string> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/settings/file/?path=${encodeURIComponent(path)}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return [];
      });
  }

  public async saveSettingsFile(path: string, contents: string): Promise<boolean> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');
    const settings = {
      path: path,
      contents: contents
    }

    return axios
      .post(`${url}/plugins/settings/file/`, settings)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  public async uninstall(pluginId: string): Promise<boolean> {
    const url = this.localStorageHelper.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/uninstall/${pluginId}`)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}