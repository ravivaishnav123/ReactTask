
import * as ActionType from '../actionTypes';
export interface PostData {
    email: string;
}

export interface forgotPasswordState {
    forgotEmail: string,
    isLoading: boolean,
    message: string,
    param:{},
    forgotResponse: {},
    isUpdated:boolean,
    error: boolean,
    errorMsg: string
}

interface setForgotPasswordValues {
    type: typeof ActionType.USER_FORGOT_EMAIL;
    payload: forgotPasswordState;
}

interface setForgotPasswordSuccess {
    type: typeof ActionType.USER_FORGOT_SUCCESS;
    payload: {};
    message: string
}

interface setForgotPasswordAction {
    type: typeof ActionType.USER_FORGOT;
}

interface setForgotPasswordEmpty {
    type: typeof ActionType.SET_FORGOT_EMPTY;
}

interface setForgotPasswordFailure {
    type: typeof ActionType.USER_FORGOT_FAILURE;
    payload: string;
}

export type ForgotPasswordActionTypes = setForgotPasswordValues | setForgotPasswordSuccess | setForgotPasswordAction | setForgotPasswordFailure| setForgotPasswordEmpty;
