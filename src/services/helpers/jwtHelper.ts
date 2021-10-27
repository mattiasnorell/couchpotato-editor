import { injectable } from 'inversify-props';

export interface IJwtHelper {
    decode<T>(token: string): T;
    getExpireTimestamp(token: string): number;
    isTokenValid(token: string): boolean;
}

@injectable()
export class JwtHelper implements IJwtHelper {
    private _date: Date = new Date();

    public decode<T>(token: string): T {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    public getExpireTimestamp(token: string): number {
        return this.decode<Token>(token).exp;
    }

    public isTokenValid(token: string): boolean {
        return this.getExpireTimestamp(token) > Math.round(this._date.getTime() / 1000);
    }
}

export class Token {
    public sub: string;
    public exp: number;
}