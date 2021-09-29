import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $authProvider, IAuthProvider } from '_services/providers/authProvider';
import { inject } from 'inversify-props';

@Component({
  name: 'Login',
  template: require('./login.pug'),
  components: {
    Layout,
    InputText,
    FontAwesomeIcon
  }
})
export default class Login extends Vue {
  @inject()
  private authProvider: IAuthProvider;
  
  private username: string = '';
  
  public created() {}

  private login(): void {
    const isAuth = this.authProvider.checkAuth(this.username);

    if(isAuth){
      this.$router.push('dashboard');
    }
  }
}
