import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { Configuration } from '_models/Configuration';
import { IConfigurationProvider } from '_services/providers/configurationProvider';
import { IPlaylistRepository } from '_services/repositories/playlistRepository';
import { inject } from 'inversify-props';
import { Collapse } from '_components/base/collapse/collapse';
import { ValidationConfig } from '_pages/editor/edit/validation/validation-config/validationConfig';
import { GroupConfig } from '_pages/editor/edit/group-config/groupConfig';
import { CompressionConfig } from '_pages/editor/edit/compression-config/compressionConfig';
import { GenericConfig } from '_pages/editor/edit/generic-config/genericConfig';
import { CopyUrl } from '_pages/editor/edit/copy-url/copyUrl';
import { ImportConfiguration } from '_pages/editor/edit/import/importConfiguration';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { ExportConfiguration } from '_pages/editor/edit/export/exportConfiguration';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';
import { StreamList } from './streams/stream-list/streamList';
import { EpgConfig } from './epg-config/epgConfig';
import { Save } from './save/save';

@Options({
  name: 'EditorEdit',
  template: require('./editorEdit.pug'),
  components: {
    Layout,
    StreamList,
    EpgConfig,
    Save,
    CopyUrl,
    Collapse,
    ValidationConfig,
    CompressionConfig,
    GenericConfig,
    InputCheckbox,
    GroupConfig,
    ImportConfiguration,
    ExportConfiguration,
    TriggerCouchpotato
  }
})
@RequireTokenDecorator()
export default class EditorEdit extends Vue {
  @inject() public configurationProvider: IConfigurationProvider;
  @inject() public playlistRepository: IPlaylistRepository;

  @Prop()
  public id: string;

  private configuration: Configuration | null = null;

  private onImport(configuration: Configuration): void {
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
