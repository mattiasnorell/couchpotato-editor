import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    name: 'AbstractRouterView',
    template: require('./abstractRouterView.pug'),
    components: {
    }
})
export default class AbstractRouterView extends Vue {
 public created(){
 }
}