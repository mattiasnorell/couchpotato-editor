import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';

@RequireTokenDecorator()
@Component({
  name: 'Start',
  template: require('./start.pug'),
  components: {
    Layout
  }
})
export default class Start extends Vue {}
