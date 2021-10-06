import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Group } from '_models/Group';
import { InputText } from '_components/base/input-text/inputText';
import { GroupPicker } from '_components/base/group-picker/groupPicker';
import { FullGroupIncludeRow } from './row/fullGroupIncludeRow';
import { TableEmptyState } from '_components/base/table-empty-state/tableEmptyState';

@Options({
  name: 'FullGroupInclude',
  template: require('./fullGroupInclude.pug'),
  components: {
    FontAwesomeIcon,
    InputText,
    GroupPicker,
    FullGroupIncludeRow,
    TableEmptyState
  }
})
export class FullGroupInclude extends Vue {
  @Prop()
  public config: Group[];

  private onSelect(groupId: string): void {
    const group = new Group();
    group.exclude = [];
    group.friendlyName = groupId;
    group.groupId = groupId;
    
    this.config.push(group);
  }

  private onDelete(index: number): void {
    this.config.splice(index, 1);
  }
}
