import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '_models/Configuration';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IUrlHelper } from '_services/helpers/urlHelper';
import { inject } from 'inversify-props';
import { IDownloadHelper } from '_services/helpers/downloadHelper';

@Component({
  name: 'ExportConfiguration',
  template: require('./exportConfiguration.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class ExportConfiguration extends Vue {
  @inject() private urlHelper: IUrlHelper;
  @inject() private downloadHelper: IDownloadHelper;

  @Prop()
  public configuration: Configuration;
  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  private onClick(): void {
    const id = this.urlHelper.getQueryString('id');
    const fileName = id ? `${id}.json}` : 'couchpotato.json';
    const content = JSON.stringify(this.configuration);
    this.downloadHelper.download(fileName, content, 'application/json');
  }
}
