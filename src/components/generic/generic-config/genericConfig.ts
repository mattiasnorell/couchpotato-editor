import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { Configuration } from '_models/Configuration';
import { InputText } from '_components/base/input-text/inputText';

@Options({
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
