import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Options({
    name: 'CopyStreamUrl',
    template: require('./copyStreamUrl.pug'),
    components: {
        FontAwesomeIcon
    }
})
export class CopyStreamUrl extends Vue {
    @Prop({ type: String, default: '' })
    private url: string;

    private showCopySuccessful: boolean = false;

    private copy(): void {
        const configFolder = 'config';

        if (!navigator.clipboard) {
            window.prompt('Kopiera från fältet', this.url);
            return;
        }

        navigator.clipboard.writeText(this.url);

        this.showCopySuccessful = true;

        setTimeout(() => {
            this.showCopySuccessful = false;
        }, 1000);
    }
}
