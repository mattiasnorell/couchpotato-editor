import { Vue, Options } from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';

@Options({
  name: 'InputText',
  template: require('./inputText.pug'),
  components: {}
})
export class InputText extends Vue {
  @Ref('inputField')
  readonly inputElement!: HTMLInputElement;

  @Prop()
  public value: string | number;

  @Prop()
  public placeholder: string;

  @Prop()
  public usePlaceholderIfEmpty: boolean;

  @Prop({type: Boolean, default: false})
  public inline: boolean;

  private isEditing: boolean = false;

  private edit(): void {
    this.isEditing = true;
    this.$nextTick(() => this.inputElement.focus());
  }

  private update(value: string): void {
    this.$emit('input', value);
    this.isEditing = false;
  }

  private onChange(e: any): void {
    this.update(e.target.value);
  }
}
