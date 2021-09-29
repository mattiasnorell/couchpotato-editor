import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { StreamListRow } from '../stream-list-row/streamListRow';
import { Stream } from '_models/Stream';
import dragula from 'dragula';
import { IArrayHelper } from '_services/helpers/arrayHelper';
import { IGuidHelper } from '_services/helpers/guidHelper';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { TableEmptyState } from '_components/base/table-empty-state/tableEmptyState';
import { StreamCatalogue } from '_components/streams/stream-catalogue/streamCatalogue';
import StreamCatalogueProps from '_components/streams/stream-catalogue/StreamCatalogueProps';
import { IModalHelper } from '_services/helpers/modalHelper';
import { StreamPicker } from '_components/base/stream-picker/streamPicker';
import StreamCatalogueResult from '../stream-catalogue/StreamCatalogueResult';
import { inject } from 'inversify-props';

@Component({
  name: 'StreamList',
  template: require('./streamList.pug'),
  components: {
    StreamListRow,
    FontAwesomeIcon,
    TableEmptyState,
    StreamPicker
  }
})
export class StreamList extends Vue {
  @inject() private arrayHelper: IArrayHelper;
  @inject() private guidHelper: IGuidHelper;
  @inject() private modalHelper: IModalHelper;

  @Prop()
  private streams: Stream[];

  private get hasSelected(): boolean {
    return this.streams.some((item) => item.isSelected);
  }

  private showFilter: boolean = false;
  public mounted() {
    this.initDragula();
  }

  private toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  private addStream(stream: Stream) {
    this.streams.unshift(stream);
  }

  private removeStream(index: number): void {
    this.streams.splice(index, 1);
  }

  private uniqueId(): string {
    return this.guidHelper.generate();
  }

  private deleteSelected(): void {
    const selected = this.streams.filter((item) => item.isSelected);
    selected.forEach((item) => {
      const index = this.arrayHelper.indexOf<Stream[]>(this.streams, item);
      this.arrayHelper.removeAtIndex(this.streams, index);
    });
  }

  private uncheckAll(): void {
    this.streams.forEach((item) => {
      if (item.isSelected) {
        item.isSelected = false;
      }
    });
  }

  private initDragula(): void {
    let startPosition = 0;

    const dragulaOptions = {
      revertOnSpill: true
    };

    const dragulaContainer = document.getElementById('stream_container');
    if (dragulaContainer) {
      const drake = dragula([dragulaContainer], dragulaOptions);

      drake.on('drag', (el: Element, source: Element): void => {
        if (!el.parentNode) {
          return;
        }

        startPosition = this.arrayHelper.indexOf(el.parentNode.children, el);
      });

      drake.on('drop', (el: Element, target: Element, source: Element, sibling: Element): void => {
        const index = this.arrayHelper.indexOf(target.children, el);
        if (this.hasSelected && window.confirm('Vill du flytta alla markerade?')) {
          let selected = this.streams.filter((item) => item.isSelected);

          if (index < startPosition) {
            selected = selected.reverse();
          }

          selected.forEach((item, selectedIndex) => {
            const selectedItemIndex = this.arrayHelper.indexOf(this.streams, item);
            this.arrayHelper.moveToIndex(this.streams, selectedItemIndex, index);
          });
        } else {
          this.arrayHelper.moveToIndex(this.streams, startPosition, index);
        }
      });
    }
  }

  private openCatalogue(): void {
    const props: StreamCatalogueProps = new StreamCatalogueProps();
    props.title = 'Katalog';
    props.addedStreams = this.streams.map((stream) => stream.channelId);

    this.modalHelper.create<typeof StreamCatalogue>(StreamCatalogue, props, (result: StreamCatalogueResult) => {
      if (!result) {
        return;
      }

      result.itemsToAdd.forEach((item) => {
        const isAdded = this.streams.some((streamItem) => streamItem.channelId === item.tvgName);
        if (!isAdded) {
          const stream = new Stream();
          stream.channelId = item.tvgName;
          stream.group = item.groupTitle;
          this.streams.unshift(stream);
        }
      });

      result.itemsToRemove.forEach((item) => {
        this.arrayHelper.removeItem(this.streams, item);
      });
    });
  }
}
