import axios, { AxiosRequestConfig } from 'axios';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = $localStorageRepository.read<string>('couchpotatoAccessToken');
    const apiPath = $localStorageRepository.read<string>('couchpotatoApiPath');

  if (apiPath && config.url?.includes(apiPath) && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});