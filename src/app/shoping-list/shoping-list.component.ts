import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
// import { ShopingListService } from './shopinglist.service';
import {  Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStoreApp from '../store/app.reducer';
import * as shopinglistActions from './store/shoping-list.actions';


@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {

  ingredients:Observable <{ingredients:Ingredient[]}>;
  constructor(
    private store:Store<fromStoreApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients=this.store.select('shopingList');
    console.log(this.ingredients)
    console.log('inside the oninit shoping list componenet')
    // this.ingredients=this.shopingListService.getIngredientsList();
    // this.shopingListService.ingerdintChanged.subscribe(
    // (ingredients:Ingredient[])=>
    // {
    //   this.ingredients=ingredients;
    // });

  }
  // pushItem(item:Ingredient)
  // {
    
  //   this.shopingListService.addIngredint(item);
    
  // }
  onEditItem(index:number)
  {
    // this.shopingListService.startingEdit.next(index)
    this.store.dispatch(new shopinglistActions.StartEdit(index))
  }
}
