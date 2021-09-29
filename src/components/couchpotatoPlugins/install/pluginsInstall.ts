import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { CouchpotatoPlugin } from '_services/connectors/couchpotatoPluginConnector';
import { IModalHelper } from '_services/helpers/modalHelper';
import { ModalBase } from '_models/modalBase';
import { IGitHubProvider, GitHubRepositoryContent } from '_services/providers/githubProvider';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { inject } from 'inversify-props';
import { ILocalStorageRepository } from '_services/repositories/localStorageRepository';

@Component({
  name: 'PluginsInstall',
  template: require('./pluginsInstall.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class PluginsInstall extends ModalBase {
  @inject() public localStorageRepository: ILocalStorageRepository;
  @inject() public languageRepository: ILanguageRepository;
  @inject() public gitHubProvider: IGitHubProvider;
  @inject() public modalHelper: IModalHelper;

  @Prop()
  public title: string;

  @Prop({ type: Array, default: () => [] })
  public installedPlugins: CouchpotatoPlugin[];


  public async created(): Promise<void> {
    const githubToken = this.localStorageRepository.read<string>('githubToken');
    if (githubToken) {
      const result = await this.gitHubProvider.getRepositoryContent('couchpotato-plugins', githubToken);
    }
  }

  private installCouchpotatoPlugin(plugin: GitHubRepositoryContent): void {
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = `${this.languageRepository.get('installPlugin')} - ${plugin.name}`;
    props.action = 'installplugin';
    props.url = plugin.name;
    props.accessToken = this.localStorageRepository.read<string>('githubToken');

    this.modalHelper.create<typeof WebSocketModal>(WebSocketModal, props, async () => {

    });
  }
}

export class PluginInstallProps {
  public title: string;
  public installedPlugins: CouchpotatoPlugin[];
}
