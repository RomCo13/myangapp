import { NgModule } from '@angular/core';
// import { ShopingListService } from './shoping-list/shopinglist.service';
import { RecipeService } from './recipes/recipe.service';
// import { dataStorageService } from './shared/data-storage.service';
import { resolverService } from './recipes/recipe-reslover.service';
import { authGuard } from './auth/auth.guard';
import { authService } from './auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  providers: [RecipeService,resolverService,authGuard,authService,{provide:HTTP_INTERCEPTORS,useClass : AuthInterceptorService , multi :true }],

})
export class CoreModule{}