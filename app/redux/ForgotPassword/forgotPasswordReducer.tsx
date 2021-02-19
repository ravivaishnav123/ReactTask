import {
    forgotPasswordState,
    ForgotPasswordActionTypes,
} from "./forgotPasswordType";
import * as ActionType from '../actionTypes';

const initialState: forgotPasswordState = {
    forgotEmail: "",
    param:{},
    isLoading: false,
    message: "",
    forgotResponse: {},
    isUpdated:false,
    error: false,
    errorMsg: ""
};

export default function forgotPasswordReducer(
    state = initialState,
    action: ForgotPasswordActionTypes
): forgotPasswordState {
    switch (action.type) {
        case ActionType.USER_FORGOT_EMAIL: {
            return {
                ...state,
                ...action.payload
            };
        }
        case ActionType.SET_FORGOT_EMPTY: {
            return initialState
        }
        case ActionType.USER_FORGOT: {
            return {
                ...state, isLoading: true, error: false, errorMsg: '',
            };
        }
        case ActionType.USER_FORGOT_SUCCESS:
            return {
                ...state, isLoading: false,message:action.message, isUpdated: true, forgotResponse: action.payload, errorMsg: '', error: false,
            }
        case ActionType.USER_FORGOT_FAILURE:
            return {
                ...state, isLoading: false, error: true, errorMsg: action.payload
            }

        default:
            return state;
    }
}
