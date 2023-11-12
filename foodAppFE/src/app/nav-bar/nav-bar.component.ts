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
  ];
  
  userName: string = '';
  mobileMenuOpen = false;
  searchQuery: string = '';

  isLoggedIn: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userName = user ? user.username : 'Guest'; // Use 'Guest' or any other default name
      console.log(this.userName);
    });
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
    this.isLoggedIn = false; // Update the state
  }
  onSearch(): void {
    if (this.searchQuery) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

}
