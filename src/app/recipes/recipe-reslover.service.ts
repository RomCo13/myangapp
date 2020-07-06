import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as formStoreApp from '../store/app.reducer'
import * as RecipeAction from '../recipes/store/recipe.action'
import { Actions ,ofType } from '@ngrx/effects'
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class resolverService implements Resolve<Recipe[]>{

constructor(private store : Store<formStoreApp.AppState> , private actions : Actions){}

resolve()
  {
    return this.store.select('recpies').pipe(
      take(1),
      map(state =>
        {
            return state.recipes;
        }),
        switchMap(recipes =>
            {
                if(recipes.length === 0)
                {
                    this.store.dispatch(new RecipeAction.FetchRecipes());
                    return this.actions.pipe(ofType(RecipeAction.SET_RECIPE),take(1));
                }
                else
                {
                  return of(recipes);
                }
            }));
  }
}
