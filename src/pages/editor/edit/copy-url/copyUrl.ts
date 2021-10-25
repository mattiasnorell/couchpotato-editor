import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { inject } from 'inversify-props';

@Options({
  name: 'CopyUrl',
  template: require('./copyUrl.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class CopyUrl extends Vue {
  @inject() private localStorageHelper: ILocalStorageHelper;

  @Prop()
  private configurationId: string;

  private showCopySuccessful: boolean = false;

  private copy(): void {
    const configFolder = 'config';
    const username = this.localStorageHelper.read<string>('user');
    const path = `${window.location.protocol}//${window.location.hostname}/${configFolder}/${username}/${this.configurationId}.json`;

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