import { Component, OnInit ,EventEmitter, Output, OnDestroy } from '@angular/core';
// import { dataStorageService } from '../shared/data-storage.service';
import { authService } from '../auth/auth.service';
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
  @Output() selected = new EventEmitter<string>();

  constructor(private authService:authService,private store:Store<fromStoreApp.AppState>) { }
  private userSubscription:Subscription;
  isAuth=false;
  
  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(map(authstate=>
      {
        return authstate.user;
      })).subscribe(user=>
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
    // this.recipeStoreSerive.storeRecipe();
    this.store.dispatch(new RecipeAction.StoreRecipe());
  }
  onFetchData()
  {
    console.log('fetch data')
    this.store.dispatch(new RecipeAction.FetchRecipes());
  }
  onLogOut()
  {
    this.store.dispatch(new AuthAction.Logout())
  }
}
