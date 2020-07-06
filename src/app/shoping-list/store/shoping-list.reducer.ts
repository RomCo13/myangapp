import { Ingredient } from '../../shared/ingredient.model';


import * as shopinglistActions  from './shoping-list.actions';


export interface State{
    ingredients : Ingredient[];
    editedIngredient : Ingredient;
    editedIngredientIndex : number;
  }

const initialState : State = {
    ingredients : [
        new Ingredient('apples' , 5),
        new Ingredient('tomatoes' , 10)
    ],
    editedIngredient : null,
    editedIngredientIndex : -1,
};


export function shopinglistReducer(state : State = initialState , action : shopinglistActions.ShopingListAction)
{
     switch(action.type)
     {
        case shopinglistActions.ADD_INGREDIENT:
            {
                return{...state,
                    ingredients:[...state.ingredients, action.payload ]
                }
            }
        case shopinglistActions.ADD_INGREDIENTS:
            {
                return {...state,
                    ingredients:[...state.ingredients, ...action.payload]
                }
            }
        case shopinglistActions.UPDATE_INGREDIENTS:
            {
                const updated = {...action.payload.newIngr};
                const updatedIngrs = [...state.ingredients];
                updatedIngrs[state.editedIngredientIndex] = updated;
                return {
                    ...state,
                    ingredients:updatedIngrs,
                    editedIngredientIndex:-1,
                    editedIngredient:null,
                }

            }
        case shopinglistActions.DELETE_INGREDIENTS:
            {
                const ingrToDel = state.ingredients[state.editedIngredientIndex]
                return {
                  ...state,
                  ingredients:state.ingredients.filter((ig) =>
                    {
                        return ingrToDel !== ig;
                    }),
                  editedIngredientIndex : -1,
                  editedIngredient : null};

            }
        case shopinglistActions.START_EDIT:
            {
                return{...state,
                    editedIngredientIndex : action.payload,
                    editedIngredient : {...state.ingredients[action.payload]}
                }
            }
        case shopinglistActions.STOP_EDIT:
            {
                return {...state,
                    editedIngredient : null,
                    editedIngredientIndex : -1
                }
            }
        default:
            return state;
     }
}
