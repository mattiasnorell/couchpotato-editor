import axios from 'axios';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

export class CouchpotatoPlugin{
  public name: string = '';
  public version: string = '';
  public active: boolean = false;
}

class CouchpotatoPluginConnector {
  public async getInstalled(): Promise<CouchpotatoPlugin[]> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/installed/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

  public async getSettings(pluginId: string): Promise<{ [key: string]: any }> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/settings/${pluginId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

  public async activate(pluginId: string): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
    
    return axios
      .get(`${url}/plugins/activate/${pluginId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return false;
      });
  }

  public async deactivate(pluginId: string): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
    
    return axios
      .get(`${url}/plugins/deactivate/${pluginId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return false;
      });
  }

  public async saveSettings(pluginId: string, settings: { [key: string]: any }): Promise<{ [key: string]: any }> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .post(`${url}/plugins/settings/${pluginId}`, settings)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

  public async getSettingsFile(path: string): Promise<string> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/settings/file/?path=${encodeURIComponent(path)}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      });
  }

  public async saveSettingsFile(path: string, contents: string): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');
    const settings = {
      path: path,
      contents: contents
    }

    return axios
      .post(`${url}/plugins/settings/file/`, settings)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  public async uninstall(pluginId: string): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoApiPath');

    return axios
      .get(`${url}/plugins/uninstall/${pluginId}`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
}

const $couchpotatoPluginConnector = new CouchpotatoPluginConnector();
export { $couchpotatoPluginConnector };
