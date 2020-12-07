import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../../models/Configuration';
import { $urlHelper } from '../../../services/helpers/urlHelper';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'CopyUrl',
  template: require('./copyUrl.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class CopyUrl extends Vue {
  @Prop()
  private configuration: Configuration;

  private showCopySuccessful: boolean = false;

  private copy(): void {
    const id = $urlHelper.getQueryString('id');
    const configFolder = 'config';
    const path = `${window.location.protocol}//${window.location.hostname}/${configFolder}/${id}.json`;
    navigator.clipboard.writeText(path);

    this.showCopySuccessful = true;

    setTimeout(() => {
      this.showCopySuccessful = false;
    }, 1000);
  }
}
