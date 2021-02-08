import Vue from 'vue';
import Component from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { $githubProvider } from '_services/providers/githubProvider';
import { $couchpotatoProvider } from '_services/providers/couchpotatoProvider';

@Component({
  name: 'WidgetCheckCouchpotatoVersion',
  template: require('./widgetCheckCouchpotatoVersion.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon
  }
})
export class WidgetCheckCouchpotatoVersion extends Vue {
  private isPending: boolean = true;
  private hasError: boolean = false;
  private hasNewVersion: boolean = false;
  private localVersion: string = '';

  public async created(): Promise<void> {
    try {
      const masterVersion = await $githubProvider.getCouchpotatoVersion();
      this.localVersion = await $couchpotatoProvider.getCouchpotatoVersion();
      this.isPending = false;
      this.hasNewVersion = masterVersion.trim() !== this.localVersion.trim();
    } catch (err) {
      this.isPending = false;
      this.hasError = true;
    }
  }
}
