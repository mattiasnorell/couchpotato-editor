import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '_models/Configuration';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';

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