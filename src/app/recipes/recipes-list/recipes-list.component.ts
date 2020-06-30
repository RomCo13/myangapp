import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../../store/app.reducer'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
 
  recipes:Recipe[];
  subscription:Subscription;
  constructor(private recipeService:RecipeService,
              private router:Router,
              private route:ActivatedRoute,
              private store:Store<fromStoreApp.AppState>) { }

  ngOnInit(): void {
    this.subscription= this.store.select('recpies').pipe(map(state=>{return state.recipes} )).subscribe((recipesArr:Recipe[])=>
    {
      this.recipes=recipesArr;
    });
    this.recipes=this.recipeService.getRecipe();
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
