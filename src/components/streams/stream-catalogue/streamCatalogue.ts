import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { $playlistRepository } from '../../../services/repositories/playlistRepository';
import { Collapse } from '../../base/collapse/collapse';
import { InputCheckbox } from '../../base/input-checkbox/inputCheckbox';
import { InputSelect, SelectOption } from '../../base/input-select/inputSelect';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StreamCatalogueItem from './StreamCatalogueItem';

@Component({
  name: 'StreamCatalogue',
  template: require('./streamCatalogue.pug'),
  components: {
    Collapse,
    FontAwesomeIcon,
    InputCheckbox,
    InputSelect
  }
})
export class StreamCatalogue extends Vue {
  @Prop()
  public title: string;

  private groups: StreamCatalogueGroup[] = [];
  private isPending: boolean = false;
  private itemsToAdd: StreamCatalogueItem[] = [];

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

      streamCatalogueItem.selected = false;

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
    } else {
      const index = this.itemsToAdd.indexOf(value);
      this.itemsToAdd.splice(index, 1);
    }
  }

  private ok(): void {
    const event = new CustomEvent('closeModal', { detail: this.itemsToAdd });
    window.dispatchEvent(event);
  }
}

export class StreamCatalogueGroup {
  public title: string = '';
  public items: StreamCatalogueItem[] = [];

  public get itemCount(): number {
    return this.items.length;
  }
}
