import { Options } from 'vue-class-component';
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
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { PluginReadmeProps, PluginsReadme } from '../readme/pluginsReadme';

@Options({
    name: 'PluginsInstall',
    template: require('./pluginsInstall.pug'),
    components: {
        FontAwesomeIcon,
        InputText
    }
})
export class PluginsInstall extends ModalBase {
    @inject() public localStorageHelper: ILocalStorageHelper;
    @inject() public languageRepository: ILanguageRepository;
    @inject() public gitHubProvider: IGitHubProvider;
    @inject() public modalHelper: IModalHelper;

    @Prop()
    public title: string;

    @Prop({ type: Array, default: () => [] })
    public installedPlugins: CouchpotatoPlugin[];

    private githubPlugins: GitHubRepositoryContent[] = [];
    private isPending: boolean = false;

    public async created(): Promise<void> {
        const githubToken = this.localStorageHelper.read<string>('githubToken');
        if (githubToken) {
            const result = await this.gitHubProvider.getRepositoryContent('couchpotato-plugins', githubToken);
            this.githubPlugins = result.filter((item) => item.type === 'dir');
        }
    }

    private installCouchpotatoPlugin(plugin: GitHubRepositoryContent): void {
        const props: WebSocketModalProps = new WebSocketModalProps();
        props.title = `${this.languageRepository.get('installPlugin')} - ${plugin.name}`;
        props.action = 'installplugin';
        props.url = plugin.name;
        props.accessToken = this.localStorageHelper.read<string>('githubToken');

        this.modalHelper.create<typeof WebSocketModal>(WebSocketModal, props, async () => {});
    }

    private openPluginInformation(plugin: GitHubRepositoryContent): void {
        if (!plugin) {
            return;
        }

        const props: PluginReadmeProps = new PluginReadmeProps();
        props.title = `${plugin.name}`;
        props.pluginId = plugin.name;

        this.modalHelper.create<typeof PluginsReadme>(PluginsReadme, props);
    }

    private openPluginInstaller(plugin: GitHubRepositoryContent): void {
        if (!plugin) {
            return;
        }

        this.installCouchpotatoPlugin(plugin);
    }

    private close(): void {
        super.closeModal();
    }
}

export class PluginInstallProps {
    public title: string;
    public installedPlugins: CouchpotatoPlugin[];
}
