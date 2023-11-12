export interface RecipeDto {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    sourceUrl: string;
    SpoonacularSourceUrl: string;
    spoonacularId : number;
    // ... any other properties you expect from the response
  }
  