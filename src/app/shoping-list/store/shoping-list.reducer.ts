import { Ingredient } from '../../shared/ingredient.model';


import * as shopinglistActions  from './shoping-list.actions';


export interface State{
    ingredients:Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex:number;
  }

const initialState :State = {
    ingredients : [
        new Ingredient('apples', 5),
        new Ingredient('tomatoes' ,10)
    ],
    editedIngredient:null,
    editedIngredientIndex:-1,
};


export function shopinglistReducer(state:State = initialState , action: shopinglistActions.AddIngredient|shopinglistActions.AddIngredients|shopinglistActions.UpdateIngredient|shopinglistActions.DeleteIngredient|shopinglistActions.StartEdit|shopinglistActions.StopEdit )
{
     switch(action.type)
     {
        case shopinglistActions.Add_Ingredient:
            {
                return{...state,
                    ingredients:[...state.ingredients, action.payload ]
                }
            }
        case shopinglistActions.Add_Ingredients:
            {
                return {...state,
                    ingredients:[...state.ingredients, ...action.payload]
                }
            }
        case shopinglistActions.Update_Ingredient:
            {
                const ingr=state.ingredients[ state.editedIngredientIndex];
                const updated={...action.payload.newIngr};
   

                const updatedIngrs=[...state.ingredients];
                updatedIngrs[state.editedIngredientIndex]= updated;
                return {
                    ...state,
                    ingredients:updatedIngrs,
                    editedIngredientIndex:-1,
                    editedIngredient:null,
                }

            }
        case shopinglistActions.Delete_Ingredient:
            {   
                const ingeToDel= state.ingredients[state.editedIngredientIndex]
                return {...state,ingredients:state.ingredients.filter((ig)=>
                    {
                        return ingeToDel!==ig;
                    }),
                    editedIngredientIndex:-1,
                    editedIngredient:null,};
                    
            }
        case shopinglistActions.Start_Edit:
            {
                return{...state,
                    editedIngredientIndex:action.payload,
                    editedIngredient:{...state.ingredients[action.payload]}
                }
            }
        case shopinglistActions.Stop_Edit:
            {
                return {...state,
                    editedIngredient:null,
                    editedIngredientIndex:-1
                }
            }
        default:
            return state;
     }
}