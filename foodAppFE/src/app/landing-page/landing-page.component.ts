import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  username: string = '';
  password: string = '';

  newUsername: string = '';
  email: string = '';
  newPassword: string = '';
  showCreateAccount: boolean = false;

  isLoading: boolean = false;
  serverErrors: any[] = [];

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }


  onLogin(): void {
    this.isLoading = true;
    const userData = {
      username: this.username,
      password: this.password
    };

    console.log(userData);
  this.authService.login(userData).subscribe(
    (response) => {
      this.isLoading = false;
      console.log(response);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    },
    (error) => {
      this.isLoading = false;
      console.log(error);
      switch (error.status) {
        case 401:
          this.snackBar.open('Invalid credentials. Please try again.', 'Close');
          break;
        case 500:
          this.snackBar.open('Server error. Please try again later.', 'Close');
          break;
        case 429:
          this.snackBar.open('Too many attempts. Please wait and try again later.', 'Close');
          break;
        default:
          this.snackBar.open('An unexpected error occurred. Please try again.', 'Close');
      }
    }
  );
  }

  onCreateAccount(): void {
    this.isLoading = true;
    this.serverErrors = []; // Clear previous errors
    const newUser = {
      username: this.newUsername,
      email: this.email,
      password: this.newPassword
    };
  
    this.authService.createAccount(newUser).subscribe(
      (response) => {
        this.isLoading = false;
        if (response && response.token) {
          this.authService.setUser(response); // Update the current user and token
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.isLoading = false;
        // Check if the error is a simple string
        if (typeof error.error === 'string') {
          this.serverErrors.push(error.error);
        } else if (error.error && error.error.errors) {
          // If it's the object with 'errors', process as before
          this.serverErrors = Object.values(error.error.errors).flat();
        } else {
          // Fallback error message
          this.snackBar.open('Account creation failed. Please try again.', 'Close');
        }
        console.error('Registration error:', error);
      }
    );
  }
  

signInWithTestAccount(): void {
  this.username = 'testUser';
  this.password = 'test123456';
  this.onLogin();}
}
