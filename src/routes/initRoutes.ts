import VueRouter, { RouterOptions } from 'vue-router';

import { $mainRoutes } from './mainRoutes';

const routes = [
  ...$mainRoutes,   
];

const options: RouterOptions = { mode: 'hash', linkActiveClass: 'active-class', routes: routes };
const router = new VueRouter(options);

router.beforeEach(async (to, from, next) => {
  next();
});

router.afterEach(async (to) => {});

export { router };
