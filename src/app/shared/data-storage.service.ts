// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { RecipeService } from '../recipes/recipe.service';
// import { Recipe } from '../recipes/recipe.model';
// import {map , tap, take, exhaustMap} from 'rxjs/operators';
// import { authService } from '../auth/auth.service';
// import { Store } from '@ngrx/store';
// import * as fromStoreApp from '../store/app.reducer'
// import * as RecipeAction from '../recipes/store/recipe.action';

// @Injectable()
// export class dataStorageService
// {
//     constructor(private http:HttpClient , private recipeService:RecipeService , private authService:authService ,private store:Store<fromStoreApp.AppState>)
//     {

//     }
//     storeRecipe()
//     {
//         const recipes=this.recipeService.getRecipe();
//         console.log(recipes);
//         this.http.put('https://ng-recipe-3bb8e.firebaseio.com/recipes.json',recipes).subscribe((respone)=>
//             {
//                 console.log(respone);
//             }
//         );
//     }
//     fetchRecipe()
//     {
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
       

//     }
        
        
// }

