import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const Set_Recipes='Set_Recipe';
export const Fecth_Recipes='Fecth_Recipes';
export const Add_Recipe='Add_Recipe';
export const Update_Recipe='Update_Recipe';
export const Delete_Recipe='Delete_Recipe';
export const Store_Recipe='Store_Recipe';


export class FetchRecipes implements Action{
    readonly type = Fecth_Recipes;
}
export class StoreRecipe implements Action{
    readonly type =Store_Recipe;

}
export class SetRecipes implements Action{
    readonly type = Set_Recipes;

    constructor ( public payload:Recipe[]){}
}
export class AddRecipe implements Action{
    readonly type = Add_Recipe;

    constructor (public payload:Recipe){}
}
export class UpdateRecipe implements Action{
    readonly type = Update_Recipe;

    constructor (public payload:{index:number,newRecipe:Recipe}){}
}
export class DeleteRecipe implements Action{
    readonly type = Delete_Recipe;

    constructor (public payload:{index:number}){}
}
export type RecipeAction = SetRecipes|FetchRecipes|AddRecipe|UpdateRecipe|DeleteRecipe|StoreRecipe