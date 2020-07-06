import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private authEffects : AuthEffect , private store:Store<fromStoreApp.AppState>) { }

  isLoginMode = true;
  isLoading = false;
  error:string = null;

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState=>
      {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      });
  }

  toggle()
  {
    this.isLoginMode =! this.isLoginMode;
  }

  onSubmit(form : NgForm)
  {
    this.isLoading = true;

    if(form.valid)
    {
      const email = form.value.email;
      const password = form.value.password;

      if(this.isLoginMode)
      {
        this.store.dispatch(new AuthAction.LoginStart({email : email , password : password}));
      }
      else
      {
        this.store.dispatch(new AuthAction.SignupStart({email : email , password : password}));
      }
    }
    form.reset();
  }

  onHandleError()
  {
    this.store.dispatch(new AuthAction.ClearError());
  }
}
