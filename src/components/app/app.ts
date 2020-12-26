import Vue from 'vue';
import Component from 'vue-class-component';
import { Configuration } from '../../models/Configuration';
import { $urlHelper } from '../../services/helpers/urlHelper';
import { $configurationProvider } from '../../services/providers/configurationProvider';
import { $playlistRepository } from '../../services/repositories/playlistRepository';
import { Configurator } from '../configurator/configurator';

@Component({
  name: 'star',
  template: require('./app.pug'),
  components: {
    Configurator
  }
})
export class App extends Vue {
  private configuration: Configuration | null = null;

  private updateConfiguration(configuration: Configuration): void {
    this.configuration = configuration;
  }

  public async created() {
    const id = $urlHelper.getQueryString('id');

    if (id) {
      const result = await $configurationProvider.load(id);

      if (!result) {
        return;
      }

      $playlistRepository.init(result.m3uPath);

      this.configuration = result;
    } else {
    }
  }
}
