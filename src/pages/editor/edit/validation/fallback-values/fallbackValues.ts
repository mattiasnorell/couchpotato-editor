import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { IModalHelper } from '_services/helpers/modalHelper';
import { FallbackValueItems, FallbackValueItemsProps } from '_pages/editor/edit/validation/fallback-value-items/fallbackValueItems';
import { inject } from 'inversify-props';

@Options({
  name: 'FallbackValues',
  template: require('./fallbackValues.pug'),
  components: {}
})
export class FallbackValues extends Vue {
  @inject() private modalHelper: IModalHelper;
  
  @Prop()
  public values: string[];

  public created(): void {}

  private toggleEdit(): void {
    const props: FallbackValueItemsProps = new FallbackValueItemsProps();
    props.title = 'Fallbackvärden';
    props.items = this.values;
    this.modalHelper.create<typeof FallbackValueItems>(FallbackValueItems, props, (evt: any) => {});
  }
}