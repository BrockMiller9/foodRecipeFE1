import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeDto } from 'src/app/models/RecipeDto';
import { RecipeService } from 'src/app/services/Recipe.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery = '';
  isLoading = false;
  searchResults: RecipeDto[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.recipeService.findByIngredients(this.searchQuery, 12).subscribe(
        (recipes) => {
          this.searchResults = recipes;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching recipes:', error);
          this.isLoading = false;
        }
      );
    }
  }

  viewRecipe(recipe: RecipeDto): void {
    this.recipeService.getRecipeInformation(recipe.id).subscribe(recipeInfo => {
      // Navigate to the recipe detail component with the retrieved information
      // You may choose to use a service to pass the data or navigate with query parameters
      // For example, using Angular Router to navigate:
      this.router.navigate(['/recipe-detail', recipe.id]);
    });
  }
}
