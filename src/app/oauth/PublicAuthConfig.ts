import { AuthConfig } from 'angular-oauth2-oidc';

export const BASE_URL = "https://innovaspeak.memberful.com";
const REDIRECT_URI = 'https://borczeangelov.github.io/innovaspeak-mvp/oauth-callback';
const CLIENT_ID = 'QRe9xcjVoerbNiuhQWxhM2H7';

export const PublicAuthConfig: AuthConfig = {
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    responseType: 'code',
    loginUrl: `${BASE_URL}/oauth`,
    tokenEndpoint: `${BASE_URL}/oauth/token`,

    useSilentRefresh: true, 
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html', // TODO: Adjust if necessary
    
    oidc: false, // Important: Disable OIDC since Memberful does not use OpenID Connect    
    scope: '', // Memberful does not use scopes

    showDebugInformation: false, // Helpful for debugging, disable in production
};