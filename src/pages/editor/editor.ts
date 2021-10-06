import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { Vue, Options } from 'vue-class-component';

import { Layout } from '_components/base/layout/layout';
import { Configurator } from '_components/configurator/configurator';

@RequireTokenDecorator()
@Options({
  name: 'Editor',
  template: require('./editor.pug'),
  components: {
    Layout,
    Configurator
  }
})
export default class Editor extends Vue {
  
}
