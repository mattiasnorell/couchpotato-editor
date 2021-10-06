import { Vue, Options } from 'vue-class-component';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IModalHelper } from '_services/helpers/modalHelper';
import { ImportForm, ImportFormProps } from './import-form/importForm';
import { inject } from 'inversify-props';

@Options({
  name: 'ImportConfiguration',
  template: require('./importConfiguration.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class ImportConfiguration extends Vue {
  @inject() private modalHelper: IModalHelper;

  private isPending: boolean = false;
  private isError: boolean = false;
  private isSuccess: boolean = false;

  private async openModal(): Promise<void> {
    const props: ImportFormProps = new ImportFormProps();
    props.title = 'Importera konfiguration';
    this.modalHelper.create<typeof ImportForm>(ImportForm, props, (evt: any) => {
      this.$emit('onImport', evt);
    });
  }
}
