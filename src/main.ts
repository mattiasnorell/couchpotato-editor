import 'reflect-metadata';
import { createApp } from 'vue';

import './style/style.css';
import router from './routes/initRoutes';
import '_services/interceptors/axiosAuthInterceptor';
import '_services/interceptors/axiosErrorInterceptor';

import buildContainer from './config/ioc';
import '_services/helpers/fontAwesomeHelper';
import App from './App';
import { $filters } from './filters';


buildContainer();

const appElement: HTMLElement | null = document.getElementById('app');

if (appElement) {
    const app = createApp(App);
    
    app.config.globalProperties.$filters =  $filters;

    app.use(router).use(router).mount(appElement);
}