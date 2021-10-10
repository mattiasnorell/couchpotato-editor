
import { Prop, Ref } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ModalBase } from '_models/modalBase';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { ISettingsExport } from '_pages/settings/settings-export/settingsExport';
import { inject } from 'inversify-props';
import { Options } from 'vue-class-component';

@Options({
    name: 'SettingsImportModal',
    template: require('./settingsImportModal.pug'),
    components: {
        FontAwesomeIcon
    }
})
export class SettingsImportModal extends ModalBase {
    @inject()
    private localStorageHelper: ILocalStorageHelper;
    
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
            this.localStorageHelper.write<string>('couchpotatoWebsocketPath', this.model.webSocketPath);
        }

        if (this.model.gitHubToken) {
            this.localStorageHelper.write<string>('githubToken', this.model.gitHubToken);
        }

        if (this.model.apiPath) {
            this.localStorageHelper.write<string>('couchpotatoApiPath', this.model.apiPath);
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
