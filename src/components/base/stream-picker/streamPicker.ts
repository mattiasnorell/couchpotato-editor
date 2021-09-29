import Vue from 'vue';
import Component from 'vue-class-component';
import { PlaylistItem } from '_models/PlaylistItem';
import { Stream } from '_models/Stream';
import { IPlaylistRepository } from '_services/repositories/playlistRepository';
import { InputText } from '_components/base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Prop, Ref } from 'vue-property-decorator';
import { inject } from 'inversify-props';

@Component({
  name: 'StreamPicker',
  template: require('./streamPicker.pug'),
  components: {
    InputText,
    FontAwesomeIcon
  }
})
export class StreamPicker extends Vue {
  @inject()
  private playlistRepository: IPlaylistRepository;

  private searchResult: any[] = [];
  private isPending: boolean = false;
  private query: string = '';

  @Ref('streamPickerInput')
  readonly streamPickerInput!: HTMLInputElement;

  @Prop()
  public placeholder: string;

  private created() {
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
      const result = await this.playlistRepository.search(this.query);
      this.searchResult = result;
      this.isPending = false;
    } catch (err) {
      this.isPending = false;
    }
  }

  private select(item: PlaylistItem): void {
    this.searchResult = [];

    const stream = new Stream();
    stream.channelId = item.tvgName;
    stream.friendlyName = item.tvgName;
    stream.epgId = item.tvgName;

    this.query = '';
    
    this.$emit('onSelect', stream);
  }

  private clear(): void {
    this.query = '';
    this.searchResult = [];
  }

  private onBlur(): void {
    this.$emit('onBlur');
  }
}
