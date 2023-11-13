import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  user$ = this.currentUserSubject.asObservable(); // This will allow components to subscribe to user changes
  private authStatusListener = new BehaviorSubject<boolean>(this.hasToken());

  //private apiURL ='https://localhost:7253/Auth/';
  //private apiURL ='http://localhost:5113/Auth/';
  private apiURL ='https://foodservicebackend.onrender.com/Auth/';

  constructor(private http: HttpClient) { 
    this.loadUserFromLocalStorage(); // Call this function when the service is initialized

  }

  ngOnInit() {
    this.loadUserFromLocalStorage(); // Call this function when the service is initialized
  }
  
  private loadUserFromLocalStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
    }
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}login`, userData).pipe(
      tap(response => {
        if (response && response.token) {
          this.setUser(response); // Set user data with the response received
          localStorage.setItem('token', response.token);
          this.authStatusListener.next(true);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public setUser(response: any) {
    // Assuming the response contains the user data and token
    const user = { username: response.username, token: response.token };
    localStorage.setItem('currentUser', JSON.stringify(user)); // Save the user info in localStorage
    this.currentUserSubject.next(user); // Update the current user BehaviorSubject
  }

  clearUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.authStatusListener.next(false);
  }

  
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  createAccount(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'register', newUser);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  logout(): void {
    this.clearUser(); // Clear the current user information
  }

  public isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
  
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<any>(`${this.apiURL}verify-token`, { headers }).pipe(
      map(response => {
        // Check the isValid property in the response
        this.authStatusListener.next(true);
        return response.isValid; // Or response["isValid"] if you prefer
      }),
      catchError(error => {
        // Handle HTTP errors
        console.error(error);
        return of(false);
      })
    );
  }
  
  

}
