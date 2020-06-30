import { User } from '../user.module';
import * as AuthAction from './auth.action';

const initialState:State = {
    user:null,
    authError:null,
    loading:false
};

export class State{
    user:User;
    authError:string;
    loading:boolean;
}
export function authReducer(state = initialState , action:AuthAction.AuthAction)
    {
        switch(action.type)
        {
            case AuthAction.LOGIN:
                {
                    console.log('login ' )
                    console.log(state)
                    const userLog= new User(action.payload.email,action.payload.userId,action.payload.token,action.payload.expirationDate);

                    return {...state,
                        authError:null,
                        user:userLog,
                        loading:false,
                    }
                }
            case AuthAction.LOGOUT:
                {
                    return {...state,user:null};
                }
            case AuthAction.SignUp_Start:
            case AuthAction.Login_Start:
                {
                    return {...state,authError:null,loading:true}
                }
            case AuthAction.Login_Fail:
                {
                    return{...state,user:null,authError:action.payload.errorMessage,loading:false}
                }
            case AuthAction.Clear_Error:
                {
                    return {...state,authError:null}
                }
            
            default :
                return state
        
        }
    }