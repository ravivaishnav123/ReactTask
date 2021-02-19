// Describing the shape of the system's slice of state
import * as ActionType from '../actionTypes';
export interface UserType {
    id: string;
    email: string;
    username: string;
    mobile: string;
}

export interface PostData {
    full_name: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    mobile: string;
}

export interface registerState {
    fullName: string;
    email: string;
    address: string;
    password: string;
    confirmPassword: string;
    message: string;
    mobile: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    isLoading: boolean;
    hasData: boolean;
    registerResponse: {},
    error: boolean;
    errorMsg: string;

}

interface setRegisterValues {
    type: typeof ActionType.USER_REGISTER_VALUE;
    payload: registerState;
}

interface setRegisterSuccess {
    type: typeof ActionType.USER_REGISTER_SUCCESS;
    payload: {};
    message: string
}

interface setRegisterAction {
    type: typeof ActionType.USER_REGISTER;
}

interface setRegisterFailure {
    type: typeof ActionType.USER_REGISTER_FAILURE;
    payload: string;
}
interface setRegisterEmpty {
    type: typeof ActionType.USER_REGISTER_EMPTY;
   
}

export type RegisterActionTypes = setRegisterEmpty|setRegisterValues | setRegisterSuccess | setRegisterAction | setRegisterFailure;
