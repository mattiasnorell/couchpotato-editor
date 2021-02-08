import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { $modalHelper } from '_services/helpers/modalHelper';
import { Prop } from 'vue-property-decorator';
import { $languageRepository } from '_services/repositories/languageRepository';

@Component({
  name: 'TriggerCouchpotato',
  template: require('./triggerCouchpotato.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class TriggerCouchpotato extends Vue {
  @Prop()
  public configurationId: string;

  @Prop({type: Boolean, default: false})
  public disabled: boolean;

  private async onClick(): Promise<void> {
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = `${$languageRepository.get('triggerCouchpotato')} ${$languageRepository.get('for')} ${this.configurationId}`;
    props.action = 'import';
    props.url = this.configurationId;

    $modalHelper.create<typeof WebSocketModal>(WebSocketModal, props);
  }
}
