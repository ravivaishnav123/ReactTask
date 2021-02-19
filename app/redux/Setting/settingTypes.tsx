// Describing the shape of the system's slice of state
import * as ActionType from '../actionTypes';

export interface PostData {
    email: string,
    full_name: string,
    mobile: string
}

export interface ChangePassData {
    password: string,
    old_password: string,
    user_id: string
}

export interface settingState {
    email: string;
    name: string;
    phone: string;
    user_id:string;
    profile_pic: string;
    message: string;
    isProfileUpdated: boolean;
    profileResponse: {},
    error: boolean;
    isLoading: boolean;
    errorMsg: string

    showChangePasswordModal: boolean;
    password: string;
    confirm_password: string;
    old_password: string;
    isPasswordUpdated: boolean,
    changeResponse: {},

}

interface setProfileValue {
    type: typeof ActionType.USER_PROFILE_VALUE;
    payload: settingState;
}

interface setProfileSuccess {
    type: typeof ActionType.USER_PROFILE_SUCCESS;
    payload: {};
    message:string;
}

interface setProfileAction {
    type: typeof ActionType.USER_PROFILE;
}

interface setProfileFailure {
    type: typeof ActionType.USER_PROFILE_FAILURE;
    payload: string;
}

interface setChangePasswordSuccess {
    type: typeof ActionType.CHANGE_PASSWORD_SUCCESS;
    payload: {},
    message:string;
}

interface setChangePasswordAction {
    type: typeof ActionType.CHANGE_PASSWORD;
}

interface setChangePasswordFailure {
    type: typeof ActionType.CHANGE_PASSWORD_FAILURE;
    payload: string;
}

export type SettingActionTypes = setProfileValue | setProfileSuccess | setProfileAction | setProfileFailure | setChangePasswordSuccess | setChangePasswordAction | setChangePasswordFailure;
