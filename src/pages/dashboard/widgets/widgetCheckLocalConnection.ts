import Vue from 'vue';
import Component from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { $couchpotatoWebsocketConnector } from '_services/connectors/couchpotatoWebsocketConnector';

@Component({
  name: 'WidgetCheckLocalConnection',
  template: require('./widgetCheckLocalConnection.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon,
  }
})
export class WidgetCheckLocalConnection extends Vue {
  private isPending: boolean = true;
  private hasConnectionError: boolean = false;
  private isWebsocketAvaliable: boolean = false;

  public async created(): Promise<void> {
    
    const isApiAvaliable = await $couchpotatoConnector.ping().catch(() => {
      return false;
    });

    const isWebsocketAvaliable = await $couchpotatoWebsocketConnector.ping().catch(() => {
      return false;
    });

    this.isPending = false;
    this.hasConnectionError = !isWebsocketAvaliable || !isApiAvaliable;
  }

}
