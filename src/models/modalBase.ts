import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export class ModalBase extends Vue {
  @Prop({type: String, default: ''})
  public modalId: string;

  closeModal(result: any = null): void {
    const event = new CustomEvent(`closeModal-${this.modalId}`, { detail: result });
    window.dispatchEvent(event);
  }
}