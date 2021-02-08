import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { TableEmptyState } from '_components/base/table-empty-state/tableEmptyState';
import { InputText } from '_components/base/input-text/inputText';
import dragula from 'dragula';
import { $arrayHelper } from '_services/helpers/arrayHelper';
import { $guidHelper } from '_services/helpers/guidHelper';
import { ModalBase } from '_models/modalBase';

@Component({
  name: 'FallbackValueItems',
  template: require('./fallbackValueItems.pug'),
  components: {
    FontAwesomeIcon,
    InputCheckbox,
    TableEmptyState,
    InputText
  }
})
export class FallbackValueItems extends ModalBase {
  @Prop()
  public title: string;

  @Prop()
  public items: string[];

  private newItem: string = '';

  public mounted() {
    this.initDragula();
  }

  private addItem(): void {
    if (!this.newItem) {
      return;
    }

    if (this.items.includes(this.newItem)) {
      return;
    }

    this.items.push(this.newItem);
    this.newItem = ''
  }

  private removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  private ok(): void {
    super.closeModal();
  }

  private uniqueId(): string {
    return $guidHelper.generate();
  }
  
  private initDragula(): void {
    let startPosition = 0;

    const dragulaOptions = {
      revertOnSpill: true
    };

    const dragulaContainer = document.getElementById('fallback_values_container');
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
        $arrayHelper.moveToIndex(this.items, startPosition, index);
      });
    }
  }
}

export class FallbackValueItemsProps {
  public title: string;
  public items: string[];
}
