import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { Configuration } from '_models/Configuration';
import { IConfigurationProvider } from '_services/providers/configurationProvider';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject } from 'inversify-props';

@Options({
  name: 'Save',
  template: require('./save.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class Save extends Vue {
  @inject() configurationProvider: IConfigurationProvider;
  
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
      await this.configurationProvider.save(this.configurationId, this.configuration);
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
