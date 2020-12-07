import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'TableEmptyState',
  template: require('./tableEmptyState.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class TableEmptyState extends Vue {
  @Prop()
  public title: string;

  @Prop()
  public colspan: number;
}
