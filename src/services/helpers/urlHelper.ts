import { injectable } from 'inversify-props';

export interface IUrlHelper {
    getQueryString(key: string): string | null;
    setQueryString(key: string, value: string): Promise<string>;
    replaceHistoryState(title: string, path: string): void;
    pushHistoryState(title: string, path: string): void;
    getPageUrl(): string;
}

@injectable()
export class UrlHelper implements IUrlHelper {
    public getPageUrl(): string {
        return window.location.href?.split('?')[0];
    }

    public getQueryString(key: string): string | null {
        const url = new URLSearchParams(window.location.search);
        const result = url.get(key);

        return result;
    }

    public async setQueryString(key: string, value: string): Promise<string> {
        const url = new URLSearchParams(window.location.search);
        url.set(key, value);
        const result = url.toString();
        return result;
    }

    public pushHistoryState(title: string, path: string): void {
        window.history.pushState({}, title, path);
    }

    public replaceHistoryState(title: string, path: string): void {
        window.history.replaceState({}, title, path);
    }
}
