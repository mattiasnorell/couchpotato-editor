import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Group } from '../../../models/Group';
import { InputText } from '../../base/input-text/inputText';
import { GroupPicker } from '../../base/group-picker/groupPicker';
import { FullGroupIncludeRow } from './row/fullGroupIncludeRow';
import { TableEmptyState } from '../../base/table-empty-state/tableEmptyState';

@Component({
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
