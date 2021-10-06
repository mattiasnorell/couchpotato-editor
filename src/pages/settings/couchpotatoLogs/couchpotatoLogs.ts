import { Vue, Options } from 'vue-class-component';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IModalHelper } from '_services/helpers/modalHelper';
import { ILogProvider } from '_services/providers/logProvider';
import { LogModal } from './log-modal/logModal';
import { inject } from 'inversify-props';

@Options({
  name: 'CouchpotatoLogs',
  template: require('./couchpotatoLogs.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class CouchpotatoLogs extends Vue {
  @inject() public logProvider: ILogProvider;
  @inject() public modalHelper: IModalHelper;
  
  private logs: string[] = [];
  public async created(): Promise<void> {
    this.loadLogs();
  }

  private async loadLogs(): Promise<void> {
    const result = await this.logProvider.getAll();

    if (result) {
      this.logs = result.map((item) => {
        const lastSlash = item.lastIndexOf('/');

        return item.slice(lastSlash + 1, item.length - 4);
      });
    }
  }

  private openLog(log: string): void {
    this.modalHelper.create<typeof LogModal>(LogModal, { logId: log });
  }

  private async deleteLog(log: string): Promise<void> {
    const confirmed = window.confirm('Radera logfilen?');

    if (!confirmed) {
      return;
    }

    await this.logProvider.deleteLog(log);
    this.loadLogs();
  }
}
