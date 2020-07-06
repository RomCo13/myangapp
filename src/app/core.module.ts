import { NgModule } from '@angular/core';
import { resolverService } from './recipes/recipe-reslover.service';
import { authGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  providers : [resolverService , authGuard , {provide : HTTP_INTERCEPTORS , useClass : AuthInterceptorService , multi : true }],

})
export class CoreModule{}
