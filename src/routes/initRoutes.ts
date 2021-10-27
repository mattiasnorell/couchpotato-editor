import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import { $mainRoutes } from './mainRoutes';
import { container, cid } from 'inversify-props';
import { IJwtHelper } from '_services/helpers/jwtHelper';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { IUrlHelper } from '_services/helpers/urlHelper';

const routes = [...$mainRoutes];

//const options: RouterOptions = { mode: 'hash', linkActiveClass: 'active-class', routes: routes };
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    
    if(to.meta.requireAuth){
       
    }
    next();
});

router.afterEach(async (to) => {});

export default router;
