import axios, { AxiosRequestConfig } from 'axios';
import { ILocalStorageRepository } from '_services/repositories/localStorageRepository';
import { container, cid } from 'inversify-props';


axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const localStorageRepository = container.get<ILocalStorageRepository>(cid.ILocalStorageRepository)
  const token = localStorageRepository.read<string>('couchpotatoAccessToken');
  const apiPath = localStorageRepository.read<string>('couchpotatoApiPath');

  if (apiPath && config.url ?.includes(apiPath) && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});