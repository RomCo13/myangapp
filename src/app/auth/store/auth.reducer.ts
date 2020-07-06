import { User } from '../user.module';
import * as AuthAction from './auth.action';

const initialState:State = {
    user:null,
    authError:null,
    loading:false
};

export class State{
    user : User;
    authError : string;
    loading : boolean;
}
export function authReducer(state = initialState , action : AuthAction.AuthAction)
    {
        switch(action.type)
        {
            case AuthAction.LOGIN:
                {
                    const userLog = new User(action.payload.email,
                                            action.payload.userId,
                                            action.payload.token,
                                            action.payload.expirationDate);

                    return {...state,
                        authError:null,
                        user:userLog,
                        loading:false,
                    }
                }
            case AuthAction.LOGOUT:
                {
                    return {...state,
                      user : null};
                }
            case AuthAction.SIGNUP_START:
            case AuthAction.LOGIN_START:
                {
                    return {...state,
                      authError : null,
                      loading : true};
                }
            case AuthAction.LOGIN_FAIL:
                {
                    return{...state,
                      user : null,
                      authError : action.payload.errorMessage,
                      loading : false};
                }
            case AuthAction.CLEAR_ERROR:
                {
                    return {...state,
                      authError : null}
                }

            default :
                return state;

        }
    }
