import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../models/RecipeDto';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { RecipeSearchResultDTO } from '../models/RecipeSearchResultDTO';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userFavorites: RecipeDto[] = [];
  isLoading: boolean = true;
  searchResults: RecipeSearchResultDTO[] | null = null;

  constructor(private favoritesService: FavoritesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserFavorites();
  }

  fetchUserFavorites(): void {
    this.favoritesService.getUserFavorites().subscribe({
      next: (favorites) => {
        this.userFavorites = favorites;
        this.isLoading = false;
        console.log('User favorites:', this.userFavorites);
      },
      error: (error) => {
        console.error('Error retrieving user favorites:', error);
        this.isLoading = false;
      }
    });
  }

  viewRecipe(recipe: RecipeDto): void {
    console.log('Viewing recipe:', recipe.id);
    this.router.navigate(['/recipe-detail', recipe.spoonacularId]);
  }
}