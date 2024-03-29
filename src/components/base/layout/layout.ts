import { Vue, Options } from 'vue-class-component';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { MainMenu } from '../main-menu/mainMenu';
import { $appConfig } from '_config/appConfig';


@Options({
  name: 'Layout',
  template: require('./layout.pug'),
  components: {
    FontAwesomeIcon,
    MainMenu
  }
})
export class Layout extends Vue {
  public showMenu: boolean = false;
  public version: string = '';

  public created() {
    this.version = $appConfig.version();
  }
}
