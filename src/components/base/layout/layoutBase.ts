import { Vue, Options } from 'vue-class-component';


@Options({
  name: 'LayoutBase',
  template: require('./layoutBase.pug'),
  components: {
  }
})
export class LayoutBase extends Vue {
  
}
