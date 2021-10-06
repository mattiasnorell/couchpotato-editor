import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { Vue, Options } from 'vue-class-component';

import { Layout } from '_components/base/layout/layout';

@RequireTokenDecorator()
@Options({
  name: 'Editor',
  template: require('./editor.pug'),
  components: {
    Layout
  }
})
export default class Editor extends Vue {
  
}
