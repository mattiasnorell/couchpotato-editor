import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputText } from '../../base/input-text/inputText';
import { InputCheckbox} from '../../base/input-checkbox/inputCheckbox';
import { Fallbacks } from '../fallbacks/fallbacks';

@Component({
    name: 'ValidationConfig',
    template: require('./validationConfig.pug'),
    components: {
      InputText,
      InputCheckbox,
      Fallbacks
    }
})
export class ValidationConfig extends Vue {
  @Prop()
  public config: Validation;

}