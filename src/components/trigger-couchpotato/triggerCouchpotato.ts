import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { IModalHelper } from '_services/helpers/modalHelper';
import { Prop, Inject } from 'vue-property-decorator';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { inject } from 'inversify-props';

@Component({
  name: 'TriggerCouchpotato',
  template: require('./triggerCouchpotato.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class TriggerCouchpotato extends Vue {
  @inject() public languageRepository: ILanguageRepository;
  @inject() public modalHelper: IModalHelper;

  @Prop()
  public configurationId: string;

  @Prop({type: Boolean, default: false})
  public disabled: boolean;


  private async onClick(): Promise<void> {
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = `${this.languageRepository.get('triggerCouchpotato')} ${this.languageRepository.get('for')} ${this.configurationId}`;
    props.action = 'import';
    props.url = this.configurationId;

    this.modalHelper.create<typeof WebSocketModal>(WebSocketModal, props);
  }
}
