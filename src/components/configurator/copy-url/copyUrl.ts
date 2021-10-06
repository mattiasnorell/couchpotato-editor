import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Options({
  name: 'CopyUrl',
  template: require('./copyUrl.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class CopyUrl extends Vue {
  @Prop()
  private configurationId: string;

  private showCopySuccessful: boolean = false;

  private copy(): void {
    const configFolder = 'config';
    const path = `${window.location.protocol}//${window.location.hostname}/${configFolder}/${this.configurationId}.json`;

    if(!navigator.clipboard){
      window.prompt('Kopiera från fältet', path);
      return;
    }

    navigator.clipboard.writeText(path);

    this.showCopySuccessful = true;

    setTimeout(() => {
      this.showCopySuccessful = false;
    }, 1000);
  }
}