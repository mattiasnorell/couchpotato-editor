import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';

@Component({
  name: 'InputCheckbox',
  template: require('./inputCheckbox.pug'),
  components: {}
})
export class InputCheckbox extends Vue {
  @Prop({ default: false, type: Boolean })
  public value: boolean;

  private toggle(): void {
    const toggleProxy = !this.value;
    this.$emit('input', toggleProxy);
  }
}
