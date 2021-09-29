import Vue from 'vue';
import Component from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ICouchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { IGitHubProvider } from '_services/providers/githubProvider';
import { ICouchpotatoProvider } from '_services/providers/couchpotatoProvider';
import { inject } from 'inversify-props';

@Component({
  name: 'WidgetCheckCouchpotatoVersion',
  template: require('./widgetCheckCouchpotatoVersion.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon
  }
})
export class WidgetCheckCouchpotatoVersion extends Vue {
  @inject() public couchpotatoProvider: ICouchpotatoProvider;
  @inject() public gitHubProvider: IGitHubProvider;

  private isPending: boolean = true;
  private hasError: boolean = false;
  private hasNewVersion: boolean = false;
  private localVersion: string = '';

  public async created(): Promise<void> {
    try {
      const masterVersion = await this.gitHubProvider.getCouchpotatoVersion();
      this.localVersion = await this.couchpotatoProvider.getCouchpotatoVersion();
      this.isPending = false;
      this.hasNewVersion = masterVersion.trim() !== this.localVersion.trim();
    } catch (err) {
      this.isPending = false;
      this.hasError = true;
    }
  }
}
