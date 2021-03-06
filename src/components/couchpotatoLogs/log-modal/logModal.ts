import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { ModalBase } from '_models/modalBase';
import { $logProvider } from '_services/providers/logProvider';

@Component({
  name: 'LogModal',
  template: require('./logModal.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class LogModal extends ModalBase {
  @Prop()
  public logId: string;

  private isPending: boolean = false;
  private contents: string = '';

  private async created(): Promise<void> {
    const result = await $logProvider.get(this.logId);

    if (result) {
      this.contents = typeof result === 'string' ? result : JSON.stringify(result, undefined, 3);
    }
  }

  private close(): void {
    super.closeModal();
  }
}
