import { Vue, Options } from 'vue-class-component';
import { IPlaylistRepository } from '_services/repositories/playlistRepository';
import { InputText } from '../input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Prop, Ref } from 'vue-property-decorator';
import { inject } from 'inversify-props';

@Options({
  name: 'GroupPicker',
  template: require('./groupPicker.pug'),
  components: {
    InputText,
    FontAwesomeIcon
  }
})
export class GroupPicker extends Vue {
  @inject() private playlistRepository: IPlaylistRepository;

  private searchResult: any[] = [];
  private isPending: boolean = false;
  private query: string = '';

  @Ref('streamPickerInput')
  readonly streamPickerInput!: HTMLInputElement;

  @Prop()
  public placeholder: string;
  
  public created() {
    this.$nextTick(() => this.streamPickerInput.focus());
  }

  private onInput(value: any): void {
    this.search();
  }

  private async search(): Promise<void> {
    if (this.isPending) {
      return;
    }

    if (this.query.trim().length < 2) {
      this.searchResult = [];
      return;
    }

    this.isPending = true;
    try {
      const result = await this.playlistRepository.searchGroup(this.query);
      this.searchResult = result;
      this.isPending = false;
    } catch (err) {
      this.isPending = false;
    }
  }

  private select(item: string): void {
    this.clear();
    this.$emit('onSelect', item);
  }

  private clear(): void {
    this.query = '';
    this.searchResult = [];
  }

  private onBlur(): void {
    this.$emit('onBlur');
  }
}
