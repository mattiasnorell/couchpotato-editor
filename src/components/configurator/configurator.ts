import Vue from 'vue';
import Component from 'vue-class-component';

import { StreamList } from '../streams/stream-list/streamList';
import { EpgConfig } from '../epg/epg-config/epgConfig';
import { Save } from './save/save';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '_models/Configuration';
import { Collapse } from '_components/base/collapse/collapse';
import { ValidationConfig } from '_components/validation/validation-config/validationConfig';
import { GroupConfig } from '_components/group-config/groupConfig';
import { CompressionConfig } from '_components/compression/compression-config/compressionConfig';
import { GenericConfig } from '_components/generic/generic-config/genericConfig';
import { CopyUrl } from '_components/configurator/copy-url/copyUrl';
import { ImportConfiguration } from '_components/configurator/import/importConfiguration';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { ExportConfiguration } from '_components/configurator/export/exportConfiguration';
import { TriggerCouchpotato } from '_components/trigger-couchpotato/triggerCouchpotato';

@Component({
  name: 'Configurator',
  template: require('./configurator.pug'),
  components: {
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
export class Configurator extends Vue {
  @Prop()
  public configuration: Configuration;

  @Prop()
  public configurationId: string;
  
  private onImport(data: Configuration): void{
    if(!data){
      return;
    }
    
    this.$emit('onConfigurationUpdate', data);
  }
}
