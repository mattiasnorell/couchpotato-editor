import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'Groups',
    template: require('./groups.pug'),
    components: {
    }
})
export class Groups extends Vue {
  @Prop()
  public group: Validation;

}