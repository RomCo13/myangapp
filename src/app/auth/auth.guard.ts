import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../store/app.reducer'


@Injectable()
export class authGuard implements CanActivate
{
    constructor(private authService:authService,private router :Router,private store:Store<fromStoreApp.AppState>){}

    canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean| UrlTree | Promise <boolean| UrlTree> | Observable<boolean | UrlTree>
    {
        return this.store.select('auth').pipe(take(1),
            map(authstate=>
                {
                    return authstate.user;
                }),
            map(user=>
            {
                if(!!user)
                    return true;
                console.log('navigate to auth')
                return this.router.createUrlTree(['/auth'])
            }))
    }
}