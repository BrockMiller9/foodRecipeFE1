import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isLoggedIn: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
    this.isLoggedIn = false; // Update the state
  }

}
