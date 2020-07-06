import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../store/app.reducer'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{
    constructor(private store : Store<fromStoreApp.AppState>){}

    intercept(req : HttpRequest<any> , next : HttpHandler)
    {
        return this.store.select('auth').pipe(
            take(1),
            map(authState =>
                {
                    return authState.user;
                }),
            exhaustMap(user =>
                {
                    if(!user || !user.token)
                    {
                        return next.handle(req);
                    }
                    else
                    {
                        if(user.token)
                        {
                            const modifiedReq = req.clone({headers : req.headers.append('auth',user.token)});
                            return next.handle(modifiedReq);
                        }
                    }
                }));

    }
}
