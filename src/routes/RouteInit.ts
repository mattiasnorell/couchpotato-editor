import VueRouter from 'vue-router';

import { $mainRoutes } from './mainRoutes';


const $routes = [
  ...$mainRoutes,
];

const router = new VueRouter({ routes: $routes });

router.beforeEach(async (to, from, next) => {
  next();
});

router.beforeEach(async (to, from, next) => {
  next();
});

router.beforeEach(async (to, from, next) => {
  next();
});

router.afterEach(async (to) => {});

export { router };
