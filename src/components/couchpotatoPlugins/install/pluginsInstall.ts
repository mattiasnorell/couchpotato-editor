import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { $couchpotatoPluginConnector, CouchpotatoPlugin } from '_services/connectors/couchpotatoPluginConnector';
import { $arrayHelper } from '_services/helpers/arrayHelper';
import { $guidHelper } from '_services/helpers/guidHelper';
import { CouchpotatoPluginsJsonModal, JsonModalProps } from '../json-modal/couchpotatoPluginsJsonModal';
import { $modalHelper } from '_services/helpers/modalHelper';
import { ModalBase } from '_models/modalBase';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { $githubProvider, GitHubRepositoryContent } from '_services/providers/githubProvider';
import { SelectOption } from '_components/base/input-select/inputSelect';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { $languageRepository } from '_services/repositories/languageRepository';
import { PluginReadmeProps, PluginsReadme } from '../readme/pluginsReadme';

@Component({
  name: 'PluginsInstall',
  template: require('./pluginsInstall.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class PluginsInstall extends ModalBase {
  @Prop()
  public title: string;

  @Prop({type: Array, default: () => []})
  public installedPlugins: CouchpotatoPlugin[];


  private githubPlugins: GitHubRepositoryContent[] = [];
  private isPending: boolean = false;

  public async created(): Promise<void> {
    const githubToken = $localStorageRepository.read<string>('githubToken');
    if (githubToken) {
      
      const result = await $githubProvider.getRepositoryContent('couchpotato-plugins', githubToken);

      this.githubPlugins = result
        .filter((item) => item.type === 'dir');
        
    }
  }

  private openPluginInformation(plugin: GitHubRepositoryContent): void {
    if (!plugin) {
      return;
    }

    const props: PluginReadmeProps = new PluginReadmeProps();
    props.title = `${plugin.name}`;
    props.pluginId = plugin.name;

    $modalHelper.create<typeof PluginsReadme>(PluginsReadme, props);
  }

  private openPluginInstaller(plugin: GitHubRepositoryContent): void {
    if (!plugin) {
      return;
    }

    this.installCouchpotatoPlugin(plugin);
  }

  private installCouchpotatoPlugin(plugin: GitHubRepositoryContent): void {
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = `${$languageRepository.get('installPlugin')} - ${plugin.name}`;
    props.action = 'installplugin';
    props.url = plugin.name;

    $modalHelper.create<typeof WebSocketModal>(WebSocketModal, props, async () => {
      
    });
  }

  private close(): void{
    super.closeModal();
  }
}

export class PluginInstallProps {
  public title: string;
  public installedPlugins: CouchpotatoPlugin[];
}
