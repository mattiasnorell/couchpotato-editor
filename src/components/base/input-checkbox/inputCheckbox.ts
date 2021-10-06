import { Vue, Options } from 'vue-class-component';

import { Prop, Ref } from 'vue-property-decorator';

@Options({
  name: 'InputCheckbox',
  template: require('./inputCheckbox.pug'),
  components: {}
})
export class InputCheckbox extends Vue {
  @Prop({ default: false, type: Boolean })
  public value: boolean;

  private toggle(): void {
    const toggleProxy = !this.value;
    this.$emit('update:value', toggleProxy);
  }
}
