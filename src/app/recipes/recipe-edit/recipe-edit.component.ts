import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as fromStoreApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as RecipeAction from '../store/recipe.action';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router,private store:Store<fromStoreApp.AppState>) { }
  id:number;
  editMode=false;
  recipeForm:FormGroup;
  private sub:Subscription
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>
      {
        this.id=+params['id'];
        this.editMode= params['id'] != null;
        this.initForm();
      }
    )
  }
  ngOnDestroy()
  {
    if(this.sub)
      this.sub.unsubscribe();
  }
  onSubmit()
  {
    const newRecipe= new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients']);
    if(this.editMode)
    {
      // this.recipeService.updateRecipe(this.id,newRecipe)
      let index =this.id;
      this.store.dispatch(new RecipeAction.UpdateRecipe({index,newRecipe}));
    }
    else
    {
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipeAction.AddRecipe(newRecipe));
    }
    this.router.navigate([''],{relativeTo:this.route.parent});
  }
  getControls()
  {
    return (this.recipeForm.get('ingredients')as FormArray).controls;
  }
  goToHomePage()
  {
    this.router.navigate([''],{relativeTo:this.route.parent});
  }
  removeIngredinet(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onAddIngerident()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl('',Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))

  }
  private initForm()
  {
      let recipeName='';
      let recipeImagePath='';
      let recipeDescription='';
      let recipeIngr=new FormArray([]);
    if(this.editMode)
    {
      this.sub=this.store.select('recpies').pipe(map(state=>{
        return state.recipes.find((recipe,index)=>
        {
          return index===this.id;
        })
      })).subscribe(recipe=>
        {
          recipeName=recipe.name;
          recipeImagePath=recipe.imagePath;
           recipeDescription=recipe.description;
          if(recipe['ingredients'])
          {
           for(let ingr of recipe.ingredients)
            {
                recipeIngr.push(new FormGroup({
                'name':new FormControl (ingr.name,Validators.required),
                'amount': new FormControl(ingr.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
            }

          }
        })
       
      
    }
    this.recipeForm = new FormGroup({
      
      'name' :new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients' : recipeIngr
    })
  }

}
