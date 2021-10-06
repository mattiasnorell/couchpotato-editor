import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Options({
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
