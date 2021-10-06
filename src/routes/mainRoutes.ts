import { RouteRecordRaw } from 'vue-router';
import { RouteLink } from '../models/Route';
import { $editorRoutes } from './editorRoutes';

const Start = () => import(/* webpackChunkName: "routes" */ '../pages/start/start');
const Login = () => import(/* webpackChunkName: "routes" */ '../pages/login/login');
const Dashboard = () => import(/* webpackChunkName: "routes" */ '../pages/dashboard/dashboard');
const Settings = () => import(/* webpackChunkName: "routes" */ '../pages/settings/settings');
const AbstractRouterView = () => import(/* webpackChunkName: "routes" */ '../components/base/abstract-router-view/abstractRouterView');

const $mainRoutes = <RouteRecordRaw[]>[
  {
    name: 'start',
    path: '/',
    redirect: '/dashboard',
    component: Start,
    props: false,
    meta: {
      showInMenu: false,
      
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    props: false,
    meta: {
      showInMenu: false
    }
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    props: false,
    meta: {
      showInMenu: true,
      menuTranslationKey: 'menuDashboard',
      menuIcon: 'home'
    }
  },
  ...$editorRoutes,
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
    props: false,
    meta: {
      showInMenu: true,
      menuTranslationKey: 'menuSettings',
      menuIcon: 'cog'
    }
  }
];

export { $mainRoutes };
