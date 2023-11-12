import { RecipeSearchResultDTO } from "./RecipeSearchResultDTO";

export interface RecipeSearchResultsDTO {
    offset: number;
    number: number;
    results: RecipeSearchResultDTO[];
    
}