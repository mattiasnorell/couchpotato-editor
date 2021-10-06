import { Vue, createDecorator } from "vue-class-component";
import { VNode } from "vue";
import { IAuthProvider } from "_services/providers/authProvider";
import { container, cid } from "inversify-props";

export function AuthDecorator(): ClassDecorator {
    const authProvider = container.get<IAuthProvider>(cid.IAuthProvider);
    
    return createDecorator((compOptions, handler) => {
        compOptions.beforeCreate = function(this:Vue) {
            const isLoggedIn = authProvider.checkToken();
            
            if(!isLoggedIn){
                return;
            }
            
            this.$options.render = function() {
                return <VNode>{};
            }
            this.$options.beforeCreate = undefined;
            this.$options.beforeMount = undefined;
            this.$options.created = undefined;
            this.$options.mounted = undefined;
        }
    });
}