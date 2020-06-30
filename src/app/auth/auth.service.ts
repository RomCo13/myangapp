import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError ,tap } from 'rxjs/operators';
import { throwError , BehaviorSubject, from } from 'rxjs';
import { User } from './user.module';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { Store } from '@ngrx/store';
import * as formStoreApp from '../store/app.reducer'
import * as authAction from '../auth/store/auth.action';
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
export class authService
{
    // user = new BehaviorSubject<User>(null);
    // private TokenExpr
   

    // constructor(private http:HttpClient,private router:Router,private store :Store<formStoreApp.AppState>){}

    // signUpUrl='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +environment.firebaseAPIKey;
    // loginUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey;
    // signup(email:string,password:string)
    // {
    //     return this.http.post<AuthResponeData>(this.signUpUrl,{
    //         email:email,
    //         password:password,
    //         secureToken:true
    //     })
    //     .pipe(
    //     catchError(this.handleError),
    //     tap(respones=>
    //         {
    //             console.log(respones.expiresIn)
    //             this.handleAuth(respones.email,respones.localId,respones.idToken,+respones.expiresIn);
    //         }));
    // }

    // Login(email:string,password:string)
    // {
    //     console.log('login')
    //     return this.http.post<AuthResponeData>(this.loginUrl,
    //         {
    //             email:email,
    //             password:password,
    //             secureToken:true
    //         })
    //         .pipe(catchError(this.handleError),
    //             tap(respones=>
    //                 {
    //                     console.log(respones)
    //                     console.log(respones.expiresIn)
    //                     let num:number = Number(respones.expiresIn);
    //                     console.log(num)
    //                     this.handleAuth(respones.email,respones.localId,respones.idToken,+respones.expiresIn);
    //                 }
    //             ));
            
    // }
    // Logout()
    // {
    //     // this.user.next(null);
    //     this.store.dispatch(new authAction.Logout());
    //     // this.router.navigate(['auth'])
    //     localStorage.removeItem('userDataStore')
    //     if(this.TokenExpr)
    //     {
    //         clearTimeout(this.TokenExpr);
    //     }
    // }

    // private handleError(errorRespone:HttpErrorResponse)
    // {
    //     console.log('handle error')
    //     let errorMessage='an error occured';
    //             if(!errorRespone.error || !errorRespone.error.error)
    //             {
    //                 console.log(errorRespone.error)
    //                 console.log(errorRespone.error.error);
    //                 return throwError(errorMessage);
    //             }
    //             console.log(errorRespone.error.error.message)
    //             switch(errorRespone.error.error.message)
    //             {
    //                 case 'EMAIL_EXISTS':
    //                     errorMessage='this email already exist try other email';
    //                     break;
    //                 case 'EMAIL_NOT_FOUND' :
    //                     errorMessage='wrong email'
    //                     break;
    //                 case 'INVALID_PASSWORD':
    //                     errorMessage='wrong password'
    //                     break;
                    
    //             }
    //             return throwError(errorMessage);
    // }
    // autoLogin()
    // {
    //     console.log('auto Loging')
    //     const data:{
    //         email:string
    //         id:string;
    //         _token:string;
    //         _ExprToken:Date;
    //     } = JSON.parse(localStorage.getItem('userDataStore'));
    //     if(data==null)
    //         return;
    //     const loadedUser=new User(data.email,data.id,data._token,new Date(data._ExprToken));
    //     console.log(loadedUser.token) 

    //     if(loadedUser.token)
    //     {
    //         // this.user.next(loadedUser); 
    //         this.store.dispatch(new authAction.Login({email:data.email,userId:data.id,token:data._token,expirationDate:data._ExprToken}));
    //         const expr= new Date(data._ExprToken).getTime()-new Date().getTime();
    //         // this.autoLogout(expr);
    //     }     
    // }
    // autoLogout(expirationDur:number)
    // {
    //     console.log('auto logout')
    //     this.TokenExpr=setTimeout(() => {
    //         this.Logout();
    //     }, expirationDur);
    // }
    // private handleAuth(email:string , userId:string , token:string,expiresIn:number)
    // {
       
    //     const exprDate= new Date(new Date().getTime() + expiresIn * 1000);
    //     const user= new User(email, userId, token,exprDate);
    //     // this.user.next(user);
    //     this.store.dispatch(new authAction.Login({email:email,userId:userId,token:token,expirationDate:exprDate}));

    //     // this.autoLogout(expiresIn * 1000);
    //     localStorage.setItem('userDataStore', JSON.stringify(user));
    // }
}
