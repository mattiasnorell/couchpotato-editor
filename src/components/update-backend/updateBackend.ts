import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'UpdateBackend',
  template: require('./updateBackend.pug'),
  components: {
    Layout,
    FontAwesomeIcon
  }
})
export class UpdateBackend extends Vue {
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
    const result = await $couchpotatoConnector.updateBackend();

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
    }
  }
}
