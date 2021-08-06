import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ModalBase } from '_models/modalBase';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { ISettingsExport } from '_components/settings-export/settingsExport';

@Component({
    name: 'SettingsImportModal',
    template: require('./settingsImportModal.pug'),
    components: {
        FontAwesomeIcon
    }
})
export class SettingsImportModal extends ModalBase {
    @Prop()
    public title: string;

    @Ref('content')
    public content: HTMLDivElement;

    private isJsonValid: boolean = true;

    private model: ISettingsExport = { apiPath: '', webSocketPath: '', gitHubToken: '' };

    public async mounted(): Promise<void> {}

    private onJsonChange(evt: any): void {
        try {
            this.model = JSON.parse(evt.target?.value) as ISettingsExport;
            this.isJsonValid = true;
        } catch (err: any) {
            this.isJsonValid = false;
        }
    }

    private onFileChange(evt: any): void {
        try {
            const file = evt.target?.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.model = JSON.parse(e.target?.result as string) as ISettingsExport;
            };

            reader.readAsText(file);
        } catch (err: any) {}
    }

    private onConfirm(): void {
        if (this.model.webSocketPath) {
            $localStorageRepository.write<string>('couchpotatoWebsocketPath', this.model.webSocketPath);
        }

        if (this.model.gitHubToken) {
            $localStorageRepository.write<string>('githubToken', this.model.gitHubToken);
        }

        if (this.model.apiPath) {
            $localStorageRepository.write<string>('couchpotatoApiPath', this.model.apiPath);
        }

        this.onClose();
    }

    private onClose(): void {
        super.closeModal();
    }
}

export default interface ISettingsImportModalProps {
    title: string;
}

export default interface ISettingsImportModalProps {
    title: string;
}
