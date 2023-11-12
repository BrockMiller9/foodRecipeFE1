import { Component } from '@angular/core';
import { RecipeService } from '../services/Recipe.service';
import { RecipeSearchResultDTO } from '../models/RecipeSearchResultDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {
  searchResults: any[] = []; // Will hold the recipes to display
  categorySelected: string = 'dashboard'; // Default category

  constructor(private recipeService: RecipeService, private router: Router) {}

  loadRandomRecipes(category: string): void {
    this.categorySelected = category;
    this.recipeService.getRandomRecipes(category, 12).subscribe((recipes) => {
      
      this.searchResults = recipes;
      console.log(this.searchResults);
    });
  }

  selectCategory(value: string) {
    this.loadRandomRecipes(value);
  }

  viewRecipe(recipe: RecipeSearchResultDTO): void {
    this.router.navigate(['/recipe-detail', recipe.id]);
  }
}
