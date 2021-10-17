
import { Prop } from 'vue-property-decorator';
import { IPlaylistRepository } from '_services/repositories/playlistRepository';
import { Collapse } from '_components/base/collapse/collapse';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { CopyStreamUrl } from '_pages/editor/edit/copy-stream-url/copyStreamUrl';
import { InputSelect, SelectOption } from '_components/base/input-select/inputSelect';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StreamCatalogueItem from './StreamCatalogueItem';
import StreamCatalogueResult from './StreamCatalogueResult';
import { ModalBase } from '_models/modalBase';
import { inject } from 'inversify-props';
import { Options } from 'vue-class-component';

@Options({
  name: 'StreamCatalogue',
  template: require('./streamCatalogue.pug'),
  components: {
    Collapse,
    FontAwesomeIcon,
    InputCheckbox,
    InputSelect,
    CopyStreamUrl
  }
})
export class StreamCatalogue extends ModalBase {
  @inject() public playlistRepository: IPlaylistRepository;

  @Prop()
  public title: string;

  @Prop({ default: [] })
  public addedStreams: string[];

  private groups: StreamCatalogueGroup[] = [];
  private isPending: boolean = false;
  private itemsToAdd: StreamCatalogueItem[] = [];
  private itemsToRemove: StreamCatalogueItem[] = [];

  private groupOptions: SelectOption<string>[] = [];
  private groupItems: StreamCatalogueItem[] = [];
  private groupCache: { [key: string]: StreamCatalogueItem[] } = {};

  public async created(): Promise<void> {
    this.isPending = true;
    const items = await this.playlistRepository.getAll();
    this.isPending = false;

    const groups: { [key: string]: StreamCatalogueItem[] } = {};

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.tvgName) {
        continue;
      }

      if (!groups.hasOwnProperty(item.groupTitle)) {
        groups[item.groupTitle] = [];
      }

      const streamCatalogueItem = new StreamCatalogueItem();
      streamCatalogueItem.tvgId = item.tvgId;
      streamCatalogueItem.tvgName = item.tvgName;
      streamCatalogueItem.url = item.url;

      const isAdded = this.addedStreams.includes(item.tvgName);
      if (isAdded) {
        streamCatalogueItem.selected = true;
        streamCatalogueItem.isAdded = true;
      }


      groups[item.groupTitle].push(streamCatalogueItem);
    }

    const mappedGroups: SelectOption<string>[] = [];
    for (let group in groups) {
      const groupItem = new SelectOption<string>(group, group);

      mappedGroups.push(groupItem);
    }

    this.groupCache = groups;
    this.groupOptions = mappedGroups;
  }

  private get hasItems(): boolean {
    return this.itemsToAdd.length > 0 || this.itemsToRemove.length > 0;
  }

  private onChange(items: string): void {
    if (!items) {
      this.groupItems = [];
    } else {
      this.groupItems = this.groupCache[items];
    }
  }

  private onToggleItem(value: StreamCatalogueItem) {
    value.selected = !value.selected;

    if (value.selected) {
      this.itemsToAdd.push(value);

      const index = this.itemsToRemove.findIndex(item => item.tvgName == value.tvgName);
      this.itemsToRemove.splice(index, 1);

    } else {
      const index = this.itemsToAdd.findIndex(item => item.tvgName == value.tvgName);
      this.itemsToAdd.splice(index, 1);

      if (value.isAdded) {
        this.itemsToRemove.push(value);
      }
    }
  }

  private ok(): void {
    const detail: StreamCatalogueResult = {
      itemsToAdd: this.itemsToAdd,
      itemsToRemove: this.itemsToRemove
    }

    super.closeModal(detail);
  }

  private close(): void {
    super.closeModal();
  }
}

export class StreamCatalogueGroup {
  public title: string = '';
  public items: StreamCatalogueItem[] = [];

  public get itemCount(): number {
    return this.items.length;
  }
}
