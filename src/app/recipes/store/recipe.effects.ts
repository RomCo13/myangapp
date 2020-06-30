import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesAction from './recipe.action'
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromStoreApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    constructor(private actions:Actions,private http:HttpClient,private store:Store<fromStoreApp.AppState>){}

    //         return this.store.select('auth').pipe(take(1),map(authState=>{return authState.user}),exhaustMap(user=>
//             {
//                 return this.http.get<Recipe[]>('https://ng-recipe-3bb8e.firebaseio.com/recipes.json');

//             }),map(recipes=>
//                 {
//                     return recipes.map(recipe=>
//                         {
//                             console.log(recipe);
//                             return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]}
//                         });
//                 }),
//                 tap(recipes=>
//                     {
//                         // this.recipeService.setRecieps(recipes);
//                         this.store.dispatch(new RecipeAction.SetRecipes(recipes));
//                     }));
            
//         ;
    @Effect()
    fecthRecipes =this.actions.pipe(ofType(RecipesAction.Fecth_Recipes),
        switchMap(()=>{
            return this.http.get<Recipe[]>('https://recipes-68286.firebaseio.com/recipes.json');

            // let recipeArr:Recipe[]
            // let recipess =  this.http.get<Recipe[]>('https://ng-recipe-3bb8e.firebaseio.com/recipes.json').pipe(map((responeData)=>
            // {
            //     recipeArr = responeData.slice();
            // }))
            // console.log(recipess);
            // return recipeArr;
        }),map(recipes=>
            {
                console.log('map')
                console.log(recipes)
                return recipes.map(recipe=>
                    {
                        return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]}
                    });
            }),map(recipes=>
                {
                    return new RecipesAction.SetRecipes(recipes);
                }));
    
    @Effect({dispatch:false})
    StoreRecipes = this.actions.pipe(ofType(RecipesAction.Store_Recipe),
    withLatestFrom(this.store.select('recpies')),
    switchMap(([actionData,recipeState])=>
    {
        return this.http.put('https://ng-recipe-3bb8e.firebaseio.com/recipes.json',recipeState.recipes);
    
    })
    )
            
    
}