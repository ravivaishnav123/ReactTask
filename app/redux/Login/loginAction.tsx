import { loginState, PostData,routerState } from "./loginType";
import * as Action from '../actionTypes/index'
import NetInfo from "@react-native-community/netinfo";
import { Keyboard } from 'react-native';
import { getData, postData } from '../../services/index';
import * as Constants from '../../components/utils/constants'
import {
  takeLatest,
  put,
} from 'redux-saga/effects';

export function setLoginValues(newSession: loginState) {
  return {
    type: Action.USER_LOGIN_VALUE,
    payload: newSession
  };
}
export function setRouterValues(newValue: routerState) {
  console.log("Val",newValue)
  return {
    type: Action.SET_ROUTER,
    payload: newValue,
  }
}

function* fetchUserLogin(action) {
  Keyboard.dismiss();
  try {
    const state = yield NetInfo.fetch();
    if (state.isConnected) {
      const response = yield getData(Constants.ApiMethods.currencyConvert);
      console.log('aa', response, action);
      if (response !== undefined) {
        if (response.status === true) {
          yield put(userLoginSucess(response.data));
        } else {
          yield put(userLoginFailure(response.message));
        }
      } else {
        yield put(userLoginFailure(Constants.Messages.server_error));
      }
    } else {
      yield put(userLoginFailure(Constants.Messages.server_error));
    }
  } catch (e) {
    yield put(userLoginFailure(Constants.Messages.server_error));
  }
}

export function* userLogin() {
  yield takeLatest(Action.USER_LOGIN, fetchUserLogin);
}


export function userLoginAction(data) {
  return {
    type: Action.USER_LOGIN,
    payload: data,
  }
}

function userLoginSucess(data: {}) {
  return {
    type: Action.USER_LOGIN_SUCCESS,
    payload: data
  }
}

function userLoginFailure(err: string) {
  return {
    type: Action.USER_LOGIN_FAILURE,
    error: err
  }
}


