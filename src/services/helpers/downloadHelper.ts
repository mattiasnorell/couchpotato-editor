import { injectable } from 'inversify-props';

export interface IDownloadHelper {
    download(fileName: string, content: string, contentType: string): void;
}

@injectable()
export class DownloadHelper implements IDownloadHelper {
    public download(fileName: string, content: string, contentType: string): void {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    }
}
