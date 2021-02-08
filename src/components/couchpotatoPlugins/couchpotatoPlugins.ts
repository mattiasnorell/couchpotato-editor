import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { InputText } from '_components/base/input-text/inputText';
import { Collapse } from '_components/base/collapse/collapse';
import { $modalHelper } from '_services/helpers/modalHelper';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { $githubProvider } from '_services/providers/githubProvider';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $couchpotatoPluginConnector, CouchpotatoPlugin } from '_services/connectors/couchpotatoPluginConnector';
import { SelectOption } from '_components/base/input-select/inputSelect';
import { InputSelect } from '_components/base/input-select/inputSelect';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { CouchpotatoPluginsModal, PluginSettingsProps } from './modal/couchpotatoPluginsModal';
import { $languageRepository } from '_services/repositories/languageRepository';
import { PluginInstallProps, PluginsInstall } from './install/pluginsInstall';

@Component({
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
  private installedPlugins: CouchpotatoPlugin[] = [];
  private ignoreList: string[] = ['HtmlAgilityPack.NetCore', 'Newtonsoft.Json', 'couchpotato.core'];

  public async created(): Promise<void> {
    
    this.loadInstalledPlugins();
    
  }

  private async loadInstalledPlugins(): Promise<void> {
    const installedPlugins = await $couchpotatoPluginConnector.getInstalled();
    this.installedPlugins = installedPlugins.filter((item) => !this.ignoreList.includes(item.name));
  }

  private async editPluginSettings(pluginId: string): Promise<void> {
    const settings = await $couchpotatoPluginConnector.getSettings(pluginId);

    const path = $localStorageRepository.read<string>('couchpotatoWebsocketPath');
    if (!path) {
      return;
    }

    const props: PluginSettingsProps = new PluginSettingsProps();
    props.title = pluginId;
    props.pluginId = pluginId;
    props.settings = settings;

    $modalHelper.create<typeof CouchpotatoPluginsModal>(CouchpotatoPluginsModal, props);
  }

  private async toggleActive(plugin: CouchpotatoPlugin): Promise<void> {
    if (!plugin.active) {
      await $couchpotatoPluginConnector.deactivate(plugin.name);
    } else {
      await $couchpotatoPluginConnector.activate(plugin.name);
    }

    this.loadInstalledPlugins();
  }

  private async uninstallPlugin(plugin: CouchpotatoPlugin, index: number): Promise<void> {
    const confirm = window.confirm('Är du säker?');

    if (!confirm) {
      return;
    }

    const settings = await $couchpotatoPluginConnector.uninstall(plugin.name);
    this.loadInstalledPlugins();
  }

  private installPlugin(): void{
    const props: PluginInstallProps = new PluginInstallProps();
    props.title = 'Installera plugins';
    props.installedPlugins = this.installedPlugins;

    $modalHelper.create<typeof PluginsInstall>(PluginsInstall, props, () => {
      this.loadInstalledPlugins();
    });
  }

  
}
