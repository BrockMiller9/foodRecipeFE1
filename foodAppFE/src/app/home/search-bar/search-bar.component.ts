import { Component } from '@angular/core';
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

  constructor(private recipeService: RecipeService) {}

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
    console.log('Viewing recipe:', recipe);
  }
}
