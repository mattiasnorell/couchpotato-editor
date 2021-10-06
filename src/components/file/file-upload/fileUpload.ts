import { Vue, Options } from 'vue-class-component';


@Options({
    name: 'FileUpload',
    template: require('./fileUpload.pug')
})
export class FileUpload extends Vue {
  private parseFile(ev: any) {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = e => this.$emit("load", e.target?.result);
    reader.readAsText(file);
  }
}