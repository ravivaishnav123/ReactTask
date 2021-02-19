import {
    loginState,
    LoginActionTypes,
    
} from "./loginType";
import * as ActionType from '../actionTypes';



const initialState: loginState = {
    isLoggedIn: false,
    showForgotPassword: false,
    email: '',
    password: '',
    device_id: '',
    device_type: '',
    isLoading: false,
    user: {},
    hide: true,
    error: false,
    errorMsg: '',
    message: ''
};

export default function loginReducer(
    state = initialState,
    action: LoginActionTypes
): loginState {
    switch (action.type) {
        case ActionType.USER_LOGIN_VALUE: {
            return {
                ...state,
                ...action.payload
            };
        }
        case ActionType.USER_LOGIN: {
            return {
                ...state, isLoading: true, error: false, errorMsg: '',
            };
        }
        case ActionType.USER_LOGIN_SUCCESS:
            return {
                ...state, isLoading: false, isLoggedIn: true, user: action.payload, errorMsg: '', error: false,
            }
        case ActionType.USER_LOGIN_FAILURE:
            return {
                ...state, isLoading: false, isLoggedIn: false, error: true, errorMsg: action.payload
            }
    
        default:
            return state;
    }
}
