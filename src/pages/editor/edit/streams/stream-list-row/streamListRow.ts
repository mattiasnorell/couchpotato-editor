import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { Stream } from '_models/Stream';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { StreamPicker } from '_components/base/stream-picker/streamPicker';
import { StreamEdit, StreamEditProps } from '../stream-edit/streamEdit';
import { StreamLogo } from '../stream-logo/streamLogo';
import { IModalHelper } from '_services/helpers/modalHelper';
import { inject } from 'inversify-props';

@Options({
  name: 'StreamListRow',
  template: require('./streamListRow.pug'),
  components: {
    FontAwesomeIcon,
    InputText,
    StreamPicker,
    StreamLogo
  }
})
export class StreamListRow extends Vue {
  @inject() private modalHelper: IModalHelper;
  
  @Prop()
  private stream: Stream;
  private showStreamPicker: boolean = false;

  private remove(): void {
    this.$emit('onRemove');
  }

  private updateStreamId(stream: Stream): void {
    if (!stream) {
      return;
    }

    this.stream.channelId = stream.channelId;
    this.showStreamPicker = false;
  }

  private onStreamPickerBlur(): void {
    this.showStreamPicker = false;
  }

  private toggleStreamPicker(): void {
    this.showStreamPicker = !this.showStreamPicker;
  }

  private openEditModal(): void {
    const props: StreamEditProps = new StreamEditProps();
    props.title = `Redigera ${this.stream.channelId}`;
    props.stream = this.stream;

    this.modalHelper.create<typeof StreamEdit>(StreamEdit, props, () => {
    
    });
  }
}
