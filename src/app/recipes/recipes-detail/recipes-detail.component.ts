import { Component, OnInit , Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
// import { ShopingListService } from 'src/app/shoping-list/shopinglist.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../../store/app.reducer'
import { map } from 'rxjs/operators';
import * as RecipeAction from '../store/recipe.action';
import * as ShopingListAction from '../../shoping-list/store/shoping-list.actions';
@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
@Injectable()
export class RecipesDetailComponent implements OnInit {
  recipeDetail :Recipe;
  id:number;
  constructor(
              private route:ActivatedRoute ,
              private router:Router ,
              private recipeService:RecipeService,
              private store:Store<fromStoreApp.AppState>
              ){}
                
    

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id= +params['id'];
      // this.recipeDetail=this.recipeService.getRecipeById(this.id);
      this.store.select('recpies').pipe(map(state=>
        {
          return state.recipes.find((recipe,index)=>
          {
            return index === this.id;
          })
        }
        )).subscribe(recipe=>
          {
            this.recipeDetail=recipe;
          })
    });
  }

  addToShopingList()
  {
      // this.recipeService.addIngredientsToShopingList(this.recipeDetail.ingredients);
      this.store.dispatch(new ShopingListAction.AddIngredients(this.recipeDetail.ingredients));

  }
  onEditRecipe()
  {
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onRemoveRecipe()
  {
    // this.recipeService.deleteRecipe(this.recipeDetail);
    let index: number= this.id
    this.store.dispatch(new RecipeAction.DeleteRecipe({index}))
    this.router.navigate([''],{relativeTo:this.route.parent});
  }
 
 
}
