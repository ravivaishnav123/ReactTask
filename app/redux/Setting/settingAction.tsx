import { settingState, PostData, ChangePassData } from "./settingTypes";
import * as Action from '../actionTypes/index'
import NetInfo from "@react-native-community/netinfo";
import { Keyboard } from 'react-native';
import { postData } from '../../services/index';
import * as Constants from '../../components/utils/constants'

export function setProfileValues(newSession: settingState) {
    return {
        type: Action.USER_PROFILE_VALUE,
        payload: newSession
    };
}

export function postProfileData(data: PostData) {
    Keyboard.dismiss()
    return (dispatch: any) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch(userProfileAction())
                postData(Constants.ApiMethods.userProfile, data)
                    .then(response => {
                        if (response !== undefined) {

                            if (response.status === true) {
                                dispatch(userProfileSucess(response.data,response.message))
                            } else {
                                dispatch(userProfileFailure(response.message))
                            }
                        } else {
                            dispatch(userProfileFailure(Constants.Messages.server_error))
                        }
                    })
                    .catch((e => dispatch(userProfileFailure(Constants.Messages.server_error))));
            } else {
                dispatch(userProfileFailure(Constants.Messages.no_internet))
            }
        });

    }
}

function userProfileAction() {
    return {
        type: Action.USER_PROFILE
    }
}

function userProfileSucess(data: {},msg:string) {
    return {
        type: Action.USER_PROFILE_SUCCESS,
        payload: data,
        message:msg
    }
}

function userProfileFailure(err: string) {
    return {
        type: Action.USER_PROFILE_FAILURE,
        error: err
    }
}

//CHANGE PASSWORD API
export function fetchChangePasswordApi(data: ChangePassData) {
    Keyboard.dismiss()
    return (dispatch: any) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                dispatch(ChangePasswordAction())
                postData(Constants.ApiMethods.changePassword, data)
                    .then(response => {
                        if (response !== undefined) {
                            if (response.status === true) {
                                dispatch(changePasswordSucess(response.data,response.message))
                            } else {
                                dispatch(changePasswordFailure(response.message))
                            }
                        } else {
                            dispatch(changePasswordFailure(Constants.Messages.server_error))
                        }
                    })
                    .catch((e => dispatch(changePasswordFailure(Constants.Messages.server_error))));
            } else {
                dispatch(changePasswordFailure(Constants.Messages.no_internet))
            }
        });

    }
}

function ChangePasswordAction() {
    return {
        type: Action.CHANGE_PASSWORD
    }
}

function changePasswordSucess(data: {},msg:string) {
    return {
        type: Action.CHANGE_PASSWORD_SUCCESS,
        payload: data,
        message:msg
    }
}

function changePasswordFailure(err: string) {
    return {
        type: Action.CHANGE_PASSWORD_FAILURE,
        error: err
    }
}

