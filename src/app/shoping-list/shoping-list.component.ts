import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
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

  constructor(private store : Store<fromStoreApp.AppState>) { }

  ingredients : Observable <{ingredients : Ingredient[]}>;

  ngOnInit(): void {
    this.ingredients = this.store.select('shopingList');
  }

  onEditItem(index : number)
  {
    this.store.dispatch(new shopinglistActions.StartEdit(index))
  }
}
