import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL ='https://localhost:7253/Auth/';

  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'login', userData);
  }

  createAccount(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'register', newUser);
  }
}
