import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeDetailDto } from '../models/RecipeDetailDto';
import { RecipeService } from '../services/Recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail$!: Observable<RecipeDetailDto>;
  recipeId!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the recipe ID from the route parameters
    this.route.params.subscribe(params => {
      this.recipeId = +params['id']; // The plus sign is a JS shortcut for converting a string to a number
      this.fetchRecipeDetail();
    });
  }

  fetchRecipeDetail(): void {
    this.recipeDetail$ = this.recipeService.getRecipeInformation(this.recipeId);
  }

  getImageUrl(imageName: string): string {
    const size = '100x100'; // or '250x250' or '500x500' depending on your need
    return `https://spoonacular.com/cdn/ingredients_${size}/${imageName}`;
  }
  
}
