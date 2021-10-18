import { Vue, Options } from 'vue-class-component';
import { LayoutBase } from '_components/base/layout/layoutBase';
import { InputText } from '_components/base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IAuthProvider,  } from '_services/providers/authProvider';
import { inject } from 'inversify-props';
import { $appConfig } from '_config/appConfig';

@Options({
  name: 'Login',
  template: require('./login.pug'),
  components: {
    LayoutBase,
    InputText,
    FontAwesomeIcon
  }
})
export default class Login extends Vue {
  @inject()
  private authProvider: IAuthProvider;
  
  private username: string = '';
  private password: string = '';
  private version: string = '';
  
  public created() {
    this.version = $appConfig.version();
  }

  private async login(): Promise<void> {
    if(!this.username){
      console.log('Empty string')
      return;
    }
    const isAuth = await this.authProvider.checkAuth(this.username, this.password);

    if(isAuth){
      this.$router.push('dashboard');
    }
  }
}
