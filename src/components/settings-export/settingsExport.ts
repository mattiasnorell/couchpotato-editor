import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { $couchpotatoConnector } from '_services/connectors/couchpotatoConnector';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { $urlHelper } from '_services/helpers/urlHelper';

@Component({
    name: 'SettingsExport',
    template: require('./settingsExport.pug'),
    components: {
        Layout,
        FontAwesomeIcon
    }
})
export class SettingsExport extends Vue {
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
        const a = document.createElement('a');
        const content = data;
        const file = new Blob([content], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    }

    private getExportData(): string {
        return JSON.stringify(this.createExportData());
    }

    private createExportData(): ISettingsExport {
        const exportData: ISettingsExport = {
            apiPath: $localStorageRepository.read<string>('couchpotatoApiPath'),
            webSocketPath: $localStorageRepository.read<string>('couchpotatoWebsocketPath'),
            gitHubToken: $localStorageRepository.read<string>('githubToken')
        };

        return exportData;
    }
}

export interface ISettingsExport {
    apiPath: string | null;
    webSocketPath: string | null;
    gitHubToken: string | null;
}
