import { Vue, Options } from 'vue-class-component';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//import { RouteConfig } from 'vue-router';
import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { IAuthProvider } from '_services/providers/authProvider';
import { inject } from 'inversify-props';
import { AuthDecorator } from 'src/decorators/AuthDecorator';

@Options({
  name: 'mainMenu',
  template: require('./mainMenu.pug'),
  components: {
    FontAwesomeIcon
  }
})
@RequireTokenDecorator(false)
@AuthDecorator()
export class MainMenu extends Vue {
  @inject()
  private authProvider: IAuthProvider;
  
  private menuItems: any[] | undefined = [];

  public created() {
    const routes = this.$router.options.routes;
    this.menuItems = routes.filter(item => item?.meta?.showInMenu);
  }

  private subIsActive(path: string): boolean {
    return this.$route.path === path;
  }

  private isActive(path: string): boolean {
    return this.$route.path.startsWith(path);
  }

  private logout(): void {
    this.authProvider.clearToken();
    this.$router.push('login');
  }
}
