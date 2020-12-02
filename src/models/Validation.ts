class Validation {
  enabled: boolean = false;
  showInvalid: boolean = true;
  invalidSufix: string = '';
  minimumContentLength: number = 2000000;
  defaultFallbacks: { [key: string]: string[] };
}
