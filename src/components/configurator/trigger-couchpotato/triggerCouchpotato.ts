import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { $localStorageRepository } from '../../../services/repositories/localStorageRepository';
import { $languageRepository } from '../../../services/repositories/languageRepository';

@Component({
  name: 'TriggerCouchpotato',
  template: require('./triggerCouchpotato.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class TriggerCouchpotato extends Vue {
  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  private async onClick(): Promise<void> {
    let couchpotatoPath = $localStorageRepository.read<string>('couchpotatoWebhookPath');

    if (!couchpotatoPath || !couchpotatoPath.startsWith('http')) {
      couchpotatoPath = window.prompt($languageRepository.get('setCouchpotatoPath'));
    }

    if (!couchpotatoPath) {
      return;
    }

    this.isPending = true;

    try {
      const result = await axios.get(couchpotatoPath);
      this.isPending = false;

      if(result.data === 'running'){
        alert($languageRepository.get('couchpotatoIsRunning'));
        return;
      }
      
      $localStorageRepository.write<string>('couchpotatoWebhookPath', couchpotatoPath);
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    } catch (err) {
      this.isPending = false;
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 1000);
    }
  }
}
