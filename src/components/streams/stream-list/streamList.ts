import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { StreamListRow } from '../stream-list-row/streamListRow';
import { AddStream } from '../add-stream/addStream';
import { Stream } from '../../../models/Stream';
import dragula from 'dragula';
import { $arrayHelper } from '../../../services/helpers/arrayHelper';
import { $guidHelper } from '../../../services/helpers/guidHelper';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { TableEmptyState } from '../../base/table-empty-state/tableEmptyState';

@Component({
  name: 'StreamList',
  template: require('./streamList.pug'),
  components: {
    StreamListRow,
    AddStream,
    FontAwesomeIcon,
    TableEmptyState
  }
})
export class StreamList extends Vue {
  @Prop()
  private streams: Stream[];

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
    return $guidHelper.generate();
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

        startPosition = $arrayHelper.indexOf(el.parentNode.children, el);
      });

      drake.on('drop', (el: Element, target: Element, source: Element, sibling: Element): void => {
        const index = $arrayHelper.indexOf(target.children, el);
        $arrayHelper.moveToIndex(this.streams, startPosition, index);
      });
    }
  }
}
