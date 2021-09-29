import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { Rename } from '_components/configurator/rename/rename';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IConfigurationProvider } from '_services/providers/configurationProvider';
import { ConfigurationListItem } from '_models/ConfigurationListItem';
import { ILocalStorageRepository } from '_services/repositories/localStorageRepository';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { inject } from 'inversify-props';

@Component({
  name: 'EditorList',
  template: require('./editorList.pug'),
  components: {
    Layout,
    TriggerCouchpotato,
    FontAwesomeIcon,
    Rename
  }
})
@RequireTokenDecorator()
export default class EditorList extends Vue {
  @inject() public languageRepository: ILanguageRepository;
  @inject() public localStorageRepository: ILocalStorageRepository;
  @inject() public configurationProvider: IConfigurationProvider;

  private configurations: ConfigurationListItem[] = [];
  private couchpotatoPath: string | null = '';

  public async mounted(): Promise<void> {
    this.couchpotatoPath = this.localStorageRepository.read<string>('couchpotatoWebhookPath');
    this.loadConfigurations();
  }

  private async loadConfigurations(): Promise<void> {
    this.configurations = await this.configurationProvider.getAllForUser('');
  }

  private async onCreate(): Promise<void> {
    const name = window.prompt('Ange namn');
    if (!name) {
      return;
    }

    const cleanName = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');

    try {
      const result = await this.configurationProvider.create(cleanName);
      this.loadConfigurations();
    } catch (err) {
      console.log(err);
    }
  }

  private async onDelete(item: ConfigurationListItem): Promise<void> {
    const confirm = window.confirm(this.languageRepository.get('areYouSure'));

    if (!confirm) {
      return;
    }

    try {
      const result = await this.configurationProvider.delete(item.name);
      this.loadConfigurations();
    } catch (err) {
      console.log(err);
    }
  }

  private async onCopy(item: ConfigurationListItem): Promise<void> {
    try {
      const result = await this.configurationProvider.copy(item.name);
      this.loadConfigurations();
    } catch (err) {
      console.log(err);
    }
  }

  private async onRename(): Promise<void> {
    this.loadConfigurations();
  }
}
