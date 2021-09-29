import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { IConfigurationProvider } from '_services/providers/configurationProvider';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject } from 'inversify-props';

@Component({
  name: 'Rename',
  template: require('./rename.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class Rename extends Vue {
  @inject() configurationProvider: IConfigurationProvider;
  
  @Prop()
  public configurationId: string;

  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  private async rename(): Promise<void> {
    if (!this.configurationId) {
      return;
    }

    const newName = window.prompt('Nytt namn');

    if (!newName) {
      return;
    }

    this.isPending = true;

    try {
      await this.configurationProvider.rename(this.configurationId, newName);
      this.isPending = false;
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;

        this.$emit('onChange');
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
