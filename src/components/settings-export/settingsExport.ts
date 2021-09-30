import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ILocalStorageRepository } from '_services/repositories/localStorageRepository';
import { inject } from 'inversify-props';
import { IDownloadHelper } from '_services/helpers/downloadHelper';

@Component({
    name: 'SettingsExport',
    template: require('./settingsExport.pug'),
    components: {
        Layout,
        FontAwesomeIcon
    }
})
export class SettingsExport extends Vue {
    @inject() private downloadHelper: IDownloadHelper;

    @inject()
    private localStorageRepository: ILocalStorageRepository;

    @Prop({ type: Boolean, default: false })
    public disabled: boolean;
    private isPending: boolean = false;
    private isError: boolean = false;
    private isSuccess: boolean = false;
    private isOpen: boolean = false;

    public created() {}

    private onToggle(): void {
        this.isOpen = !this.isOpen;
    }

    private onCopy(): void {
        const data = this.getExportData();

        if (!navigator.clipboard) {
            window.prompt('Kopiera från fältet', data);
            return;
        }

        navigator.clipboard.writeText(data);
    }

    private onDownload(): void {
        this.isOpen = false;

        const data = this.getExportData();
        const fileName = 'couchpotato-settings.json';
        const content = data;
        this.downloadHelper.download(fileName, content, 'application/json');
    }

    private getExportData(): string {
        return JSON.stringify(this.createExportData());
    }

    private createExportData(): ISettingsExport {
        const exportData: ISettingsExport = {
            apiPath: this.localStorageRepository.read<string>('couchpotatoApiPath'),
            webSocketPath: this.localStorageRepository.read<string>('couchpotatoWebsocketPath'),
            gitHubToken: this.localStorageRepository.read<string>('githubToken')
        };

        return exportData;
    }
}

export interface ISettingsExport {
    apiPath: string | null;
    webSocketPath: string | null;
    gitHubToken: string | null;
}
