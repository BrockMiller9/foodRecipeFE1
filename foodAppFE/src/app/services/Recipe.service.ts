import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RecipeDto } from "../models/RecipeDto";

@Injectable({
    providedIn: 'root'
  })
  export class RecipeService {
    private apiURL = 'https://localhost:7253/api/SpoonTacularAPI/';
  
    constructor(private http: HttpClient) {}
  
    getRandomRecipes(tags: string, number: number): Observable<RecipeDto[]> {
        console.log(this.http.get<RecipeDto[]>(`${this.apiURL}random`, { params: { tags, number } }));
      return this.http.get<RecipeDto[]>(`${this.apiURL}random`, { params: { tags, number } });
    }

    findByIngredients(ingredients: string, number: number): Observable<RecipeDto[]> {
      // Construct the query parameters
      const params = { ingredients, number: number.toString(), ranking: '1', ignorePantry: 'true' };
      console.log(`${this.apiURL}findByIngredients`, { params }+ '&number=2');
      return this.http.get<RecipeDto[]>(`${this.apiURL}findByIngredients`, { params });
    }
  }
  