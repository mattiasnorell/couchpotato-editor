import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'FileUpload',
    template: require('./fileUpload.pug')
})
export class FileUpload extends Vue {
  private importUrl: string = '';

  private import() {
    
  }
}