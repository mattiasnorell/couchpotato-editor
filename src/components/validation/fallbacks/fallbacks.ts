import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { InputText } from '../../base/input-text/inputText';
import { FallbackValues } from '../fallback-values/fallbackValues';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DefaultValidationFallback } from '../../../models/Validation';
import dragula from 'dragula';
import { IArrayHelper } from '_services/helpers/arrayHelper';
import { IGuidHelper } from '_services/helpers/guidHelper';
import { inject } from 'inversify-props';
import { IModalHelper } from '_services/helpers/modalHelper';

@Options({
  name: 'Fallbacks',
  template: require('./fallbacks.pug'),
  components: { InputText, FontAwesomeIcon, FallbackValues }
})
export class Fallbacks extends Vue {
  @inject() public modalHelper: IModalHelper;
  @inject() public guidHelper: IGuidHelper;
  @inject() public arrayHelper: IArrayHelper;

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
    return this.guidHelper.generate();
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

        startPosition = this.arrayHelper.indexOf(el.parentNode.children, el);
      });

      drake.on('drop', (el: Element, target: Element, source: Element, sibling: Element): void => {
        const index = this.arrayHelper.indexOf(target.children, el);
        this.arrayHelper.moveToIndex(this.fallbacks, startPosition, index);
      });
    }
  }
}
