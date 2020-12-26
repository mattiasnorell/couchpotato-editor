import Vue from 'vue';
export class ModalService {
  public create<T>(component: T, propsData: object, onClose: Function | null = null) {
    const uniqueId = Date.now().toString();
    const wrapperId = `modalWrapper-${uniqueId}`;
    const modalWrapper = document.createElement('div');
    modalWrapper.id = wrapperId;

    document.body.appendChild(modalWrapper);
    document.body.style.overflow = 'hidden';

    const ctor = Vue.extend(component);
    const vm = new ctor({
      propsData: propsData
    }).$mount(`#${wrapperId}`);

    window.addEventListener('closeModal', (payload: any) => {
      vm.$destroy();
      vm?.$el?.parentNode?.removeChild(vm.$el);

      document.body.style.overflow = 'scroll';

      if (onClose) {
        onClose(payload.detail);
      }
    });
  }
}

const $modalHelper: ModalService = new ModalService();
export { $modalHelper };
