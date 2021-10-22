import { Vue, Options } from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IConfigurationProvider } from '_services/providers/configurationProvider';
import { ConfigurationListItem } from '_models/ConfigurationListItem';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { ICouchpotatoWebsocketConnector } from '_services/connectors/couchpotatoWebsocketConnector';
import { inject } from 'inversify-props';

@Options({
  name: 'WidgetRunCouchpotato',
  template: require('./widgetRunCouchpotato.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon,
  }
})
export class WidgetRunCouchpotato extends Vue {
  @inject() private localStorageHelper: ILocalStorageHelper;
  @inject() private couchpotatoWebsocketConnector: ICouchpotatoWebsocketConnector;
  @inject() private configurationProvider: IConfigurationProvider;

  private configurations: ConfigurationListItem[] = [];
  private couchpotatoPath: string | null = '';
  private isWebsocketAvaliable: boolean = false;

  public async mounted(): Promise<void> {
    this.couchpotatoPath = this.localStorageHelper.read<string>('couchpotatoWebhookPath');
    this.loadConfigurations();
    this.isWebsocketAvaliable = await this.couchpotatoWebsocketConnector.ping();
  }

  private async loadConfigurations(): Promise<void> {
    this.configurations = await this.configurationProvider.getAllForUser();
  }
}
