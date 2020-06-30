import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
// import { ShopingListService } from '../shoping-list/shopinglist.service';
import { Store } from '@ngrx/store';
import * as shopinglistActions from '../shoping-list/store/shoping-list.actions'
import * as fromStoreApp from '../store/app.reducer'

@Injectable()
export class RecipeService
{
  constructor(
              private store:Store<fromStoreApp.AppState>
    ){}
    recipeChange= new Subject<Recipe[]>();
    private recipes:Recipe[] = [];
  
      getRecipe()
      {
        return this.recipes.slice();
      }
      getRecipeById(id:number)
      {
          return this.recipes[id];
      }
      addRecipe(recipe:Recipe)
      {
        this.recipes.push(recipe);
        this.recipeChange.next(this.recipes.slice());
        console.log(this.recipes);
      }
      updateRecipe(index:number,recipe:Recipe)
      {
        this.recipes[index]=recipe;
        this.recipeChange.next(this.recipes.slice());
      } 
      deleteRecipe(recipe:Recipe)
      {
        let index= this.recipes.indexOf(recipe);
        this.recipes.splice(index,1);
        this.recipeChange.next(this.recipes.slice());
      }
      setRecieps(recipes:Recipe[])
      {
        this.recipes=recipes;
        this.recipeChange.next(this.recipes.slice());
      }
      addIngredientsToShopingList(ingredients:Ingredient[])
      {
        // this.shopingListService.addIngredints(ingredients)
        this.store.dispatch(new shopinglistActions.AddIngredients(ingredients))
      }
}