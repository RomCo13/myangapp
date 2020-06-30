import {Action} from'@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model';
 
export const Add_Ingredient= 'Add_Ingredient';
export const Add_Ingredients='Add_Ingredients';
export const Update_Ingredient= 'Update_Ingredient';
export const Delete_Ingredient= 'Delete_Ingredient';
export const Start_Edit='Start_Edit';
export const Stop_Edit='Stop_Edit';


 export class AddIngredient implements Action{
    readonly type = Add_Ingredient;

    constructor(public payload:Ingredient){}
 }
 export class AddIngredients implements Action{
     readonly type= Add_Ingredients;

     constructor (public payload : Ingredient[]){}
 }
 export class UpdateIngredient implements Action{
     readonly type= Update_Ingredient;

     constructor(public payload:{newIngr:Ingredient}){}
 }
 export class DeleteIngredient implements Action{
     readonly type =Delete_Ingredient;
    

 }
 export class StartEdit implements Action{
     readonly type=Start_Edit
     constructor(public payload:number){}
 }

 export class StopEdit implements Action{
    readonly type=Stop_Edit

 }
