import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../oauth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserInfoService {
  private readonly endpointUrl = `https://europe-west6-tactical-works-412206.cloudfunctions.net/innovaspeak-mvp-proxy-currentuserinfo`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public async getAndLogCurrentUserInfo() {
    try {
      console.log('CurrentUserInfoService: Requesting Data for current user');
      const response = await firstValueFrom(this.getCurrentUserInfo());
      console.log('CurrentUserInfoService: Response Data:', response);
    } catch (error) {
      console.error('CurrentUserInfoService: Error occurred:', error);
    }
  }

  public getCurrentUserInfo() {
    const token = this.authService.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });    

    return this.http.get(this.endpointUrl, { headers });
  }
}
