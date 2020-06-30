import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { loadingSpinnerComponenet } from './loadingSpinner/loading-spinner.component';
import { DropdowmDirective } from './dropdow.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        AlertComponent,
        loadingSpinnerComponenet,
        DropdowmDirective,
    ],
    imports:[
        CommonModule,
        
    ],
    exports:[
        AlertComponent,
        loadingSpinnerComponenet,
        DropdowmDirective,
        CommonModule,
        
    ]
})
export class sharedModule{}