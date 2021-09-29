import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { Configurator } from '_components/configurator/configurator';
import { Configuration } from '_models/Configuration';
import { IConfigurationProvider } from '_services/providers/configurationProvider';
import { IPlaylistRepository } from '_services/repositories/playlistRepository';
import { inject } from 'inversify-props';

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
  @inject() public configurationProvider: IConfigurationProvider;
  @inject() public playlistRepository: IPlaylistRepository;

  @Prop()
  public id: string;

  private configuration: Configuration | null = null;

  private updateConfiguration(configuration: Configuration): void {
    this.configuration = configuration;
  }

  public async mounted() {
    if (this.id) {
      const result = await this.configurationProvider.load(this.id);

      if (!result) {
        return;
      }

      this.playlistRepository.init(result.m3uPath);

      this.configuration = result;
    } else {
    }
  }
}
