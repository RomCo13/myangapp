import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store'
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './shared/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from'@angular/common/http'

import { sharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromStoreApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';


@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    sharedModule,
    CoreModule,
    StoreModule.forRoot(fromStoreApp.appReducer),
    EffectsModule.forRoot([AuthEffect,RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production})

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 