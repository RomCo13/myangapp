import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService, AuthResponeData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthEffect } from './store/auth.effect';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../store/app.reducer'
import * as AuthAction from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService : authService,private router:Router,private authEffects:AuthEffect,private store:Store<fromStoreApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState=>
      {
        this.isLoading=authState.loading;
        this.error=authState.authError;
        
      })

  }
  isLoginMode=true;
  isLoading=false;
  error:string = null;

  toggle()
  {
    this.isLoginMode=!this.isLoginMode;

  }
  onSubmit(form :NgForm)
  {
    this.isLoading=true;

    if(form.valid)
    {
      const email = form.value.email;
      const password= form.value.password;
      let authObservable:Observable<AuthResponeData>;

      if(this.isLoginMode)
      {
        // authObservable=this.authService.Login(email,password);
        this.store.dispatch(new AuthAction.LoginStart({email:email,password:password}));
      }
      else
      {
        // authObservable=this.authService.SignUp(email,password);
        this.store.dispatch(new AuthAction.SignupStart({email:email,password:password}));
      }
      
      // authObservable.subscribe((responeData)=>
      // {
      //   console.log(responeData);
      //   this.isLoading=false;
      //   console.log('nav')
      //   this.router.navigate(['/recipe']);
      // },errorMessage=>
      // {
      //   this.error=errorMessage;
      //   this.isLoading=false;
      // })
    }
    form.reset();
  }

  onHandleError()
  {
    // this.error=null;
    this.store.dispatch(new AuthAction.ClearError());
  }


}
