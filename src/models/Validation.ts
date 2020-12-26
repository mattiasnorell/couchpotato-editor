export class Validation {
  groupEnabled: boolean = false;
  singleEnabled: boolean = false;
  showInvalid: boolean = true;
  invalidSufix: string = '';
  minimumContentLength: number = 2000000;
  defaultFallbacks: DefaultValidationFallback[];
}

export class DefaultValidationFallback{
  constructor() {
    this.value = [];
  }

  public key: string;
  public value: string[];
}