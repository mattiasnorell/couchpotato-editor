import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ModalBase } from '_models/modalBase';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

@Component({
  name: 'WebSocketModal',
  template: require('./webSocketModal.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class WebSocketModal extends ModalBase {
  @Prop()
  public title: string;

  @Prop()
  public action: string;

  @Prop()
  public url: string;

  @Prop()
  public accessToken: string;

  @Ref('content')
  public content: HTMLDivElement;

  private hasConnectionError: boolean = false;
  private logItems: string[] = [];
  private isPending: boolean = false;
  private websocket: WebSocket | null = null;
  private path: string | null = null;

  public async mounted(): Promise<void> {
    this.path = $localStorageRepository.read<string>('couchpotatoWebsocketPath');
    if (!this.path) {
      this.hasConnectionError = true;
      return;
    }

    
  }

  private run(): void {
    if (!this.path) {
      return;
    }

    this.websocket = new WebSocket(this.path);

    if (!this.websocket) {
      return;
    }

    this.isPending = true;

    this.websocket.onmessage = (event: MessageEvent) => {
      if (event.data) {
        const data = JSON.parse(event.data);

        if (data.data === 'connection_open') {
          return;
        }

        if (data.data === 'running') {
          this.isPending = false;
          return;
        }

        if (data.data === 'done') {
          this.isPending = false;

          if (this.websocket) {
            this.websocket.close(1000);
          }
          return;
        }

        if (data.data && data.data.length > 0) {
          this.logItems.push(data.data);

          if (this.content) {
            this.content.scrollTop = this.content.scrollHeight - this.content.clientHeight;
          }
        }
      }
    };

    this.websocket.onopen = (event: any) => {
      if (this.url && this.action) {
        this.websocket?.send(JSON.stringify({ accessToken: this.accessToken, action: this.action, url: this.url }));
      }

      if (!this.url && this.action) {
        this.websocket?.send(JSON.stringify({ accessToken: this.accessToken, action: this.action }));
      }
    };

    this.websocket.onclose = (event: any) => {
      this.isPending = false;
    };
  }

  private ok(): void {
    super.closeModal();
  }

  private closeAndCancel(): void {
    if (this.websocket) {
      this.websocket.close(1000);
    }

    super.closeModal();
  }

  private closeAndContinue(): void {
    super.closeModal();
  }
}

export default class WebSocketModalProps {
  public title: string;
  public path: string;
  public action: string;
  public url: string;
  public accessToken: string | null;
}
