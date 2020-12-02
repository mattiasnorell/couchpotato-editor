const App = () => import(/* webpackChunkName: "app" */ '../components/app/App');

import { RouteLink } from '../models/Route';

const $mainRoutes = <RouteLink[]>[
  {
    name: 'home',
    path: '/',
    component: App,
    props: false,
    meta: {}
  }
];

export { $mainRoutes };