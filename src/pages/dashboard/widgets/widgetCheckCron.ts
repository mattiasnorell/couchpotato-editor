import Vue from 'vue';
import Component from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { $cronConnector } from '_services/connectors/cronConnector';

@Component({
  name: 'WidgetCheckCron',
  template: require('./widgetCheckCron.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon
  }
})
export class WidgetCheckCron extends Vue {
  private isPending: boolean = true;
  private isRunning: boolean = false;

  public async created(): Promise<void> {
    const isApiAvaliable = await $couchpotatoConnector.ping().catch(() => {
      return false;
    });

    if (!isApiAvaliable) {
      this.isPending = false;
      this.isRunning = false;
    }

    const result = await $cronConnector.status().catch(() => {
      return false;
    });

    this.isPending = false;
    this.isRunning = result;
  }
}
