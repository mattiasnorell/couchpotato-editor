import { $dateHelper } from "_services/helpers/dateHelper";
import { $localStorageRepository } from "_services/repositories/localStorageRepository";

class AuthProvider {
  private allowedUsers: string[] = ['calid', 'mattias'];

  public checkAuth(username: string): boolean {
    
    if(this.allowedUsers.includes(username)){
      const token = {
        user: username,
        expire: $dateHelper.addDays(new Date(), 7)
      };

      $localStorageRepository.write('token', token);
      return true;
    }

    return false;
  }

  public checkToken(): boolean{
    const token = $localStorageRepository.read<any>('token');
    
    if(token && new Date(token.expire) > new Date()){
      return true;
    }

    return false;
  }

  public clearToken(): void{
    $localStorageRepository.clear('token');
  }
}

const $authProvider = new AuthProvider();
export { $authProvider };
