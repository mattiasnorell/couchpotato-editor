import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputText } from '../../base/input-text/inputText';
import { FallbackValues } from '../fallback-values/fallbackValues';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DefaultValidationFallback } from '../../../models/Validation';
import dragula from 'dragula';
import { $arrayHelper } from '../../../services/helpers/arrayHelper';
import { $guidHelper } from '../../../services/helpers/guidHelper';

@Component({
  name: 'Fallbacks',
  template: require('./fallbacks.pug'),
  components: { InputText, FontAwesomeIcon, FallbackValues }
})
export class Fallbacks extends Vue {
  @Prop()
  public fallbacks: DefaultValidationFallback[];

  public created(): void {}
  
  public mounted() {
    this.initDragula();
  }

  private deleteFallback(index: number): void {
    this.fallbacks.splice(index, 1);
  }

  private createFallback(): void{
    const fallback: DefaultValidationFallback = new DefaultValidationFallback();
    fallback.key = 'Ny';
    this.fallbacks.push(fallback);
  }

  private uniqueId(): string {
    return $guidHelper.generate();
  }
  
  private initDragula(): void {
    let startPosition = 0;

    const dragulaOptions = {
      revertOnSpill: true
    };

    const dragulaContainer = document.getElementById('fallback_container');
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
        $arrayHelper.moveToIndex(this.fallbacks, startPosition, index);
      });
    }
  }
}
