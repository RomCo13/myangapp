import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { resolverService } from './recipe-reslover.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedModule } from '../shared/shared.module';

const routes:Routes=[
    {path:'',component:RecipesComponent,canActivate:[authGuard] ,children :[
        {path:'',component:RecipesStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipesDetailComponent,resolve :[resolverService]},
        {path:':id/edit',component:RecipeEditComponent ,resolve :[resolverService]},
    ]},
]
@NgModule({
    declarations:[
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipeItemComponent,
    RecipesStartComponent,
    RecipeEditComponent,
    ],
    imports:[
        RouterModule.forChild(routes),
        sharedModule,
        ReactiveFormsModule,
    ],
    exports:[
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipeItemComponent,
        RecipesStartComponent,
        RecipeEditComponent,
        RouterModule
    ],
})
export class RecipeModule
{

}