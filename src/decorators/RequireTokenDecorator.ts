import { createDecorator } from 'vue-class-component';
import { VNode } from 'vue';
import { $authProvider, IAuthProvider } from '_services/providers/authProvider';
import { container, cid } from 'inversify-props';

export function RequireTokenDecorator(redirectToLogin: boolean = true): ClassDecorator {
  const authProvider = container.get<IAuthProvider>(cid.IAuthProvider);
  
  return createDecorator((compOptions, handler) => {
    compOptions.beforeCreate = function (this: Vue) {
      const isLoggedIn = authProvider.checkToken();

      if (!isLoggedIn) {
        this.$options.render = function () {
          return <VNode>{};
        };

        this.$options.beforeCreate = undefined;
        this.$options.beforeMount = undefined;
        this.$options.created = undefined;
        this.$options.mounted = undefined;

        if (redirectToLogin) {
          this.$router.push('/login');
        }
      }
    };
  });
}
