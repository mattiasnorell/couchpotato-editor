import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { InputFileUpload } from '_components/base/input-file-upload/inputFileUpload';
import { inject } from "inversify-props";
import { IConfigurationProvider } from "_services/providers/configurationProvider";

@Options({
  name: 'StreamLogoGallery',
  template: require('./streamLogoGallery.pug'),
  components: {
    InputText,
    FontAwesomeIcon,
    InputFileUpload
  }
})
export class StreamLogoGallery extends Vue {
  @inject() public configurationProvider: IConfigurationProvider;

  public logos: any[] = [];

  public async created() {
    this.logos = await this.configurationProvider.getLogos();
  }

  public async remove(item: any, index: number) {
    await this.configurationProvider.removeLogo(item.name);
    this.logos.splice(index, 1);
    this.$emit('onChange', '');

  }

  public onSelect(item: any) {
    this.$emit('onChange', item.path);
  }

  public async onUploadUpdate(fileList: any){
    console.log(fileList)
    const formData = new FormData();
    formData.append('file', new Blob([fileList[0]]), fileList[0].name);
    await this.configurationProvider.addLogo(formData);
  }

  public onUploadClick(){

  }
}