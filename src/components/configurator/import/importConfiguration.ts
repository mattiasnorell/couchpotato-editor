import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Configuration } from '../../../models/Configuration';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $modalHelper } from '../../../services/helpers/modalHelper';
import { ImportForm, ImportFormProps } from './import-form/importForm';

@Component({
  name: 'ImportConfiguration',
  template: require('./importConfiguration.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class ImportConfiguration extends Vue {
  
  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  private async openModal(): Promise<void> {
    const props: ImportFormProps = new ImportFormProps();
    props.title = 'Importera konfiguration';
    $modalHelper.create<typeof ImportForm>(ImportForm, props, (evt: any) => {
      this.$emit('onImport', evt);
    });
  }
}
