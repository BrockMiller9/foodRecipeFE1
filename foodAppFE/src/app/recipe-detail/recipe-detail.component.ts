import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeDetailDto } from '../models/RecipeDetailDto';
import { RecipeService } from '../services/Recipe.service';
import { RecipeDto } from '../models/RecipeDto';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail$!: Observable<RecipeDetailDto>;
  recipeId!: number;
  isFavorite: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    // Get the recipe ID from the route parameters
    this.route.params.subscribe(params => {
      this.recipeId = +params['id']; // The plus sign is a JS shortcut for converting a string to a number
      this.fetchRecipeDetail();
      this.checkIfRecipeIsFavorite();
    });
  }

  checkIfRecipeIsFavorite(): void {
    this.favoriteService.checkIfFavorite(this.recipeId).subscribe(isFavorite => {
      this.isFavorite = isFavorite;
    }, error => {
      console.error('Error checking if recipe is favorite:', error);
    });
  }


  fetchRecipeDetail(): void {
    this.recipeDetail$ = this.recipeService.getRecipeInformation(this.recipeId);
  }

  getImageUrl(imageName: string): string {
    const size = '100x100'; // or '250x250' or '500x500' depending on your need
    return `https://spoonacular.com/cdn/ingredients_${size}/${imageName}`;
  }
  
  // addToFavorites(recipe: any): void {
  //   this.toggleFavorite(); // Toggle the favorite status
  //   // Prepare the data to be sent to the backend
  //   const recipeData = {
  //     id: recipe.id, // Use the ID from Spoonacular API
  //     title: recipe.title,
  //     image: recipe.image,
  //     servings: recipe.servings,
  //     readyInMinutes: recipe.readyInMinutes,
  //     sourceUrl: recipe.sourceUrl,
  //     spoonacularSourceUrl: recipe.spoonacularSourceUrl,
  //     // Add any other details you want to send to the backend
  //   };
  //   this.favoriteService.addToFavorites(recipeData).subscribe({
  //     next: (response) => {
  //       console.log('Recipe added to favorites:', response);
  //       // Handle successful addition
  //     },
  //     error: (error) => {
  //       console.error('Error adding recipe to favorites:', error);
  //       // Handle errors
  //     }
  //   });
  // }
  // toggleFavorite(): void {
  //   this.isFavorite = !this.isFavorite; // Toggle favorite status
  // }
  
  toggleFavorite(recipe: any): void {
    // Optimistically update the UI
    this.isFavorite = !this.isFavorite;
  
    // Prepare the data to be sent to the backend
    const recipeData = {
      id: recipe.id, // Use the ID from Spoonacular API
      title: recipe.title,
      image: recipe.image,
      servings: recipe.servings,
      readyInMinutes: recipe.readyInMinutes,
      sourceUrl: recipe.sourceUrl,
      spoonacularSourceUrl: recipe.spoonacularSourceUrl,
      // Add any other details you want to send to the backend
    };
  
    const operation = this.isFavorite
      ? this.favoriteService.addToFavorites(recipeData)
      : this.favoriteService.removeFromFavorites(recipe.id);
  
    operation.subscribe({
      next: (response) => {
        console.log('Favorite status changed:', response);
        // Handle successful addition or removal
      },
      error: (error) => {
        // Revert the optimistic update in case of an error
        this.isFavorite = !this.isFavorite;
        console.error('Error changing favorite status:', error);
        // Handle errors
      }
    });
  }
  

}
