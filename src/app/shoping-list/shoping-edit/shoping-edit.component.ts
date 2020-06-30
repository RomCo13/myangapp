import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShopingListService } from '../shopinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shopinglistActions from '../store/shoping-list.actions'
import * as fromStoreApp from '../../store/app.reducer';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit,OnDestroy {
  @Input() itemData:Ingredient;
  
  constructor(private store:Store<fromStoreApp.AppState>) { }

  subscription:Subscription
  editmode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  @ViewChild('f') editForm:NgForm;

  ngOnInit(): void {
    this.subscription=this.store.select('shopingList').subscribe(stateData=>
      {

        if(stateData.editedIngredientIndex>-1)
        {
          this.editmode=true;
          this.editedItem=stateData.editedIngredient;
          this.editedItemIndex=stateData.editedIngredientIndex;
          this.editForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          })
        }
        else
        {
          this.editmode=false;
        }
        
      })
    
  }

  addItemToList(form:NgForm)
  {
    this.itemData=new Ingredient(form.value.name ,form.value.amount);
    
    if(!this.editmode)
    {
      // this.shopingListService.addIngredint(this.itemData);
    
      this.store.dispatch(new shopinglistActions.AddIngredient(this.itemData));

    }
    else
    {
      // this.shopingListService.updateIngredinet(this.editedItemIndex,this.itemData)
      this.store.dispatch(new shopinglistActions.UpdateIngredient({newIngr:this.itemData}));
    }
    this.editmode=false;
    form.reset();
  }
  Reset()
  {
    this.editmode=false;
    this.editForm.reset();
    this.store.dispatch(new shopinglistActions.StopEdit());
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
    this.store.dispatch(new shopinglistActions.StopEdit());
  }
  onDelete(form:NgForm)
  {
    // this.shopingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new shopinglistActions.DeleteIngredient());
    this.Reset();
  }
}
