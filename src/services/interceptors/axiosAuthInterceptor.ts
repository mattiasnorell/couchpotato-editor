import axios, { AxiosRequestConfig } from 'axios';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { container, cid } from 'inversify-props';


axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const localStorageHelper = container.get<ILocalStorageHelper>(cid.ILocalStorageHelper)
  const token = localStorageHelper.read<string>('token');
  const apiPath = localStorageHelper.read<string>('couchpotatoApiPath');

  if (apiPath && config.url ?.includes(apiPath) && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});