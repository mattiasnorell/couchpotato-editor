import { Vue, Options } from 'vue-class-component';

import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ICouchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { ICouchpotatoWebsocketConnector } from '_services/connectors/couchpotatoWebsocketConnector';
import { ICouchpotatoPluginConnector } from '_services/connectors/couchpotatoPluginConnector';
import { inject } from 'inversify-props';
import { ICouchpotatoProvider } from '_services/providers/couchpotatoProvider';

@Options({
  name: 'WidgetCheckLocalConnection',
  template: require('./widgetCheckLocalConnection.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon,
  }
})
export class WidgetCheckLocalConnection extends Vue {
  @inject() public couchpotatoConnector: ICouchpotatoConnector;
  @inject() public couchpotatoWebsocketConnector: ICouchpotatoWebsocketConnector;

  private isPending: boolean = true;
  private hasConnectionError: boolean = false;
  private isWebsocketAvaliable: boolean = false;

  public async created(): Promise<void> {
    
    const isApiAvaliable = await this.couchpotatoConnector.ping().catch(() => {
      return false;
    });

    const isWebsocketAvaliable = await this.couchpotatoWebsocketConnector.ping().catch(() => {
      return false;
    });

    this.isPending = false;
    this.hasConnectionError = !isWebsocketAvaliable || !isApiAvaliable;
  }

}
