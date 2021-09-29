import Vue from 'vue';
import Component from 'vue-class-component';
import { InputText } from '_components/base/input-text/inputText';
import { InputCheckbox } from '_components/base/input-checkbox/inputCheckbox';
import { ICronConnector, CronJob } from '_services/connectors/cronConnector';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import WebSocketModalProps, { WebSocketModal } from '_components/websocket-modal/webSocketModal';
import { IModalHelper } from '_services/helpers/modalHelper';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import { inject } from 'inversify-props';


@Component({
  name: 'CronJobs',
  template: require('./cronJobs.pug'),
  components: {
    InputText,
    FontAwesomeIcon,
    InputCheckbox
  }
})
export class CronJobs extends Vue {
  @inject() public languageRepository: ILanguageRepository;
  @inject() public cronConnector: ICronConnector;
  @inject() public modalHelper: IModalHelper;
  
  
  private jobs: CronJob[] = [];
  private newJob: CronJob = new CronJob();
  private showInactive: boolean = false;

  public async created(): Promise<void> {
    this.loadJobs();
  }

  private async loadJobs(): Promise<void>{
    this.jobs = await this.cronConnector.getAll(this.showInactive);
  }

  private async createCronJob(): Promise<void>{    
    await this.cronConnector.create(this.newJob);
    this.newJob = new CronJob();
    this.loadJobs();
  }

  private async save(): Promise<void>{
    await this.cronConnector.save(this.jobs);
    this.loadJobs();
  }

  private async deleteCronJob(job: CronJob): Promise<void>{
    const confirm = window.confirm('Är du säker?');

    if(!confirm){
      return;
    }

    await this.cronConnector.remove(job.id);
    this.loadJobs();
  }

  private runCronJob(job:CronJob): void {
    const props: WebSocketModalProps = new WebSocketModalProps();
    props.title = this.languageRepository.get('runCronJob');
    props.action = 'run';
    props.url = job.command;

    this.modalHelper.create<typeof WebSocketModal>(WebSocketModal, props);
  }
}
