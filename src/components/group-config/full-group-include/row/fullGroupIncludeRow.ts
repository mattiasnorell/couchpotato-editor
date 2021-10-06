import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Group } from '_models/Group';
import { InputText } from '_components/base/input-text/inputText';
import { GroupPicker } from '_components/base/group-picker/groupPicker';
import { IModalHelper } from '_services/helpers/modalHelper';
import { Excluded, ExcludedProps } from '_components/group-config/excluded/excluded';
import { inject } from 'inversify-props';

@Options({
  name: 'FullGroupIncludeRow',
  template: require('./fullGroupIncludeRow.pug'),
  components: {
    FontAwesomeIcon,
    InputText,
    GroupPicker
  }
})
export class FullGroupIncludeRow extends Vue {
  @inject() public modalHelper: IModalHelper;
  
  @Prop()
  public group: Group;
  private isEdit: boolean = false;

  private deleteGroup(): void {
    this.$emit('onDelete');
  }

  private onSelect(groupId: string): void {
    this.group.groupId = groupId;
    this.isEdit = false;
  }

  private onBlur(): void {
    this.isEdit = false;
  }

  private edit(): void {
    this.isEdit = !this.isEdit;
  }

  private openExcludeModal(): void{
    if(!this.group.exclude){
      this.group.exclude = [];
    }
    
    const excludedProps: ExcludedProps = new ExcludedProps();
    excludedProps.title = 'Excludera stream från grupp';
    excludedProps.items = this.group.exclude;

    this.modalHelper.create<typeof Excluded>(Excluded, excludedProps, (evt: any) => {

    });
  }
}
