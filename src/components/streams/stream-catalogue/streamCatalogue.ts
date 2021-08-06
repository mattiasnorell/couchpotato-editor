import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { $playlistRepository } from '_services/repositories/playlistRepository';
import { Collapse } from '_components/base/collapse/collapse';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { CopyStreamUrl } from '_components/configurator/copy-stream-url/copyStreamUrl';
import { InputSelect, SelectOption } from '_components/base/input-select/inputSelect';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StreamCatalogueItem from './StreamCatalogueItem';
import StreamCatalogueResult from './StreamCatalogueResult';
import { ModalBase } from '_models/modalBase';

@Component({
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
    const items = await $playlistRepository.getAll();
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
      streamCatalogueItem.selected = isAdded;
      streamCatalogueItem.isAdded = isAdded;

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
    if (value.selected) {
      this.itemsToAdd.push(value);

      const index = this.itemsToRemove.indexOf(value);
      this.itemsToRemove.splice(index, 1);

    } else {
      const index = this.itemsToAdd.indexOf(value);
      this.itemsToAdd.splice(index, 1);

      if (value.isAdded) {
        this.itemsToRemove.push(value);
      }
    }
  }

  private ok(): void {
    const detail = new StreamCatalogueResult();
    detail.itemsToAdd = this.itemsToAdd;
    detail.itemsToRemove = this.itemsToRemove;

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
