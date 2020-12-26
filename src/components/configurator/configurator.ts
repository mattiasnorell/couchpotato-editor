import Vue from 'vue';
import Component from 'vue-class-component';

import { StreamList } from '../streams/stream-list/streamList';
import { EpgConfig } from '../epg/epg-config/epgConfig';
import { Save } from './save/save';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../models/Configuration';
import { Collapse } from '../base/collapse/collapse';
import { ValidationConfig } from '../validation/validation-config/validationConfig';
import { GroupConfig } from '../group-config/groupConfig';
import { CompressionConfig } from '../compression/compression-config/compressionConfig';
import { GenericConfig } from '../generic/generic-config/genericConfig';
import { CopyUrl } from './copy-url/copyUrl';
import { ImportConfiguration } from './import/importConfiguration';
import { InputCheckbox } from '../base/input-checkbox/inputCheckbox';
import { ExportConfiguration } from './export/exportConfiguration';
import { TriggerCouchpotato } from './trigger-couchpotato/triggerCouchpotato';

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

  private onImport(data: Configuration): void{
    if(!data){
      return;
    }
    
    this.$emit('onConfigurationUpdate', data);
  }
}
