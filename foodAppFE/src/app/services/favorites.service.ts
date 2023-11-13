import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  //private apiURL = 'http://localhost:5113/api/Favorites/';
  private apiURL = 'https://foodservicebackend.onrender.com/api/Favorites/';
  
  constructor(private http: HttpClient) {}

  addToFavorites(recipeData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
return this.http.post(`${this.apiURL}add-to-favorites`, recipeData, { headers: headers });
  }

  removeFromFavorites(recipeId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
return this.http.delete(`${this.apiURL}${recipeId}`, { headers: headers });
  }

  checkIfFavorite(recipeId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
return this.http.get<boolean>(`${this.apiURL}is-favorite/${recipeId}`, { headers: headers });
  }

  getUserFavorites(): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
return this.http.get<any>(`${this.apiURL}`, { headers: headers });

  }

}
