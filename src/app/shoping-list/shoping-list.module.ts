import { NgModule } from '@angular/core';
import { ShopingListComponent } from './shoping-list.component';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { sharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
    ShopingListComponent,
    ShopingEditComponent,
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        sharedModule,
        RouterModule.forChild([{path:'',component:ShopingListComponent}]),

    ],
    exports:[
        ShopingListComponent,
        ShopingEditComponent,
    ]

})
export class shopinglistModule{}