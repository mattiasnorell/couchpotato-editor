import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InputText } from '_components/base/input-text/inputText';
import { ModalBase } from '_models/modalBase';
import { ILogProvider } from '_services/providers/logProvider';
import { inject } from 'inversify-props';

@Options({
    name: 'LogModal',
    template: require('./logModal.pug'),
    components: {
        FontAwesomeIcon,
        InputText
    }
})
export class LogModal extends ModalBase {
    @inject() private logProvider: ILogProvider;

    @Prop()
    public logId: string;

    private isPending: boolean = false;
    private contents: string = '';

    public async created(): Promise<void> {
        const result = await this.logProvider.get(this.logId);

        if (result) {
            this.contents = typeof result === 'string' ? result : JSON.stringify(result, undefined, 3);
        }
    }

    private close(): void {
        super.closeModal();
    }
}
