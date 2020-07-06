import {Actions, ofType, Effect} from '@ngrx/effects';
import * as AuthAction from '../store/auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.module';

export interface AuthResponeData
{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registred?:boolean;
}

@Injectable()
export class AuthEffect{
    constructor(private actions: Actions,
                private http:HttpClient,
                private router :Router ){}

    loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
    signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;

    @Effect()
    authLogin = this.actions.pipe(
        ofType(AuthAction.LOGIN_START),
        switchMap((authData : AuthAction.LoginStart) =>
        {
            return this.http.post<AuthResponeData>(this.loginUrl,{
                email : authData.payload.email,
                password : authData.payload.password,
                secureToken : true
            }).
            pipe(
            map(responeData =>
                {
                    return this.HandleAuth(responeData);
                }),
            catchError(errorRespone=>
            {
                return this.HandleError(errorRespone);
            }
            ));
        })
      );

    @Effect({dispatch:false})
    authSuccess = this.actions.pipe(
      ofType(AuthAction.LOGIN),
      tap((authAction : AuthAction.Login) =>
      {
          if(authAction.payload.redirect)
              {
                this.router.navigate(['/']);
              }
    }));



    @Effect()
    authSignUp = this.actions.pipe(
        ofType(AuthAction.SIGNUP_START),
        switchMap((SignUp : AuthAction.SignupStart) =>
        {
            return this.http.post<AuthResponeData>(this.signUpUrl,{
                email : SignUp.payload.email,
                password : SignUp.payload.password,
                secureToken : true
            }).
            pipe(
              map(responeData =>
                {
                    return this.HandleAuth(responeData);
                }),
            catchError(errorRespone =>
            {
                return this.HandleError(errorRespone);
            }

        ))
        }),
    )
    @Effect({dispatch:false})
    authLogOut = this.actions.pipe(
      ofType(AuthAction.LOGOUT),
      tap(() =>{
        localStorage.removeItem('userDataStore')
        this.router.navigate(['/auth']);
    }));

    @Effect()
    autoLogin = this.actions.pipe(
      ofType(AuthAction.AUTO_LOGIN),
      map(() =>
      {
        const data:{
            email : string
            id : string;
            _token : string;
            _ExprToken : Date;

        } = JSON.parse(localStorage.getItem('userDataStore'));

        if(data == null)
            return {type : 'dummy'};

        const loadedUser = new User(data.email,
                                    data.id,
                                    data._token,
                                    new Date(data._ExprToken));
        if(loadedUser.token)
        {
            return new AuthAction.Login({email : data.email,
                                        userId : data.id,
                                        token : data._token,
                                        expirationDate : data._ExprToken,
                                        redirect : false});
        }
        else
          return {type : 'dummy'};
    }));

     HandleAuth=(responeData) =>{
        const expr= new Date( new Date().getTime() + +responeData.expiresIn *1000)
        const user = new User(responeData.email,
                              responeData.localId,
                              responeData.idToken,
                              responeData.expiresIn)

        localStorage.setItem('userDataStore', JSON.stringify(user));
        return new AuthAction.Login({email : responeData.email,
                                    userId : responeData.localId,
                                    token : responeData.idToken,
                                    expirationDate : expr,
                                    redirect : true})
    }

     HandleError=(errorRespone) =>{
        let errorMessage='an error occured';
    if(!errorRespone.error || !errorRespone.error.error)
    {
        return of(new AuthAction.LoginFail({errorMessage}));
    }
    switch(errorRespone.error.error.message)
    {
        case 'EMAIL_EXISTS':
            errorMessage = 'this email already exist try other email';
            break;
        case 'EMAIL_NOT_FOUND' :
            errorMessage = 'wrong email'
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'wrong password'
            break;
    }
        return of(new AuthAction.LoginFail({errorMessage:errorMessage}))
    }
}
