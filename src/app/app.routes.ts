import { Routes } from '@angular/router';
import { OAuthCallbackComponent } from './oauth/oauth-callback.component';
import { LoginComponent } from './oauth/login/login.component';
import { AuthGuardFn } from './oauth/AuthGuard';
import { VoiceChatInterfaceComponent } from './voice-chat-interface/voice-chat-interface.component';

export const routes: Routes = [    
    { path: '', redirectTo: '/voice-chat', pathMatch: 'full' },
    { path: 'voice-chat', component: VoiceChatInterfaceComponent, canActivate: [AuthGuardFn] },
    // The login and callback route don't need protection
    { path: 'login', component: LoginComponent },
    { path: 'oauth-callback', component: OAuthCallbackComponent },
];
