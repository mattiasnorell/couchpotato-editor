import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { ICouchpotatoPluginConnector } from '_services/connectors/couchpotatoPluginConnector';
import { ModalBase } from '_models/modalBase';
import { inject } from 'inversify-props';

@Options({
  name: 'CouchpotatoPluginsJsonModal',
  template: require('./couchpotatoPluginsJsonModal.pug'),
  components: {
    FontAwesomeIcon,
    InputText
  }
})
export class CouchpotatoPluginsJsonModal extends ModalBase {
  @inject() private couchpotatoPluginConnector: ICouchpotatoPluginConnector;
  
  @Prop()
  public title: string;

  @Prop()
  public path: string;

  private isPending: boolean = false;
  private contents: string = '';

  public async created(): Promise<void> {
    const result = await this.couchpotatoPluginConnector.getSettingsFile(this.path);
    this.contents = JSON.stringify(result, undefined, 4);
  }

  private async save(): Promise<void> {
    this.isPending = true;

    if(!this.validateJson(this.contents)){
      alert("Filen är inte korrekt formaterad");
      this.isPending = false;
      return;
    }

    const contents = JSON.parse(this.contents);
    await this.couchpotatoPluginConnector.saveSettingsFile(this.path, contents);
    this.isPending = false;

    super.closeModal();
  }

  private prettify(): void{
    if(!this.validateJson(this.contents)){
      alert("Filen är inte korrekt formaterad");
    }

    this.contents = JSON.stringify(JSON.parse(this.contents), undefined, 4);
  }

  private validateJson(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }

  private cancel(): void {
    super.closeModal();
  }
}

export class JsonModalProps {
  public title: string;
  public path: string;
}
