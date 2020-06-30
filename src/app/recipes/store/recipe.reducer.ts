import { Recipe } from '../recipe.model';
import * as RecipeAction from '../store/recipe.action'
import { stat } from 'fs';
import { act } from '@ngrx/effects';


export interface State{
    recipes:Recipe[];
}
const initialState={
    recipes: []
};
export function recipeReducer(state=initialState,action:RecipeAction.RecipeAction){

    switch(action.type)
    {
        case RecipeAction.Set_Recipes:
            {
                console.log('reducer')
                return {...state,recipes:[...action.payload]};
            }
        case RecipeAction.Add_Recipe:
            {
                const newRecipe= new Recipe(action.payload.name,action.payload.description,action.payload.imagePath,action.payload.ingredients);
                return{...state,recipes:[...state.recipes,newRecipe]};
            }
        case RecipeAction.Update_Recipe:
            {
                const recipesArr= state.recipes;
                recipesArr[action.payload.index]=action.payload.newRecipe;
                return{...state,reicpes:recipesArr};
            }
        case RecipeAction.Delete_Recipe:
            {
                const recipeArr=state.recipes;
                recipeArr.splice(action.payload.index,1);
                return{...state,reicpes:recipeArr};
            }
        default:
            return state;
    }
}