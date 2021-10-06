import { IGuidHelper } from './guidHelper';
import { injectable, inject } from 'inversify-props';
import { createApp  } from 'vue';
import { $filters } from 'src/filters';

export interface IModalHelper {
    create<T>(component: T, propsData: object, onClose?: Function | null): void;
}

@injectable()
export class ModalHelper {
    @inject()
    private guidHelper: IGuidHelper;

    public create<T>(component: T, propsData: object, onClose: Function | null = null): void {
        
        const uniqueId = this.guidHelper.generate();
        const wrapperId = `modal-${uniqueId}`;
        const modalWrapper = document.createElement('div');
        modalWrapper.id = wrapperId;
        document.body.appendChild(modalWrapper);
        document.body.style.overflow = 'hidden';

        const props = { ...propsData, modalId: uniqueId };
        const app = createApp(component, { ...props });
        console.log($filters)
        app.config.globalProperties.$filters = $filters;

        app.mount(`#${wrapperId}`);

        window.addEventListener(`closeModal-${uniqueId}`, (payload: any) => {
            //vm.$destroy();
            app.unmount();
            modalWrapper.parentNode ?.removeChild(modalWrapper);

            document.body.style.overflow = 'scroll';

            if (onClose) {
                onClose(payload.detail);
            }
        });
    }
}
