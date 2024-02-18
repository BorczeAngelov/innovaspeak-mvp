import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { SharedImportedMatModule } from '../../shared-imported-mat.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedImportedMatModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }
}
