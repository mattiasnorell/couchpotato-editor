import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
    name: 'Collapse',
    template: require('./collapse.pug'),
    components: {
      FontAwesomeIcon
    }
})
export class Collapse extends Vue {
  @Prop()
  public title: string;

  @Prop({type: Boolean, default: false})
  public openAtRender: boolean;

  private isOpen: boolean = false;

  public created(): void{
    this.isOpen = this.openAtRender;
  }

  private toggle(): void{
    this.isOpen = !this.isOpen;
  }
}