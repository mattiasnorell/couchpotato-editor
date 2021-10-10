import { IDateHelper } from "_services/helpers/dateHelper";
import { ILocalStorageHelper } from "_services/helpers/localStorageHelper";
import { inject, injectable } from "inversify-props";

export interface IAuthProvider {
  checkAuth(username: string): boolean;
  checkToken(): boolean;
  clearToken(): void;
}

@injectable()
export class AuthProvider implements IAuthProvider {
  private allowedUsers: string[] = ['calid', 'mattias'];
  @inject() private localStorageHelper: ILocalStorageHelper;
  @inject() private dateHelper: IDateHelper;

  public checkAuth(username: string): boolean {

    if (this.allowedUsers.includes(username)) {
      const token = {
        user: username,
        expire: this.dateHelper.addDays(new Date(), 7)
      };

      this.localStorageHelper.write('token', token);
      return true;
    }

    return false;
  }

  public checkToken(): boolean {
    const token = this.localStorageHelper.read<any>('token');

    if (token && new Date(token.expire) > new Date()) {
      return true;
    }

    return false;
  }

  public clearToken(): void {
    this.localStorageHelper.clear('token');
  }
}