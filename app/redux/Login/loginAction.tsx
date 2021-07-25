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



