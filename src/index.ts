import "reflect-metadata";
import Vue from 'vue';
import VueRouter from 'vue-router';

import './style/style.scss';
import { $filters } from './filters';
import { router } from './routes/initRoutes';
import '_services/interceptors/axiosAuthInterceptor';
import '_services/interceptors/axiosErrorInterceptor';
import buildContainer from './config/ioc';
import '_services/helpers/fontAwesomeHelper';

Vue.use($filters);
Vue.use(VueRouter);

buildContainer();
const appElement: HTMLElement | null = document.getElementById('app');

if (appElement) {
  new Vue({
    router
  }).$mount(appElement);
}
