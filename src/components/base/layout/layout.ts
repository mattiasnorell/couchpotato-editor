import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { MainMenu } from '../main-menu/mainMenu';

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
