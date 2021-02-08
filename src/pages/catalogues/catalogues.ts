import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';

@Component({
  name: 'Catalogues',
  template: require('./catalogues.pug'),
  components: {
    Layout
  }
})
export default class Catalogues extends Vue {
  public created() {
  }
}
