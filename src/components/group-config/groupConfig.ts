import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '_models/Configuration';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { GroupPicker } from '_components/base/group-picker/groupPicker';
import { FullGroupInclude } from './full-group-include/fullGroupInclude';

@Options({
  name: 'GroupConfig',
  template: require('./groupConfig.pug'),
  components: {
    FontAwesomeIcon,
    InputText,
    GroupPicker,
    FullGroupInclude
  }
})
export class GroupConfig extends Vue {
  @Prop()
  public config: Configuration;
}
