// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';
//import {} from '../Register/registerAction';
// Imports: Redux Sagas
import {userRegister} from '../Register/registerAction';
import {userLogin} from '../Login/loginAction';
import { forgotPassword } from '../ForgotPassword/forgotPasswordAction';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(userRegister), fork(userLogin),fork(forgotPassword)]);
}
