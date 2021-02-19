
export interface PostData {
    email: string;
    password: string;
}

export interface routerState {
    isUserLogin: boolean
}

export interface loginState {
    isLoggedIn: boolean,
    showForgotPassword: boolean,
    email: string,
    password: string,
    device_id: string,
    device_type: string,
    isLoading: boolean,
    hide: boolean,
    user: {},
    error: boolean,
    errorMsg: string,
    message: string
}

// Describing the different ACTION NAMES available
export const USER_LOGIN_VALUE = 'USER_LOGIN_VALUE';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_EMPTY = 'USER_LOGIN_EMPTY';
export const SET_ROUTER = 'SET_ROUTER';

interface setValuesAction {
    type: typeof USER_LOGIN_VALUE;
    payload: loginState;
}

interface setRouterValue {
    type: typeof SET_ROUTER;
    payload: routerState;
}

interface setLoginSuccess {
    type: typeof USER_LOGIN_SUCCESS;
    payload: LoginModel
}

interface setLoginAction {
    type: typeof USER_LOGIN;
    // payload: loginState;
}

interface setLoginFailure {
    type: typeof USER_LOGIN_FAILURE;
    payload: string;
}

export type LoginActionTypes = setValuesAction | setLoginSuccess | setLoginAction | setLoginFailure | setRouterValue;
