import { IGuidHelper } from './guidHelper';
import { injectable, inject } from 'inversify-props';
import { defineComponent, createApp, getCurrentInstance, h, Component, DefineComponent } from 'vue';

export interface IModalHelper {
    create<T>(component: T, propsData: object, onClose?: Function | null): void;
}

@injectable()
export class ModalHelper {
    @inject()
    private guidHelper: IGuidHelper;

    public create<T>(component: T, propsData: object, onClose: Function | null = null): void {
        const instance = getCurrentInstance();
        const filters = instance?.appContext.config.globalProperties.$filters;

        const uniqueId = this.guidHelper.generate();
        const wrapperId = `modal-${uniqueId}`;
        const modalWrapper = document.createElement('div');
        modalWrapper.id = wrapperId;
        document.body.appendChild(modalWrapper);
        document.body.style.overflow = 'hidden';

        const props = { ...propsData, modalId: uniqueId };
        const comp = defineComponent({
            extends: component,
            template: "<h1>Dildo</h1>",
            props: {...propsData }
        });

        const app = createApp(comp)

        //const app = createApp({ render: () => h(comp) });
        app.config.globalProperties.$filters = filters;

        app.mount(`#${wrapperId}`);

        window.addEventListener(`closeModal-${uniqueId}`, (payload: any) => {
            //vm.$destroy();
            app.unmount();
            modalWrapper.parentNode?.removeChild(modalWrapper);

            document.body.style.overflow = 'scroll';

            if (onClose) {
                onClose(payload.detail);
            }
        });
    }
}
