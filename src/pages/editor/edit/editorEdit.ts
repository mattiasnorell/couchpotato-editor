import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { Configurator } from '_components/configurator/configurator';
import { Configuration } from '_models/Configuration';
import { $configurationProvider } from '_services/providers/configurationProvider';
import { $playlistRepository } from '_services/repositories/playlistRepository';

@Component({
  name: 'EditorEdit',
  template: require('./editorEdit.pug'),
  components: {
    Layout,
    Configurator
  }
})
@RequireTokenDecorator()
export default class EditorEdit extends Vue {
  @Prop()
  public id: string;

  private configuration: Configuration | null = null;

  private updateConfiguration(configuration: Configuration): void {
    this.configuration = configuration;
  }

  public async created() {
    if (this.id) {
      const result = await $configurationProvider.load(this.id);

      if (!result) {
        return;
      }

      $playlistRepository.init(result.m3uPath);

      this.configuration = result;
    } else {
    }
  }
}
