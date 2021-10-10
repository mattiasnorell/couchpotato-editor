import { Vue, Options } from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IAuthProvider,  } from '_services/providers/authProvider';
import { inject } from 'inversify-props';

@Options({
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
    if(!this.username){
      console.log('Empty string')
      return;
    }
    const isAuth = this.authProvider.checkAuth(this.username);

    if(isAuth){
      this.$router.push('dashboard');
    }
  }
}
