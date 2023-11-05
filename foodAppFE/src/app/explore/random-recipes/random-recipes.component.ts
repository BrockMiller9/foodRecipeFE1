import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecipeDto } from 'src/app/models/RecipeDto';
import { RecipeService } from 'src/app/services/Recipe.service';

@Component({
  selector: 'app-random-recipes',
  templateUrl: './random-recipes.component.html',
  styleUrls: ['./random-recipes.component.css']
})
export class RandomRecipesComponent {
  randomRecipes: RecipeDto[] = [];
  @ViewChild('carousel') private carousel!: ElementRef;


  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRandomRecipes();
  }


  loadRandomRecipes(): void {
    this.recipeService.getRandomRecipes('american', 10).subscribe((recipes) => {
      console.log(recipes);
      this.randomRecipes = recipes;
    });
  }


  viewRecipe(recipe: RecipeDto): void {
    console.log(recipe);
  }

}
