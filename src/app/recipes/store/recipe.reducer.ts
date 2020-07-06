import { Recipe } from '../recipe.model';
import * as RecipeAction from '../store/recipe.action'



export interface State{
    recipes:Recipe[];
}
const initialState ={
    recipes : []
};
export function recipeReducer(state = initialState , action : RecipeAction.RecipeAction){

    switch(action.type)
    {
        case RecipeAction.SET_RECIPE:
            {
                return {...state,
                  recipes:[...action.payload]};
            }
        case RecipeAction.ADD_RECIPE:
            {
                const newRecipe = new Recipe(action.payload.name,
                                             action.payload.description,
                                             action.payload.imagePath,
                                             action.payload.ingredients);

                return{...state,
                  recipes : [...state.recipes , newRecipe]};
            }
        case RecipeAction.UPDATE_RECIPE:
            {
                const updated = {...state.recipes[action.payload.index],
                                 ...action.payload.newRecipe};
                const updatedRecipes = [...state.recipes];
                updatedRecipes[action.payload.index] = updated;

                return {...state,
                           recipes:updatedRecipes};
            }
        case RecipeAction.DELETE_RECIPE:
            {
                const newArr = state.recipes.filter((recipe,index) =>
                {
                    return index !== action.payload.index;
                });
                return{...state,
                          recipes:newArr}
            }
        default:
            return state;
    }
}
