const AbstractRouterView = () => import(/* webpackChunkName: "routes" */ '../components/base/abstract-router-view/abstractRouterView');
const EditorList = () => import(/* webpackChunkName: "routes" */ '../pages/editor/list/editorList');
const EditorEdit = () => import(/* webpackChunkName: "routes" */ '../pages/editor/edit/editorEdit');

import { RouteLink } from '../models/Route';

const $editorRoutes = <RouteLink[]>[
  {
    name: 'editor',
    path: '/editor',
    component: AbstractRouterView,
    props: false,
    meta: {
      showInMenu: true,
      menuTranslationKey: 'menuEditor',
      menuIcon: 'edit'
    },
    children: [
      {
        name: 'editor',
        path: '',
        component: EditorList,
        props: true,
        meta: {
          showInMenu: false
        }
      },
      {
        name: 'editor',
        path: ':id',
        component: EditorEdit,
        props: true,
        meta: {
          showInMenu: false
        }
      }
    ]
  },
];

export { $editorRoutes };