import { Component, OnInit } from '@angular/core';
import { RecipeSearchResultDTO } from '../models/RecipeSearchResultDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/Recipe.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults: RecipeSearchResultDTO[] | null = null;
  searchQuery!: string;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      if (this.searchQuery) {
        this.recipeService.searchRecipes(this.searchQuery).subscribe(
          results => {
            this.searchResults = results;
          },
          error => {
            console.error('Search error:', error);
          }
        );
      }
    });
  }
  
  viewRecipe(recipe: RecipeSearchResultDTO): void {
    this.router.navigate(['/recipe-detail', recipe.id]);
  }
  
}
