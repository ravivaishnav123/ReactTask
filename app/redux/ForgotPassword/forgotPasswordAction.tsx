import {forgotPasswordState, PostData} from './forgotPasswordType';
import * as Action from '../actionTypes/index';
import NetInfo from '@react-native-community/netinfo';
import {Keyboard} from 'react-native';
import {postData} from '../../services/index';
import * as Constants from '../../components/utils/constants';
import {takeLatest, put} from 'redux-saga/effects';
export function setForgotPasswordValues(newSession: forgotPasswordState) {
  return {
    type: Action.USER_FORGOT_EMAIL,
    payload: newSession,
  };
}

export function setForgotPasswordEmpty() {
  return {
    type: Action.SET_FORGOT_EMPTY,
  };
}

function* postForgotPasswordData(action) {
  Keyboard.dismiss();
  try {
    const state = yield NetInfo.fetch();
    if (state.isConnected) {
      const response = yield postData(
        Constants.ApiMethods.currencyConvert,
        action.param,
      );
      console.log('aa', response, action);
      if (response !== undefined) {
        if (response.status === true) {
          yield put(forgotPasswordSucess(response.data, response.message));
        } else {
          yield put(forgotPasswordFailure(response.message));
        }
      } else {
        yield put(forgotPasswordFailure(Constants.Messages.server_error));
      }
    } else {
      yield put(forgotPasswordFailure(Constants.Messages.server_error));
    }
  } catch (e) {
    yield put(forgotPasswordFailure(Constants.Messages.server_error));
  }
}

export function* forgotPassword() {
  yield takeLatest(Action.USER_FORGOT, postForgotPasswordData);
}

export function forgotPasswordAction(data) {
  return {
    type: Action.USER_FORGOT,
    param: data,
  };
}

function forgotPasswordSucess(data: {}, msg: string) {
  return {
    type: Action.USER_FORGOT_SUCCESS,
    payload: data,
    message: msg,
  };
}

function forgotPasswordFailure(err: string) {
  return {
    type: Action.USER_FORGOT_FAILURE,
    error: err,
  };
}
