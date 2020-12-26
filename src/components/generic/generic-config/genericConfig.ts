import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../../models/Configuration';
import { $localStorageRepository } from '../../../services/repositories/localStorageRepository';
import { InputText } from '../../base/input-text/inputText';

@Component({
  name: 'GenericConfig',
  template: require('./genericConfig.pug'),
  components: {
    InputText
  }
})
export class GenericConfig extends Vue {
  @Prop()
  public config: Configuration;

  private couchpotatoPath: string | null = '';

  public created(): void {
    this.couchpotatoPath = $localStorageRepository.read<string>('couchpotatoWebhookPath');
  }

  private onInputCouchpotatoPath(value: string): void {
    $localStorageRepository.write<string>('couchpotatoWebhookPath', value);
  }
}
