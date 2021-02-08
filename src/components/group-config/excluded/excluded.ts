import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { TableEmptyState } from '_components/base/table-empty-state/tableEmptyState';
import { Stream } from '_models/Stream';
import { StreamPicker } from '_components/base/stream-picker/streamPicker';
import { ModalBase } from '_models/modalBase';

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
export class Excluded extends ModalBase {
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
    super.closeModal(true);
  }
}

export class ExcludedProps {
  public title: string;
  public items: string[];
}
