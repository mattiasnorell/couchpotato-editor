import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputText } from '../../base/input-text/inputText';
import { FallbackValues } from '../fallback-values/fallbackValues';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'Fallbacks',
  template: require('./fallbacks.pug'),
  components: { InputText, FontAwesomeIcon, FallbackValues }
})
export class Fallbacks extends Vue {
  @Prop()
  public fallbacks: [];

  public created(): void {}
  
  private deleteFallback(index: number): void {
    this.fallbacks.splice(index, 1);
  }
}
