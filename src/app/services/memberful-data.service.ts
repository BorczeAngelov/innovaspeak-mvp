import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../oauth/auth.service';
import { BASE_URL } from '../oauth/PublicAuthConfig';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberfulDataService {
  private readonly endpointUrl = `${BASE_URL}/api/graphql/member`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public async getAndLogCurrentMemberData() {
    try {
      console.log('MemberfulDataService: Requesting Data for current user');
      const response = await firstValueFrom(this.getCurrentMemberData());
      console.log('MemberfulDataService: Response Data:', response);
    } catch (error) {
      console.error('MemberfulDataService: Error occurred:', error);
    }
  }

  public getCurrentMemberData() {
    const token = this.authService.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    const query = this.GetCurrentUserDataGraphQLQuery();

    return this.http.get(`${this.endpointUrl}?query=${query}`, { headers });
  }

  private GetCurrentUserDataGraphQLQuery() {
    return encodeURIComponent(`
    {
      currentMember {
        email
        fullName
        id
        subscriptions {
          active
          expiresAt
          plan {
            id
            name
          }
        }
        unrestrictedAccess
      }
    }`);
  }
}
