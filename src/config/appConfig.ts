declare var __VERSION__: string;

class AppConfig {
  private _version: string;

  constructor(){
    this._version = __VERSION__;
  }
 
  public version(): string {
    return this._version;
  }
}

const $appConfig = new AppConfig();
export { $appConfig };
