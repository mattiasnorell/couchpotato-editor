const EditorList = () => import(/* webpackChunkName: "routes" */ '../pages/editor/list/editorList');
const EditorEdit = () => import(/* webpackChunkName: "routes" */ '../pages/editor/edit/editorEdit');
import { RouteRecordRaw } from 'vue-router';

const $editorRoutes = <RouteRecordRaw[]>[
    {
        name: 'editorList',
        path: '/editor',
        component: EditorList,
        props: true,
        meta: {
            menuTranslationKey: 'menuEditor',
            menuIcon: 'edit',
            showInMenu: true
        }
    },
    {
        name: 'editor',
        path: '/editor/:id',
        component: EditorEdit,
        props: true,
        meta: {
            showInMenu: false
        }
    }
];

export { $editorRoutes };
