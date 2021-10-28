import { Vue, Options } from 'vue-class-component';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { IModalHelper } from '_services/helpers/modalHelper';
import { Prop } from 'vue-property-decorator';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { inject } from 'inversify-props';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';

@Options({
  name: 'TriggerCouchpotato',
  template: require('./triggerCouchpotato.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class TriggerCouchpotato extends Vue {
  @inject() public languageRepository: ILanguageRepository;
  @inject() public modalHelper: IModalHelper;
  @inject() public localStorageHelper: ILocalStorageHelper;

  @Prop()
  public configurationId: string;

  @Prop({type: Boolean, default: false})
  public disabled: boolean;


  private async onClick(): Promise<void> {
    const username = this.localStorageHelper.read<string>('user');
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = `${this.languageRepository.get('triggerCouchpotato')} ${this.languageRepository.get('for')} ${this.configurationId}`;
    props.action = 'import';
    props.url = `${username}/${this.configurationId}`;

    this.modalHelper.create<typeof WebSocketModal>(WebSocketModal, props);
  }
}
