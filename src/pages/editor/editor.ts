import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { Configurator } from '_components/configurator/configurator';

@RequireTokenDecorator()
@Component({
  name: 'Editor',
  template: require('./editor.pug'),
  components: {
    Layout,
    Configurator
  }
})
export default class Editor extends Vue {
  
}
