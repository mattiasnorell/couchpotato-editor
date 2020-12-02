import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../../models/Configuration';
import { InputText } from '../../base/input-text/inputText';

@Component({
    name: 'GenericConfig',
    template: require('./genericConfig.pug'),
    components: {
      InputText
    }
})
export class GenericConfig extends Vue {
  @Prop()
  public config: Configuration;

}