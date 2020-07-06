import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesAction from './recipe.action'
import { switchMap, map, withLatestFrom,  catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromStoreApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';


@Injectable()
export class RecipeEffects {
    constructor(private actions : Actions , private http : HttpClient , private store : Store<fromStoreApp.AppState>){}

    firebaseAdd = 'https://angularfirebase-3864d.firebaseio.com/recipes.json';

    @Effect()
    fecthRecipes = this.actions.pipe(
        ofType(RecipesAction.FETCH_RECIPE),
        switchMap(() =>{
          return  this.http.get<Recipe[]>(
                  this.firebaseAdd
                    );
        }),
        map(recipes =>
            {
                return recipes.map(recipe =>
                    {
                        return {...recipe,
                          ingredients : recipe.ingredients ? recipe.ingredients : []}
                    })
            }),
        map(recipes =>
                {
                    return new RecipesAction.SetRecipes(recipes);
                })
            );

    @Effect({dispatch:false})
    StoreRecipes = this.actions.pipe(
        ofType(RecipesAction.STORE_RECIPE),
        withLatestFrom(this.store.select('recpies')),
        switchMap(([actionData , recipeState]) =>
        {
            return this.http.put(this.firebaseAdd , recipeState.recipes , {});
        }),
        catchError( (e) => {
            console.log(e)
        return EMPTY;
        })
    )
}
