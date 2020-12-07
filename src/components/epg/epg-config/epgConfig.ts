import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '../../base/input-text/inputText';
import { Epg } from '../../../models/Epg';
import { InputCheckbox} from '../../base/input-checkbox/inputCheckbox';
import { TableEmptyState } from '../../base/table-empty-state/tableEmptyState';

@Component({
    name: 'EpgConfig',
    template: require('./epgConfig.pug'),
    components: {
      FontAwesomeIcon,
      InputText,
      InputCheckbox,
      TableEmptyState
    }
})
export class EpgConfig extends Vue {
  @Prop()
  public epg: Epg;

  private newPath: string = '';

  private addPath(): void{
    this.epg.paths.push(this.newPath);
    this.newPath = '';
  }

  private deletePath(index: number): void{
    this.epg.paths.splice(index, 1);
  }

  private getEpgName(path: string): string{
    const index = path.lastIndexOf('/') + 1;
    return path.substring(index, path.length);
  }
}