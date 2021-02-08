import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $modalHelper } from '_services/helpers/modalHelper';
import { $logProvider } from '_services/providers/logProvider';
import { LogModal } from './log-modal/logModal';

@Component({
  name: 'CouchpotatoLogs',
  template: require('./couchpotatoLogs.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class CouchpotatoLogs extends Vue {
  private logs: string[] = [];
  public async created(): Promise<void> {
    this.loadLogs();
  }

  private async loadLogs(): Promise<void> {
    const result = await $logProvider.getAll();

    if (result) {
      this.logs = result.map((item) => {
        const lastSlash = item.lastIndexOf('/');

        return item.slice(lastSlash + 1, item.length - 4);
      });
    }
  }

  private openLog(log: string): void {
    $modalHelper.create<typeof LogModal>(LogModal, { logId: log });
  }

  private async deleteLog(log: string): Promise<void> {
    const confirmed = window.confirm('Radera logfilen?');

    if (!confirmed) {
      return;
    }

    await $logProvider.deleteLog(log);
    this.loadLogs();
  }
}
