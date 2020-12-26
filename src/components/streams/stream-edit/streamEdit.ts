import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputText } from '../../base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Stream } from '../../../models/Stream';

@Component({
  name: 'StreamEdit',
  template: require('./streamEdit.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class StreamEdit extends Vue {
  @Prop()
  public title: string;

  @Prop()
  public stream: Stream;


  public async created(): Promise<void> {
   
  }

  private ok(): void {
    const event = new CustomEvent('closeModal');
    window.dispatchEvent(event);
  }
}

export class StreamEditProps {
  public title: string = '';
  public stream: Stream;
}
