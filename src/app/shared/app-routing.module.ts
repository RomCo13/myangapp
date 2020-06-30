import { NgModule } from '@angular/core';
import{ Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes:Routes=[
    {path:'',redirectTo:'/recipe' ,pathMatch:'full'},
    {path: 'recipe' ,loadChildren: ()=>import('../recipes/recipes.module').then(module=>module.RecipeModule)},
    {path: 'shoping-list',loadChildren:()=>import('../shoping-list/shoping-list.module').then(module=>module.shopinglistModule)},
    {path: 'auth',loadChildren:()=>import('../auth/auth.module').then(module=>module.AuthModule)},

];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
})

export class AppRoutingModule{

}