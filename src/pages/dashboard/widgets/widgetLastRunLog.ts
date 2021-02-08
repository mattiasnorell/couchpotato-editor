import Vue from 'vue';
import Component from 'vue-class-component';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $couchpotatoProvider, LastRunResult } from '_services/providers/couchpotatoProvider';
@Component({
  name: 'WidgetLastRunLog',
  template: require('./widgetLastRunLog.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon
  }
})
export class WidgetLastRunLog extends Vue {
  private hasErrors: boolean = false;
  private log: LastRunResult | null = null;

  public async created(): Promise<void> {
    const result = await $couchpotatoProvider.getCouchpotatoLastRun().catch((err) => {
      this.hasErrors = true;
    });

    this.log = result ? result : null;
  }

  private get noErrors(): boolean {
    if (
      this.log &&
      this.log.epgErrors.length === 0 &&
      this.log.missingStreams.length === 0 &&
      this.log.validationErrors.length === 0 &&
      !this.hasErrors
    ) {
      return true;
    }

    return false;
  }
}
