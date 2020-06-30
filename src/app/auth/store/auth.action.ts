import { Action } from '@ngrx/store';

 export const LOGIN = 'LOGIN';
 export const LOGOUT = 'LOGOUT';
 export const Login_Start = 'Login_Start';
 export const Login_Fail='Login_Fail';
 export const SignUp_Start='Signup_Start';
 export const Clear_Error='Clear_Error';
 export const Auto_Login='Auto_Login';


 export class Login implements Action{
     readonly type = LOGIN;

     constructor(public payload : {
        email:string,
        userId:string;
        token:string;
        expirationDate:Date;
        redirect:boolean;
    }){}
 }

 export class Logout implements Action{
     readonly type =LOGOUT;

 }
 export class LoginStart implements Action{
     readonly type = Login_Start;

     constructor(public payload : {email:string,password:string} ){}
 }
export class LoginFail implements Action{
    readonly type = Login_Fail;

    constructor(public payload:{errorMessage:string}){}
}

export class SignupStart implements Action{
    readonly type = SignUp_Start;

    constructor(public payload : {email:string,password:string}){}
}
export class ClearError implements Action{
    readonly type = Clear_Error;
}

export class AutoLogin implements Action{
    readonly type = Auto_Login;

}
 export type AuthAction= Login|Logout|LoginStart|LoginFail|SignupStart|ClearError|AutoLogin