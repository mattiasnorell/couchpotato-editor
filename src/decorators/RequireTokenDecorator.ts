import { Vue, createDecorator } from 'vue-class-component';
import { VNode } from 'vue';
import { container, cid } from 'inversify-props';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { IJwtHelper } from '_services/helpers/jwtHelper';

export function RequireTokenDecorator(redirectToLogin: boolean = true): ClassDecorator {
    const localStorageHelper = container.get<ILocalStorageHelper>(cid.ILocalStorageHelper);
    const jwtHelper = container.get<IJwtHelper>(cid.IJwtHelper);

    return createDecorator((compOptions, handler) => {
        compOptions.beforeCreate = function (this: Vue) {

            const token = localStorageHelper.read<string>('token');
            if (!token) {
                this.$router.push('login');
                return;
            }

            const isValid = jwtHelper.isTokenValid(token);
            if (!isValid) {

                

                this.$options.beforeCreate = undefined;
                this.$options.beforeMount = undefined;
                this.$options.created = undefined;
                this.$options.mounted = undefined;
                this.$options.render = function () {
                    return <VNode>{};
                };

                this.$router.push({name: 'login'});

                return;
            }

        };
    });
}
