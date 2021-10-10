import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { inject, injectable } from 'inversify-props';

export interface ICouchpotatoWebsocketConnector {
  ping(timeout?: number): Promise<boolean>
}

@injectable()
export class CouchpotatoWebsocketConnector {
  @inject() public localStorageHelper: ILocalStorageHelper;

  public ping(timeout: number = 1000): Promise<boolean> {
    const url = this.localStorageHelper.read<string>('couchpotatoWebsocketPath');

    return new Promise((resolve, reject) => {
      if (!url) {
        resolve(false);
        return;
      }

      const ws = new WebSocket(url);

      setTimeout(() => {
        ws.close();

        resolve(false);
      }, timeout);

      ws.addEventListener('open', (e: any) => {
        ws.close();
        resolve(true);
      });

      ws.addEventListener('close', (e: any) => {

      });

      ws.addEventListener('error', (e: any) => {
        if (e ?.target ?.readyState === 3) {
          ws.close();
          resolve(false);
        }
      });
    });
  }
}