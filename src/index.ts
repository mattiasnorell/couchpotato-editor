import Vue from 'vue';
import { App } from './components/app/app';
import './style/style.scss';
import { $filters } from './filters';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash,
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
  faInfo
} from '@fortawesome/free-solid-svg-icons';

Vue.use($filters);
library.add(
  faTrash,
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
  faInfo
);

const appElement: HTMLElement | null = document.getElementById('app');

if (appElement) {
  let app: Vue | null = new App();

  if (app) {
    app.$mount(appElement);
  } else {
    console.warn(`Cant start app.`);
  }
}
