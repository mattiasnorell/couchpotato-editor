import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../models/Configuration';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Group } from '../../models/Group';
import { InputText } from '../base/input-text/inputText';
import { GroupPicker } from '../base/group-picker/groupPicker';
import { FullGroupInclude } from './full-group-include/fullGroupInclude';

@Component({
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
