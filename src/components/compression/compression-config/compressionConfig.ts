import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../../models/Configuration';
import { InputCheckbox } from '../../base/input-checkbox/inputCheckbox';

@Component({
    name: 'CompressionConfig',
    template: require('./compressionConfig.pug'),
    components: {
      InputCheckbox
    }
})
export class CompressionConfig extends Vue {
  @Prop()
  public config: Configuration;


}