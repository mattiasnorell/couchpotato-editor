import { Vue, createDecorator } from "vue-class-component";
import { VNode } from "vue";
import { container, cid } from "inversify-props";
import { IJwtHelper } from "_services/helpers/jwtHelper";
import { ILocalStorageHelper } from "_services/helpers/localStorageHelper";

export function AuthDecorator(): ClassDecorator {

    const localStorageHelper = container.get<ILocalStorageHelper>(cid.ILocalStorageHelper);
    const jwtHelper = container.get<IJwtHelper>(cid.IJwtHelper);


    return createDecorator((compOptions, handler) => {
        
    });
}