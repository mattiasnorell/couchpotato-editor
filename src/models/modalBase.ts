import Vue from 'vue';
import { Prop, Ref } from 'vue-property-decorator';

export class ModalBase extends Vue {
  @Prop({type: String, default: ''})
  public modalId: string;

  closeModal(result: any = null): void {
    const event = new CustomEvent(`closeModal-${this.modalId}`, { detail: result });
    window.dispatchEvent(event);
  }
}