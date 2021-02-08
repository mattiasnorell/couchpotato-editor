import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { $modalHelper } from '_services/helpers/modalHelper';
import { FallbackValueItems, FallbackValueItemsProps } from '_components/validation/fallback-value-items/fallbackValueItems';

@Component({
  name: 'FallbackValues',
  template: require('./fallbackValues.pug'),
  components: {}
})
export class FallbackValues extends Vue {
  @Prop()
  public values: string[];

  public created(): void {}

  private toggleEdit(): void {
    const props: FallbackValueItemsProps = new FallbackValueItemsProps();
    props.title = 'Fallbackvärden';
    props.items = this.values;
    $modalHelper.create<typeof FallbackValueItems>(FallbackValueItems, props, (evt: any) => {});
  }
}