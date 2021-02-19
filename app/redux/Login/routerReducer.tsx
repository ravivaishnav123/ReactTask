import * as ActionType from '../actionTypes';
import { LoginActionTypes,routerState } from "./loginType";
const initialState = {
    isUserLogin: false,
}

export default function routerReducer(
    state = initialState,
    action: LoginActionTypes
): routerState {
    switch (action.type) {
       
        case ActionType.SET_ROUTER:
            console.log("ActionType",action.type)
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}