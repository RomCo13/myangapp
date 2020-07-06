import { Component, OnInit ,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../store/app.reducer'
import { map } from 'rxjs/operators';
import * as AuthAction from '../auth/store/auth.action'
import * as RecipeAction from '../recipes/store/recipe.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  constructor(private store : Store<fromStoreApp.AppState>) { }

  @Output() selected = new EventEmitter<string>();
  private userSubscription : Subscription;
  isAuth = false;

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').
      pipe(
      map(authstate =>
      {
        return authstate.user;
      }))
      .subscribe(user =>
      {
        this.isAuth = !user ? false : true;
      });
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

  onSelect(content:string)
  {
        this.selected.emit(content);
  }

  onSave()
  {
    this.store.dispatch(new RecipeAction.StoreRecipe());
  }

  onFetchData()
  {
    this.store.dispatch(new RecipeAction.FetchRecipes());
  }

  onLogOut()
  {
    this.store.dispatch(new AuthAction.Logout())
  }
}
