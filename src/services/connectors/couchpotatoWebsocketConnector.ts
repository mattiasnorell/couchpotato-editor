import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class CouchpotatoWebsocketConnector {
  public ping(timeout: number = 1000): Promise<boolean> {
    const url = $localStorageRepository.read<string>('couchpotatoWebsocketPath');

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
        if (e?.target?.readyState === 3) {
          ws.close();
          resolve(false);
        }
      });
    });
  }
}

const $couchpotatoWebsocketConnector = new CouchpotatoWebsocketConnector();
export { $couchpotatoWebsocketConnector };
