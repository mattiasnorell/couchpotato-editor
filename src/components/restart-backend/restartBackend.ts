import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'RestartBackend',
  template: require('./restartBackend.pug'),
  components: {
    Layout,
    FontAwesomeIcon
  }
})
export class RestartBackend extends Vue {
  @Prop({ type: Boolean, default: false })
  public disabled: boolean;

  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  public created() {}

  private async onClick(): Promise<void> {
    const maxRetry: number = 5;
    let iteration: number = 0;

    this.isPending = true;
    await $couchpotatoConnector.restartBackend();

    const interval = setInterval(async () => {
      if (maxRetry < iteration) {
        this.isPending = true;
        clearInterval(interval);
        return;
      }

      iteration++;
      const result = await $couchpotatoConnector.ping();

      if (result) {
        this.isPending = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 1000);
        clearInterval(interval);
      } else {
        this.isPending = false;
        this.isPending = false;
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 1000);
      }
    }, 500);
  }
}
