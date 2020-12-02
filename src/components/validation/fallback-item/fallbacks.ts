import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
  name: 'Falbacks',
  template: require('./fallbacks.pug'),
  components: {}
})
export class Fallbacks extends Vue {
  @Prop()
  public config: { [key: string]: string[] };

  public created(): void{

  }
}
