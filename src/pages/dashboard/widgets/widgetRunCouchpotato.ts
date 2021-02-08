import Vue from 'vue';
import Component from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $configurationProvider } from '_services/providers/configurationProvider';
import { ConfigurationListItem } from '_models/ConfigurationListItem';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { $couchpotatoWebsocketConnector } from '_services/connectors/couchpotatoWebsocketConnector';

@Component({
  name: 'WidgetRunCouchpotato',
  template: require('./widgetRunCouchpotato.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon,
  }
})
export class WidgetRunCouchpotato extends Vue {
  private configurations: ConfigurationListItem[] = [];
  private couchpotatoPath: string | null = '';
  private isWebsocketAvaliable: boolean = false;

  public async created(): Promise<void> {
    this.couchpotatoPath = $localStorageRepository.read<string>('couchpotatoWebhookPath');
    this.loadConfigurations();
    this.isWebsocketAvaliable = await $couchpotatoWebsocketConnector.ping();
  }

  private async loadConfigurations(): Promise<void> {
    this.configurations = await $configurationProvider.getAllForUser('');
  }
}
