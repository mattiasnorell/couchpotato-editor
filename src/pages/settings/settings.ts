import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { InputText } from '_components/base/input-text/inputText';
import { Collapse } from '_components/base/collapse/collapse';
import { $modalHelper } from '_services/helpers/modalHelper';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { $languageRepository } from '_services/repositories/languageRepository';
import { CouchpotatoPlugins } from '_components/couchpotatoPlugins/couchpotatoPlugins';
import { RestartBackend } from '_components/restart-backend/restartBackend';
import { RestartCron } from '_components/restart-cron/restartCron';
import { UpdateBackend } from '_components/update-backend/updateBackend';
import { CronJobs } from '_components/cronJobs/cronJobs';
import { CouchpotatoLogs } from '_components/couchpotatoLogs/couchpotatoLogs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';


@Component({
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
    CouchpotatoLogs
  }
})
@RequireTokenDecorator()
export default class Settings extends Vue {
  private hasConnectionError: boolean = false;

  private couchpotatoApiPath: string | null = '';
  private couchpotatoWebsocketPath: string | null = '';
  private couchpotatoAccessToken: string | null = '';
  private githubToken: string | null = '';

  public async created(): Promise<void> {
    this.couchpotatoWebsocketPath = $localStorageRepository.read<string>('couchpotatoWebsocketPath');
    this.couchpotatoApiPath = $localStorageRepository.read<string>('couchpotatoApiPath');
    this.couchpotatoAccessToken = $localStorageRepository.read<string>('couchpotatoAccessToken');
    this.githubToken = $localStorageRepository.read<string>('githubToken');

    this.checkConnection();
  }

  private async checkConnection(): Promise<void> {
    const result = await $couchpotatoConnector.ping();
    this.hasConnectionError = !result;
  }

  private onInputCouchpotatoApiPath(value: string): void {
    $localStorageRepository.write<string>('couchpotatoApiPath', value);
    this.couchpotatoApiPath = $localStorageRepository.read<string>('couchpotatoApiPath');
    this.checkConnection();
  }

  private onInputCouchpotatoWebsocketPath(value: string): void {
    $localStorageRepository.write<string>('couchpotatoWebsocketPath', value);
    this.couchpotatoWebsocketPath = $localStorageRepository.read<string>('couchpotatoWebsocketPath');
  }

  private onInputCouchpotatoToken(value: string): void {
    $localStorageRepository.write<string>('couchpotatoAccessToken', value);
    this.couchpotatoAccessToken = $localStorageRepository.read<string>('couchpotatoAccessToken');
  }

  private onInputGithubToken(value: string): void {
    $localStorageRepository.write<string>('githubToken', value);
    this.githubToken = $localStorageRepository.read<string>('githubToken');
  }

  private get hasCouchpotatoPath(): boolean {
    return !!this.couchpotatoWebsocketPath && this.couchpotatoWebsocketPath.length > 3;
  }

  private updateCouchpotato(): void {
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = $languageRepository.get('updateCouchpotato');
    props.action = 'reinstall';
    props.accessToken = this.couchpotatoAccessToken;

    $modalHelper.create<typeof WebSocketModal>(WebSocketModal, props);
  }
}
