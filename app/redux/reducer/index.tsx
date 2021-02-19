import { combineReducers } from 'redux';
import loginReducer from '../Login/loginReducer';
import registerReducer from '../Register/registerReducer';
import routerReducer from '../Login/routerReducer';
import settingReducer from '../Setting/settingReducer';
import forgotPasswordReducer from '../ForgotPassword/forgotPasswordReducer';
export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    router: routerReducer,
    setting: settingReducer,
    forgotPassword: forgotPasswordReducer
});