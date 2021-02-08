import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { $couchpotatoPluginConnector } from '_services/connectors/couchpotatoPluginConnector';
import { $arrayHelper } from '_services/helpers/arrayHelper';
import { $guidHelper } from '_services/helpers/guidHelper';
import { CouchpotatoPluginsJsonModal, JsonModalProps } from '../json-modal/couchpotatoPluginsJsonModal';
import { $modalHelper } from '_services/helpers/modalHelper';
import { ModalBase } from '_models/modalBase';

@Component({
  name: 'CouchpotatoPluginsModal',
  template: require('./couchpotatoPluginsModal.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class CouchpotatoPluginsModal extends ModalBase {
  @Prop()
  public title: string;

  @Prop()
  public pluginId: string;

  @Prop()
  public settings: { [key: string]: any };

  private settingsList: PluginSettingsItem[] = [];
  private isPending: boolean = false;
  private newSetting: PluginSettingsItem = new PluginSettingsItem();

  public async created(): Promise<void> {
    const settingsList = [];
    for (const [key, value] of Object.entries(this.settings)) {
      const setting = new PluginSettingsItem(key, value);
      settingsList.push(setting);
    }

    this.settingsList = settingsList;
  }

  private async save(): Promise<void> {
    this.isPending = true;

    const settings: { [key: string]: any } = {};

    this.settingsList.forEach((item) => {
      settings[item.key] = item.value;
    });

    await $couchpotatoPluginConnector.saveSettings(this.pluginId, settings);
    this.isPending = false;

    super.closeModal();
  }

  private onDelete(index: number): void{
    $arrayHelper.removeAtIndex(this.settingsList, index);
  }

  private onAdd(): void{
    this.settingsList.push(this.newSetting);
    this.newSetting = new PluginSettingsItem();
  }

  private cancel():void{
    super.closeModal();
  }

  private uniqueId(): string {
    return $guidHelper.generate();
  }

  private editJsonFile(path: string): void {
    const props: JsonModalProps = new JsonModalProps();
    props.title = `Installera plugin`;
    props.path = path;

    $modalHelper.create<typeof CouchpotatoPluginsJsonModal>(CouchpotatoPluginsJsonModal, props, async () => {
      
    });
  }
}

export class PluginSettingsItem {
  constructor(key: string = '', value: string | number = '') {
    this.key = key;
    this.value = value;

  }

  public key: string;
  public value: string | number;
  public get isConfigFilePath(): boolean{
    if(typeof this.value == 'number'){
      return false;
    }

    return this.value.startsWith('/') && this.value.endsWith('.json');
  };
}

export class PluginSettingsProps {
  public title: string;
  public pluginId: string;
  public settings: { [key: string]: any };
}
