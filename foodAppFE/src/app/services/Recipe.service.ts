import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { RecipeDto } from "../models/RecipeDto";
import { RecipeDetailDto } from "../models/RecipeDetailDto";
import { RecipeSearchResultsDTO } from "../models/RecipeSearchResulstDTO";
import { RecipeSearchResultDTO } from "../models/RecipeSearchResultDTO";

@Injectable({
    providedIn: 'root'
  })
  export class RecipeService {
    //private apiURL = 'https://localhost:7253/api/SpoonTacularAPI/';
    //private apiURL = 'http://localhost:5113/api/SpoonTacularAPI/';
    private apiURL = 'https://foodservicebackend.onrender.com/api/SpoonTacularAPI/';
  
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
    getRecipeInformation(id: number, includeNutrition: boolean = false): Observable<RecipeDetailDto> {
      return this.http.get<RecipeDetailDto>(`${this.apiURL}${id}`, {
        params: new HttpParams().set('includeNutrition', String(includeNutrition))
      });
    }
    searchRecipes(query: string, number: number = 12): Observable<RecipeSearchResultDTO[]> {
      return this.http.get<RecipeSearchResultDTO[]>(`${this.apiURL}search`, {
        params: new HttpParams()
          .set('query', query)
          .set('number', number.toString())
      });
    }
    
    
  }
  