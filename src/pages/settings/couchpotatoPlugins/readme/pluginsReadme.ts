
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { ModalBase } from '_models/modalBase';
import { IGitHubProvider } from '_services/providers/githubProvider';
import { IMarkdownHelper } from '_services/helpers/markdownHelper';
import { inject } from 'inversify-props';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { Options } from 'vue-class-component';

@Options({
  name: 'PluginsReadme',
  template: require('./pluginsReadme.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class PluginsReadme extends ModalBase {
  @inject() public localStorageHelper: ILocalStorageHelper;
  @inject() public gitHubProvider: IGitHubProvider;
  @inject() public markdownHelper: IMarkdownHelper;
  
  @Prop()
  public title: string;

  @Prop()
  public pluginId: string;

  private contents: string = '';

  public async created(): Promise<void> {
    const githubToken = this.localStorageHelper.read<string>('githubToken');
    if (githubToken) {
      const repoContent = await this.gitHubProvider.getRepositoryContent('couchpotato-plugins', githubToken);
      const repo = repoContent.find((r) => r.name === this.pluginId);

      if (repo && repo.git_url) {
        const tree = await this.gitHubProvider.getRepositoryTreeContent(repo?.git_url, githubToken);
        if (tree) {
          const readme = tree.tree.find((item) => item.path === 'README.md');

          if (readme?.url) {
            const blob = await this.gitHubProvider.getReadme(readme?.url, githubToken);
            const parsedContent = this.markdownHelper.parse(blob);

            this.contents = parsedContent;
          }
        }
      }
    }
  }

  private close(): void {
    super.closeModal();
  }
}

export class PluginReadmeProps {
  public title: string;
  public pluginId: string;
}
