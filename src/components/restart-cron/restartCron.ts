import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'RestartCron',
  template: require('./restartCron.pug'),
  components: {
    Layout,
    FontAwesomeIcon
  }
})
export class RestartCron extends Vue {
  @Prop({ type: Boolean, default: false })
  public disabled: boolean;

  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  public created() {}

  private async onClick(): Promise<void> {
    this.isPending = true;
    const result = await $couchpotatoConnector.restartCron();

    if (result) {
      this.isPending = false;
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    } else {
      this.isPending = false;
      this.isPending = false;
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 1000);
    }
  }
}
