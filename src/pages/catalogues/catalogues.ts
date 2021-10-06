import { Vue, Options } from 'vue-class-component';

import { Layout } from '_components/base/layout/layout';

@Options({
    name: 'Catalogues',
    template: require('./catalogues.pug'),
    components: {
        Layout
    }
})
export default class Catalogues extends Vue {
    public created() {}
}
