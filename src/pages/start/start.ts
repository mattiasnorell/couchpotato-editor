import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { Vue, Options } from 'vue-class-component';

import { Layout } from '_components/base/layout/layout';

@RequireTokenDecorator()
@Options({
  name: 'Start',
  template: require('./start.pug'),
  components: {
    Layout
  }
})
export default class Start extends Vue {}
