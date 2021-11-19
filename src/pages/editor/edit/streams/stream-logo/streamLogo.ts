import { IModalHelper } from "_services/helpers/modalHelper";
import { Options, Vue } from "vue-class-component";
import { inject } from "inversify-props";
import { Prop } from "vue-property-decorator";
import { StreamLogoEdit } from "./logo-edit/streamLogoEdit";
import StreamLogoEditProps from "./logo-edit/StreamLogoEditProps";

@Options({
  name: 'StreamLogo',
  template: require('./streamLogo.pug'),
  components: {
  }
})
export class StreamLogo extends Vue {
  @inject() private modalHelper: IModalHelper;

  @Prop({ default: '', type: String })
  public value: string;

  public get title(): string {
    if (this.value) {
      const index = this.value.lastIndexOf('/');
      const fileName = this.value.substr(index + 1, this.value.length);
      return fileName;
    }

    return 'Standard';
  }

  public edit(){
    const props: StreamLogoEditProps = new StreamLogoEditProps();
    props.title = this.$options?.filters?.translate('catalogueModalTitle');
    props.path = this.value;

    this.modalHelper.create<typeof StreamLogoEdit>(StreamLogoEdit, props, (result: string | undefined) => {
      if(result === null){
        return;
      }

      this.$emit('update:value', result);
    });
  }
}