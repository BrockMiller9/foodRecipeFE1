export interface ExtendedIngredient {
    aisle: string;
    amount: number;
    consistency: string;
    id: number;
    image: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    measures: Measures;
    // Add any other properties that are needed from your backend DTO
  }


export interface RecipeDetailDto {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    sourceUrl: string;
    spoonacularSourceUrl: string;
    healthScore: number;
    pricePerServing: number;
    dairyFree: boolean;
    glutenFree: boolean;
    ketogenic: boolean;
    vegan: boolean;
    vegetarian: boolean;
    extendedIngredients: ExtendedIngredient[];
    summary: string;
}

export interface Measures {
    amount: number;
    unitShort: string;
    unitLong: string;
}