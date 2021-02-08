import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $authProvider } from '_services/providers/authProvider';

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
  private username: string = '';

  public created() {}

  private login(): void {
    const isAuth = $authProvider.checkAuth(this.username);

    if(isAuth){
      this.$router.push('dashboard');
    }
  }
}
