import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputText } from '_components/base/input-text/inputText';
import { InputCheckbox} from '_components/base/input-checkbox/inputCheckbox';
import { Fallbacks } from '_components/validation/fallbacks/fallbacks';
import { Validation } from '_models/Validation';

@Options({
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