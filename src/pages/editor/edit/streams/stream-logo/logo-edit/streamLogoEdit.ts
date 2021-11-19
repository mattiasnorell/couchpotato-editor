import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ModalBase } from "_models/modalBase";
import { StreamLogoGallery} from "../logo-gallery/streamLogoGallery";
import { InputText } from '_components/base/input-text/inputText';

@Options({
  name: 'StreamLogoEdit',
  template: require('./streamLogoEdit.pug'),
  components: {
    InputText,
    StreamLogoGallery
  }
})
export class StreamLogoEdit extends ModalBase {

  @Prop({ default: '', type: String })
  public path: string;

  public newPath: string = '';

  public created() {
    this.newPath = this.path;
  }

  private ok(): void {
    super.closeModal(this.newPath);
  }

  private close(): void {
    super.closeModal();
  }

  private onGalleryChange(path: string){
    this.newPath = path;
  }

  private onSetDefault(){
    super.closeModal('');
  }
}