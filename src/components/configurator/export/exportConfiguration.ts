import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../../models/Configuration';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $urlHelper } from '../../../services/helpers/urlHelper';

@Component({
  name: 'ExportConfiguration',
  template: require('./exportConfiguration.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class ExportConfiguration extends Vue {
  @Prop()
  public configuration: Configuration;
  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  private onClick(): void {
    const id = $urlHelper.getQueryString('id');
    const fileName = id ? `${id}.json}` : 'couchpotato.json';
    const a = document.createElement('a');
    const content = JSON.stringify(this.configuration);
    const file = new Blob([content], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
