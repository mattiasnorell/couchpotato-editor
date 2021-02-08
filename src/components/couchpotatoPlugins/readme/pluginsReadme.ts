import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { ModalBase } from '_models/modalBase';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { $githubProvider } from '_services/providers/githubProvider';
import { $markdownHelper } from '_services/helpers/markdownHelper';

@Component({
  name: 'PluginsReadme',
  template: require('./pluginsReadme.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class PluginsReadme extends ModalBase {
  @Prop()
  public title: string;

  @Prop()
  public pluginId: string;


  private contents: string = '';

  public async created(): Promise<void> {
    const githubToken = $localStorageRepository.read<string>('githubToken');
    if (githubToken) {
      
      const result = await $githubProvider.getReadme(this.pluginId, githubToken);
      const parsedContent = $markdownHelper.parse(result);

      this.contents = parsedContent;
        
    }
  }

  private close(): void{
    super.closeModal();
  }
}

export class PluginReadmeProps {
  public title: string;
  public pluginId: string;
}
