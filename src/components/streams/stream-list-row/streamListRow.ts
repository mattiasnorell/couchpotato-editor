import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Stream } from '_models/Stream';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { StreamPicker } from '_components/base/stream-picker/streamPicker';
import { StreamEdit, StreamEditProps } from '_components/streams/stream-edit/streamEdit';
import { $modalHelper } from '_services/helpers/modalHelper';

@Component({
  name: 'StreamListRow',
  template: require('./streamListRow.pug'),
  components: {
    FontAwesomeIcon,
    InputText,
    StreamPicker
  }
})
export class StreamListRow extends Vue {
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

    $modalHelper.create<typeof StreamEdit>(StreamEdit, props, () => {});
  }
}
