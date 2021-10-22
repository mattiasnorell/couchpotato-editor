import { IDateHelper } from '_services/helpers/dateHelper';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { inject, injectable } from 'inversify-props';
import axios from 'axios';

export interface IAuthProvider {
    checkAuth(username: string, password: string): Promise<boolean>;
    checkToken(): boolean;
    clearToken(): void;
}

export class Token {
    public token: string;
    public id: string;
    public email: string;
    public authorities: string;
}
@injectable()
export class AuthProvider implements IAuthProvider {
    private apiBasePath: string = 'http://couchpotato.automagiskdatabehandling.se.185-133-206-111.preview.beeweb.se/api';

    @inject() private localStorageHelper: ILocalStorageHelper;
    @inject() private dateHelper: IDateHelper;

    public async checkAuth(username: string, password: string): Promise<boolean> {
        const result = await axios.post(
            `${this.apiBasePath}/auth/authenticate`,
            {
                username: username,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (result.status !== 200) {
            this.localStorageHelper.clear('token');
            return false;
        }

        this.localStorageHelper.write('token', result.data.token);

        return true;
    }

    public getToken(): string | null {
        const token = this.localStorageHelper.read<Token>('token');

        return token ? token.token : null;
    }

    public checkToken(): boolean {
        const token = this.localStorageHelper.read<Token>('token');

        /*if (token && new Date(token.expire) > new Date()) {
            return true;
        }*/

        return !!token;
    }

    public clearToken(): void {
        this.localStorageHelper.clear('token');
    }
}
