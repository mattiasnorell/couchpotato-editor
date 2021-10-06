import { Vue, Options } from 'vue-class-component';

import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ICouchpotatoProvider, LastRunResult } from '_services/providers/couchpotatoProvider';
import { inject } from 'inversify-props';
@Options({
  name: 'WidgetLastRunLog',
  template: require('./widgetLastRunLog.pug'),
  components: {
    TriggerCouchpotato,
    FontAwesomeIcon
  }
})
export class WidgetLastRunLog extends Vue {
  @inject() public couchpotatoProvider: ICouchpotatoProvider;

  private hasErrors: boolean = false;
  private log: LastRunResult | null = null;

  public async created(): Promise<void> {
    const result = await this.couchpotatoProvider.getCouchpotatoLastRun().catch((err) => {
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
