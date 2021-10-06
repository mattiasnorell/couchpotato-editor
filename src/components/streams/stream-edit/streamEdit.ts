import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputText } from '_components/base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Stream } from '_models/Stream';
import { ModalBase } from '_models/modalBase';

@Options({
  name: 'StreamEdit',
  template: require('./streamEdit.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class StreamEdit extends ModalBase {
  @Prop()
  public title: string;

  @Prop()
  public stream: Stream;

  public async created(): Promise<void> {}

  private ok(): void {
    super.closeModal();
  }
}

export class StreamEditProps {
  public title: string = '';
  public stream: Stream;
}
