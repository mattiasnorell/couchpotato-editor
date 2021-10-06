import { Vue, Options } from 'vue-class-component';

import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IModalHelper } from '_services/helpers/modalHelper';
import { ILanguageRepository } from '_services/repositories/languageRepository';
import ISettingsImportModalProps, { SettingsImportModal } from './settingsImportModal';
import { inject } from 'inversify-props';

@Options({
    name: 'SettingsImport',
    template: require('./settingsImport.pug'),
    components: {
        Layout,
        FontAwesomeIcon
    }
})
export class SettingsImport extends Vue {
    @inject() public languageRepository: ILanguageRepository;
    @inject() public modalHelper: IModalHelper;

    @Prop({ type: Boolean, default: false })
    public disabled: boolean;

    private isPending: boolean = false;
    private isError: boolean = false;
    private isSuccess: boolean = false;

    public created() {}

    private async onClick(): Promise<void> {
        const props: ISettingsImportModalProps = {
            title: this.languageRepository.get('importExportSettings')
        };

        this.modalHelper.create<typeof SettingsImportModal>(SettingsImportModal, props, () => {
            this.$emit('onUpdate');
        });
    }
}
