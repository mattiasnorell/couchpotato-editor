import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { Collapse } from '_components/base/collapse/collapse';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputSelect } from '_components/base/input-select/inputSelect';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { inject } from 'inversify-props';

@Component({
  name: 'couchpotatoPlugins',
  template: require('./couchpotatoPlugins.pug'),
  components: {
    Layout,
    InputText,
    Collapse,
    FontAwesomeIcon,
    InputSelect,
    InputCheckbox
  }
})
export class CouchpotatoPlugins extends Vue {
  @inject() public languageRepository: ILanguageRepository;


  public async created(): Promise<void> {

    this.loadInstalledPlugins();

  }

  private async loadInstalledPlugins(): Promise<void> {
  }
}
