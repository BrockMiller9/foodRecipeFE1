import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '#' },
    { name: 'Company', href: '#' },
  ];
  
  mobileMenuOpen = false;
  

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
