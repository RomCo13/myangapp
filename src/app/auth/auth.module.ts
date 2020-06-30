import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        AuthComponent,
    ],
    imports:[
        RouterModule.forChild([{path:'',component:AuthComponent}]),
        CommonModule,
        FormsModule,
        sharedModule
    ],

})
export class AuthModule{}