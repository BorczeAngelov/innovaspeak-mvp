import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../oauth/auth.service';
import { CURRENT_USER_INFO_PROXY_ENDPOINT_URL } from './PublicConfigValues';
import { CurrentUserInfo } from './CurrentUserInfo';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserInfoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public async getCurrentUserInfo() : Promise<CurrentUserInfo | null> {
    try {
      const cachedUser = this.getUserInfoFromCache();
      if (cachedUser) {
        return cachedUser;
      }

      console.log('CurrentUserInfoService: Requesting Data for current user');
      const response = await this.getCurrentUserFromProxy();
      console.log('CurrentUserInfoService: Response Data:', response);

      sessionStorage.setItem('currentUser', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('CurrentUserInfoService: Error occurred:', error);
      return null;
    }
  }

  private getUserInfoFromCache(): any {
    const cachedUser = sessionStorage.getItem('currentUser');
    if (cachedUser) {
      console.log('CurrentUserInfoService: Returning cached user info', cachedUser);
      return JSON.parse(cachedUser);
    }
    return null;
  }

  private async getCurrentUserFromProxy(): Promise<any> {
    const token = this.authService.getAccessToken();
    if (!token) {
      console.error('No access token available');
      throw new Error('No access token available');
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return await firstValueFrom(this.http.get(CURRENT_USER_INFO_PROXY_ENDPOINT_URL, { headers }));
  }
}
