import { Vue, Options } from 'vue-class-component';

import { Layout } from '_components/base/layout/layout';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { InputText } from '_components/base/input-text/inputText';
import { Collapse } from '_components/base/collapse/collapse';
import { IModalHelper } from '_services/helpers/modalHelper';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { ICouchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { CouchpotatoPlugins } from '_pages/settings/couchpotatoPlugins/couchpotatoPlugins';
import { RestartBackend } from '_pages/settings/restart-backend/restartBackend';
import { RestartCron } from '_pages/settings/restart-cron/restartCron';
import { SettingsExport } from '_pages/settings/settings-export/settingsExport';
import { SettingsImport } from '_pages/settings/settings-import/settingsImport';
import { UpdateBackend } from '_pages/settings/update-backend/updateBackend';
import { CronJobs } from '_pages/settings/cronJobs/cronJobs';
import { CouchpotatoLogs } from '_pages/settings/couchpotatoLogs/couchpotatoLogs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';
import { inject } from 'inversify-props';


@Options({
  name: 'Settings',
  template: require('./settings.pug'),
  components: {
    Layout,
    InputText,
    Collapse,
    CouchpotatoPlugins,
    RestartBackend,
    CronJobs,
    RestartCron,
    FontAwesomeIcon,
    UpdateBackend,
    SettingsImport,
    SettingsExport,
    CouchpotatoLogs
  }
})
@RequireTokenDecorator()
export default class Settings extends Vue {
  @inject() public languageRepository: ILanguageRepository;
  @inject() public localStorageHelper: ILocalStorageHelper;
  @inject() public couchpotatoConnector: ICouchpotatoConnector;
  @inject() public modalHelper: IModalHelper;
  
  private hasConnectionError: boolean = false;
  private couchpotatoApiPath: string | null = '';
  private couchpotatoWebsocketPath: string | null = '';
  private couchpotatoAccessToken: string | null = '';
  private githubToken: string | null = '';

  public async created(): Promise<void> {
    this.loadSettings();
    this.checkConnection();
  }

  private loadSettings():void{
    this.couchpotatoWebsocketPath = this.localStorageHelper.read<string>('couchpotatoWebsocketPath');
    this.couchpotatoApiPath = this.localStorageHelper.read<string>('couchpotatoApiPath');
    this.couchpotatoAccessToken = this.localStorageHelper.read<string>('couchpotatoAccessToken');
    this.githubToken = this.localStorageHelper.read<string>('githubToken');
  }

  private async checkConnection(): Promise<void> {
    const result = await this.couchpotatoConnector.ping();
    this.hasConnectionError = !result;
  }

  private onInputCouchpotatoApiPath(value: string): void {
    console.log(value)
    this.couchpotatoApiPath = value;
    this.localStorageHelper.write<string>('couchpotatoApiPath', value);
    //this.couchpotatoApiPath = this.localStorageHelper.read<string>('couchpotatoApiPath');
    this.checkConnection();
  }

  private onInputCouchpotatoWebsocketPath(value: string): void {
    this.couchpotatoWebsocketPath = value;
    this.localStorageHelper.write<string>('couchpotatoWebsocketPath', value);
    //this.couchpotatoWebsocketPath = this.localStorageHelper.read<string>('couchpotatoWebsocketPath');
  }

  private onInputCouchpotatoToken(value: string): void {
    this.couchpotatoAccessToken = value;
    this.localStorageHelper.write<string>('couchpotatoAccessToken', value);
    //this.couchpotatoAccessToken = this.localStorageHelper.read<string>('couchpotatoAccessToken');
  }

  private onInputGithubToken(value: string): void {
    this.githubToken = value;
    this.localStorageHelper.write<string>('githubToken', value);
    this.githubToken = this.localStorageHelper.read<string>('githubToken');
  }

  private get hasCouchpotatoPath(): boolean {
    return !!this.couchpotatoWebsocketPath && this.couchpotatoWebsocketPath.length > 3;
  }

  private updateCouchpotato(): void {
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = this.languageRepository.get('updateCouchpotato');
    props.action = 'reinstall';
    props.accessToken = this.githubToken;

    this.modalHelper.create<typeof WebSocketModal>(WebSocketModal, props);
  }

  private onSettingsImport():void{
    this.loadSettings();
  }
}
