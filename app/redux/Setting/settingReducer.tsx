import {
    settingState,
    SettingActionTypes,
} from "./settingTypes";
import * as ActionType from '../actionTypes';

const initialState: settingState = {
    user_id: "",
    email: "",
    name: "",
    phone: "",
    profile_pic: "",
    message: "",
    isProfileUpdated: false,
    profileResponse: {},
    error: false,
    isLoading: false,
    errorMsg: "",

    //CHANGE PASSWORD
    showChangePasswordModal: false,
    password: '',
    confirm_password: '',
    old_password: '',
    isPasswordUpdated: false,
    changeResponse: {},


};

export default function registerReducer(
    state = initialState,
    action: SettingActionTypes
): settingState {
    switch (action.type) {
        case ActionType.USER_PROFILE_VALUE: {
            return {
                ...state,
                ...action.payload
            };
        }
        case ActionType.USER_PROFILE: {
            return {
                ...state, isLoading: true, error: false, errorMsg: '',
            };
        }
        case ActionType.USER_PROFILE_SUCCESS:
            return {
                ...state, isLoading: false, isProfileUpdated: true, message: action.message, profileResponse: action.payload, errorMsg: '', error: false,
            }
        case ActionType.USER_PROFILE_FAILURE:
            return {
                ...state, isLoading: false, error: true, errorMsg: action.payload
            }

        //CHANGE PASSWORD
        case ActionType.CHANGE_PASSWORD: {
            return {
                ...state, isLoading: true, error: false, errorMsg: '',
            };
        }
        case ActionType.CHANGE_PASSWORD_SUCCESS:

            return {
                ...state, isLoading: false, message: action.message, isPasswordUpdated: true, changeResponse: action.payload, errorMsg: '', error: false,
            }
        case ActionType.CHANGE_PASSWORD_FAILURE:
            return {
                ...state, isLoading: false, error: true, errorMsg: action.payload
            }

        default:
            return state;
    }
}
