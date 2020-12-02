import Vue from 'vue';
import Component from 'vue-class-component';
import { Stream } from '../../../models/Stream';
import { StreamPicker } from '../stream-picker/streamPicker';
import { InputText } from '../../base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
    name: 'AddStream',
    template: require('./addStream.pug'),
    components: {
      StreamPicker,
      InputText,
      FontAwesomeIcon
    }
})
export class AddStream extends Vue {

  private add(stream: Stream): void{
    this.$emit('onAdd', stream);
  }
}