import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '_models/Configuration';
import { $configurationProvider } from '_services/providers/configurationProvider';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'Save',
  template: require('./save.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class Save extends Vue {
  @Prop()
  private configuration: Configuration;

  @Prop()
  public configurationId: string;

  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  private async save(): Promise<void> {

    if (!this.configurationId) {
      return;
    }

    this.isPending = true;

    try {
      await $configurationProvider.save(this.configurationId, this.configuration);
      this.isPending = false;
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    } catch (err) {
      this.isPending = false;
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 1000);
    }
  }
}
