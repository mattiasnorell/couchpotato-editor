import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouteConfig } from 'vue-router';
import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { $authProvider } from '_services/providers/authProvider';

@Component({
  name: 'mainMenu',
  template: require('./mainMenu.pug'),
  components: {
    FontAwesomeIcon
  }
})
@RequireTokenDecorator(false)
export class MainMenu extends Vue {
  private menuItems: RouteConfig[] | undefined = [];

  public created() {
    const routes = this.$router.options.routes;
    this.menuItems = routes;
  }

  private subIsActive(path: string): boolean {
    return this.$route.path === path;
  }

  private isActive(path: string): boolean {
    return this.$route.path.startsWith(path);
  }

  private logout(): void {
    $authProvider.clearToken();
    this.$router.push('login');
  }
}
