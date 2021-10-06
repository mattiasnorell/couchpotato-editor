import { Vue, Options } from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ICouchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { ICronConnector } from '_services/connectors/cronConnector';
import { inject } from 'inversify-props';

@Options({
  name: 'WidgetCheckCron',
  template: require('./widgetCheckCron.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon
  }
})
export class WidgetCheckCron extends Vue {
  @inject() public couchpotatoConnector: ICouchpotatoConnector;
  @inject() public cronConnector: ICronConnector;
  
  private isPending: boolean = true;
  private isRunning: boolean = false;

  public async created(): Promise<void> {
    const isApiAvaliable = await this.couchpotatoConnector.ping().catch(() => {
      return false;
    });

    if (!isApiAvaliable) {
      this.isPending = false;
      this.isRunning = false;
    }

    const result = await this.cronConnector.status().catch(() => {
      return false;
    });

    this.isPending = false;
    this.isRunning = result;
  }
}
