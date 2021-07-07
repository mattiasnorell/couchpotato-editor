import Vue from 'vue';
import VueRouter from 'vue-router';

import './style/style.scss';
import { $filters } from './filters';
import { router } from './routes/initRoutes';
import { library } from '@fortawesome/fontawesome-svg-core';
import '_services/interceptors/axiosAuthInterceptor';
import '_services/interceptors/axiosErrorInterceptor';

import {
  faTrash,
  faEdit,
  faPlus,
  faSave,
  faSpinner,
  faChevronUp,
  faChevronDown,
  faCopy,
  faThumbsUp,
  faFilter,
  faThumbsDown,
  faTimes,
  faFileImport,
  faFileExport,
  faPlay,
  faHome,
  faInfo,
  faArchive,
  faHamburger,
  faTools,
  faCouch,
  faSyncAlt,
  faDownload,
  faFileSignature,
  faCog,
  faExclamationTriangle,
  faList,
  faSignOutAlt,
  faSignInAlt,
  faCheckSquare,
  faEye,
  faArrowsAlt
} from '@fortawesome/free-solid-svg-icons';

Vue.use($filters);
Vue.use(VueRouter);

library.add(
  faArchive,
  faTrash,
  faHome,
  faPlus,
  faEdit,
  faSave,
  faSpinner,
  faChevronUp,
  faChevronDown,
  faCopy,
  faThumbsUp,
  faFilter,
  faThumbsDown,
  faTimes,
  faFileImport,
  faArrowsAlt,
  faFileExport,
  faPlay,
  faInfo,
  faHamburger,
  faTools,
  faCouch,
  faSyncAlt,
  faDownload,
  faFileSignature,
  faCog,
  faExclamationTriangle,
  faList,
  faSignOutAlt,
  faSignInAlt,
  faCheckSquare,
  faEye,
  faInfo
);

const appElement: HTMLElement | null = document.getElementById('app');

if (appElement) {
  new Vue({
    router
  }).$mount(appElement);
}
