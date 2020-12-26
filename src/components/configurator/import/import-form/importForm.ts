import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'ImportForm',
  template: require('./importForm.pug'),
  components: {
    FontAwesomeIcon
  }
})
export class ImportForm extends Vue {
  @Prop()
  public title: string;

  private loadFile(ev: any): void {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) {
        return;
      }

      const result = JSON.parse(e.target?.result?.toString());
      const event = new CustomEvent('closeModal', { detail: { configuration: result } });
      window.dispatchEvent(event);
    };
    reader.readAsText(file);
  }

  private ok(): void {
    const event = new CustomEvent('closeModal');
    window.dispatchEvent(event);
  }
}

export class ImportFormProps {
  public title: string;
}
