import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $modalHelper } from '_services/helpers/modalHelper';
import { $languageRepository } from '_services/repositories/languageRepository';
import ISettingsImportModalProps, { SettingsImportModal } from './settingsImportModal';

@Component({
    name: 'SettingsImport',
    template: require('./settingsImport.pug'),
    components: {
        Layout,
        FontAwesomeIcon
    }
})
export class SettingsImport extends Vue {
    @Prop({ type: Boolean, default: false })
    public disabled: boolean;

    private isPending: boolean = false;
    private isError: boolean = false;
    private isSuccess: boolean = false;

    public created() {}

    private async onClick(): Promise<void> {
        const props: ISettingsImportModalProps = {
            title: $languageRepository.get('importExportSettings')
        };

        $modalHelper.create<typeof SettingsImportModal>(SettingsImportModal, props, () => {
            this.$emit('onUpdate');
        });
    }
}
