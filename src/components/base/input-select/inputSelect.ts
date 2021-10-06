import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({
  name: 'InputSelect',
  template: require('./inputSelect.pug'),
  components: {}
})
export class InputSelect extends Vue {
  @Prop()
  public options: SelectOption<any>[];

  @Prop()
  public placeholder: string;

  private update(value: string): void {
    this.$emit('onChange', value);
  }

  private onChange(e: any): void {
    this.update(e.target.value);
  }
}

export class SelectOption<T> {
  constructor(title: string, value: T) {
    this.value = value;
    this.title = title;
  }

  public value: T;
  public title: string;
}
