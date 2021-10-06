import { Vue, Options } from 'vue-class-component';

@Options({
    name: 'AbstractRouterView',
    template: require('./abstractRouterView.pug'),
    components: {
    }
})
export default class AbstractRouterView extends Vue {
 public created(){
 }
}