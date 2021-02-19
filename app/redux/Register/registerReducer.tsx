import {
    registerState,
    RegisterActionTypes,
} from "./registerType";
import * as ActionType from '../actionTypes';

const initialState: registerState = {
    fullName: "ss",
    email: "f@gmail.com",
    address: "sss",
    password: "123",
    message: "",
    confirmPassword: "123",
    mobile: "s3468",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    isLoading: false,
    hasData: false,
    registerResponse: {},
    error: false,
    errorMsg: "",

};

export default function registerReducer(
    state = initialState,
    action: RegisterActionTypes
): registerState {
    switch (action.type) {
        case ActionType.USER_REGISTER_VALUE: {

        console.log("register")
            return {
                ...state,
                ...action.payload
            };
        }
        case ActionType.USER_REGISTER_EMPTY: {
            return initialState
        }
        case ActionType.USER_REGISTER: {
            return {
                ...state, isLoading: true, error: false, errorMsg: '',
            };
        }
        case ActionType.USER_REGISTER_SUCCESS:
            console.log('suceess',action)
            return {
                ...state, isLoading: false, hasData: true, registerResponse: action.payload, errorMsg: '', error: false,
            }
        case ActionType.USER_REGISTER_FAILURE:
            return {
                ...state, isLoading: false, error: true, errorMsg: action.payload
            }

        default:
            return state;
    }
}
