import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputText } from '../../base/input-text/inputText';
import { InputCheckbox} from '../../base/input-checkbox/inputCheckbox';

@Component({
    name: 'ValidationConfig',
    template: require('./validationConfig.pug'),
    components: {
      InputText,
      InputCheckbox
    }
})
export class ValidationConfig extends Vue {
  @Prop()
  public config: Validation;

}