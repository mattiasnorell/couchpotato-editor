import { Vue, Options } from 'vue-class-component';


@Options({
    name: 'FileUpload',
    template: require('./fileUpload.pug')
})
export class FileUpload extends Vue {
  private importUrl: string = '';

  private import() {
    
  }
}