import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { MainMenu } from '../main-menu/mainMenu';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { $authProvider } from '_services/providers/authProvider';

@Component({
  name: 'Layout',
  template: require('./layout.pug'),
  components: {
    FontAwesomeIcon,
    MainMenu
  }
})
export class Layout extends Vue {
  public showMenu: boolean = false;
  
  public created(){
    
  }

  
}
