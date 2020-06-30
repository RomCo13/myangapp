import * as fromShopingList from '../shoping-list/store/shoping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer'
import * as fromRecipes from '../recipes/store/recipe.reducer'
import {  ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shopingList:fromShopingList.State;
    auth:fromAuth.State
    recpies:fromRecipes.State;

}

export const appReducer: ActionReducerMap<AppState> ={
    shopingList:fromShopingList.shopinglistReducer,
    auth:fromAuth.authReducer,
    recpies:fromRecipes.recipeReducer,
}