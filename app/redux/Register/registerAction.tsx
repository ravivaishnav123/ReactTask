import {registerState, PostData, UserType} from './registerType';
import * as Action from '../actionTypes/index';
import NetInfo from '@react-native-community/netinfo';
import {Keyboard} from 'react-native';

import {getData} from '../../services/index';
import * as Constants from '../../components/utils/constants';
import {
  takeLatest,
  put,
} from 'redux-saga/effects';

export function setRegisterValues(newSession: registerState) {
  return {
    type: Action.USER_REGISTER_VALUE,
    payload: newSession,
  };
}

export function setEmpty() {
  return {
    type: Action.USER_REGISTER_EMPTY,
  };
}

function* fetchData(action) {
  Keyboard.dismiss();
  try {
    const state = yield NetInfo.fetch();
    if (state.isConnected) {
      const response = yield getData(Constants.ApiMethods.currencyConvert);
      console.log('aa', response, action);
      if (response !== undefined) {
        if (response.status === true) {
          yield put(userRegisterSucess(response.data, response.message));
        } else {
          yield put(userRegisterFailure(response.message));
        }
      } else {
        yield put(userRegisterFailure(Constants.Messages.server_error));
      }
    } else {
      yield put(userRegisterFailure(Constants.Messages.server_error));
    }
  } catch (e) {
    yield put(userRegisterFailure(Constants.Messages.server_error));
  }
}

export function* userRegister() {
  yield takeLatest(Action.USER_REGISTER, fetchData);
}

export function userRegisterAction(data) {
  return {
    type: Action.USER_REGISTER,
    payload: data,
  };
}

function userRegisterSucess(data: {}, msg: string) {
  return {
    type: Action.USER_REGISTER_SUCCESS,
    payload: data,
    message: msg,
  };
}

function userRegisterFailure(err: string) {
  return {
    type: Action.USER_REGISTER_FAILURE,
    error: err,
  };
}
