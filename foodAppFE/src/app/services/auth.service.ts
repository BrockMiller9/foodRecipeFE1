import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiURL ='https://localhost:7253/Auth/';
  private apiURL ='http://localhost:5113/Auth/';

  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'login', userData);
  }

  createAccount(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'register', newUser);
  }
  private authStatusListener = new BehaviorSubject<boolean>(this.hasToken());

  // ... other methods ...

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  logout(): void {
    localStorage.removeItem('token');
    // If you have any other cleanup to do, do it here
    // For example, clear any stored user data, etc.
    this.authStatusListener.next(false);
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
        console.log(response);
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
