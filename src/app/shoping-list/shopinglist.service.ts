// import { Ingredient } from '../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';
// import { Subject } from 'rxjs';

// export class ShopingListService
// {
//     startingEdit= new Subject<number>();
//     ingerdintChanged= new Subject<Ingredient[]>();

//     ingredients:Ingredient[] = [
//         new Ingredient('apples', 5),
//         new Ingredient('tomatoes' ,10)
//       ];

//     getIngredientsList()
//     {
//         return this.ingredients.slice();
//     }
//     addIngredint(ingredient: Ingredient)
//     {
//         this.ingredients.push(ingredient);
//         this.ingerdintChanged.next(this.ingredients.slice());
//     }
//     addIngredints(ingredientArray:Ingredient[])
//     {
//         this.ingredients.push(...ingredientArray);
//         this.ingerdintChanged.next(this.ingredients.slice());
//     }
//     getIngredient(index:number)
//     {
//         return this.ingredients[index];
//     }
//     updateIngredinet(index : number,newIngr:Ingredient)
//     {
//         this.ingredients[index]=newIngr;
//         this.ingerdintChanged.next(this.ingredients.slice());
//     }
//     deleteIngredient(index:number)
//     {
//         this.ingredients.splice(index,1);
//         this.ingerdintChanged.next(this.ingredients.slice());
//     }
// }