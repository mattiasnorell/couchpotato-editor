import { Vue, Options } from 'vue-class-component';

import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { Collapse } from '_components/base/collapse/collapse';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputSelect } from '_components/base/input-select/inputSelect';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { inject } from 'inversify-props';
import { CouchpotatoPlugin, ICouchpotatoPluginConnector } from '_services/connectors/couchpotatoPluginConnector';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { IModalHelper } from '_services/helpers/modalHelper';
import { PluginInstallProps, PluginsInstall } from './install/pluginsInstall';
import { PluginSettingsProps, CouchpotatoPluginsModal } from './modal/couchpotatoPluginsModal';

@Options({
  name: 'couchpotatoPlugins',
  template: require('./couchpotatoPlugins.pug'),
  components: {
    Layout,
    InputText,
    Collapse,
    FontAwesomeIcon,
    InputSelect,
    InputCheckbox
  }
})
export class CouchpotatoPlugins extends Vue {
  @inject() public languageRepository: ILanguageRepository;
  @inject() public couchpotatoPluginConnector: ICouchpotatoPluginConnector;
  @inject() public localStorageHelper: ILocalStorageHelper;
  @inject() public modalHelper: IModalHelper;

  private installedPlugins: CouchpotatoPlugin[] = [];
  private ignoreList: string[] = ['HtmlAgilityPack.NetCore', 'Newtonsoft.Json', 'couchpotato.core'];

  public async created(): Promise<void> {
    
    this.loadInstalledPlugins();
    
  }

  private async loadInstalledPlugins(): Promise<void> {
    const installedPlugins = await this.couchpotatoPluginConnector.getInstalled();
    this.installedPlugins = installedPlugins.filter((item) => !this.ignoreList.includes(item.name));
  }

  private async editPluginSettings(pluginId: string): Promise<void> {
    const settings = await this.couchpotatoPluginConnector.getSettings(pluginId);

    const path = this.localStorageHelper.read<string>('couchpotatoWebsocketPath');
    if (!path) {
      return;
    }

    const props: PluginSettingsProps = new PluginSettingsProps();
    props.title = pluginId;
    props.pluginId = pluginId;
    props.settings = settings;

    this.modalHelper.create<typeof CouchpotatoPluginsModal>(CouchpotatoPluginsModal, props);
  }

  private async toggleActive(plugin: CouchpotatoPlugin): Promise<void> {
    if (!plugin.active) {
      await this.couchpotatoPluginConnector.deactivate(plugin.name);
      
    } else {
      await this.couchpotatoPluginConnector.activate(plugin.name);
    }

    this.loadInstalledPlugins();
  }

  private async uninstallPlugin(plugin: CouchpotatoPlugin, index: number): Promise<void> {
    const confirm = window.confirm('Är du säker?');

    if (!confirm) {
      return;
    }

    const settings = await this.couchpotatoPluginConnector.uninstall(plugin.name);
    this.loadInstalledPlugins();
  }

  private installPlugin(): void{
    const props: PluginInstallProps = new PluginInstallProps();
    props.title = 'Installera plugins';
    props.installedPlugins = this.installedPlugins;

    this.modalHelper.create<typeof PluginsInstall>(PluginsInstall, props, () => {
      this.loadInstalledPlugins();
    });
  }

  
}
