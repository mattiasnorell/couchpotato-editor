import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Stream } from '../../../models/Stream';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '../../base/input-text/inputText';
import { StreamPicker } from '../stream-picker/streamPicker';
import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';

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

  private onStreamPickerBlur(): void{
    this.showStreamPicker = false;
  }
  
  private toggleStreamPicker(): void{
    this.showStreamPicker = !this.showStreamPicker;
  }
}
