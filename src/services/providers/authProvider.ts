import { IDateHelper } from "_services/helpers/dateHelper";
import { ILocalStorageRepository } from "_services/repositories/localStorageRepository";

import { inject, injectable } from "inversify-props";

export interface IAuthProvider {
  checkAuth(username: string): boolean;
  checkToken(): boolean;
  clearToken(): void;
}

@injectable()
export class AuthProvider implements IAuthProvider {
  private allowedUsers: string[] = ['calid', 'mattias'];
  @inject() private localStorageRepository: ILocalStorageRepository;
  @inject() private dateHelper: IDateHelper;

  public checkAuth(username: string): boolean {

    if (this.allowedUsers.includes(username)) {
      const token = {
        user: username,
        expire: this.dateHelper.addDays(new Date(), 7)
      };

      this.localStorageRepository.write('token', token);
      return true;
    }

    return false;
  }

  public checkToken(): boolean {
    const token = this.localStorageRepository.read<any>('token');

    if (token && new Date(token.expire) > new Date()) {
      return true;
    }

    return false;
  }

  public clearToken(): void {
    this.localStorageRepository.clear('token');
  }
}