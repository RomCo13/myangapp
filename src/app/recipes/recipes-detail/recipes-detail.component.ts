import { Component, OnInit , Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../../store/app.reducer'
import { map, switchMap } from 'rxjs/operators';
import * as RecipeAction from '../store/recipe.action';
import * as ShopingListAction from '../../shoping-list/store/shoping-list.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
@Injectable()
export class RecipesDetailComponent implements OnInit {

  constructor(
              private route:ActivatedRoute ,
              private router:Router ,
              private store:Store<fromStoreApp.AppState>
              ){}

  recipeDetail : Recipe;
  id : number;

  ngOnInit(): void {
    this.route.params.pipe(
      map(params =>
        {
          return +params['id'];
        }),
      switchMap(id =>
        {
          this.id = id;
          return this.store.select('recpies');
        }),
      map(state =>
        {
          return state.recipes.find((recipe,index)=>
          {
            return index === this.id;
          })
        })
    )
    .subscribe(recipe =>
          {
            this.recipeDetail = recipe;
          })
  }

  addToShopingList()
  {
      this.store.dispatch(new ShopingListAction.AddIngredients(this.recipeDetail.ingredients));
  }

  onEditRecipe()
  {
    this.router.navigate(['edit'] , {relativeTo:this.route});
  }

  onRemoveRecipe()
  {
    let index: number = this.id
    this.store.dispatch(new RecipeAction.DeleteRecipe({index}))
    this.router.navigate([''] , {relativeTo:this.route.parent});
  }


}
