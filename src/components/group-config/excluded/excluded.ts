import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputCheckbox } from '../../base/input-checkbox/inputCheckbox';
import { TableEmptyState } from '../../base/table-empty-state/tableEmptyState';
import { Stream } from '../../../models/Stream';
import { StreamPicker } from '../../base/stream-picker/streamPicker';
import { ModalService } from '../../../services/helpers/modalHelper';

@Component({
  name: 'Excluded',
  template: require('./excluded.pug'),
  components: {
    FontAwesomeIcon,
    InputCheckbox,
    TableEmptyState,
    StreamPicker
  }
})
export class Excluded extends Vue {
  @Prop()
  public title: string;

  @Prop()
  public items: string[];

  private addItem(stream: Stream): void {
    if (!stream) {
      return;
    }

    if (this.items.includes(stream.channelId)) {
      return;
    }

    this.items.push(stream.channelId);
  }

  private removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  private ok(): void {
    const event = new CustomEvent('closeModal', { detail: { asd: true } });
    window.dispatchEvent(event);
  }
}

export class ExcludedProps {
  public title: string;
  public items: string[];
}
