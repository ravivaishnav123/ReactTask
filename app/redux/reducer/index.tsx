import { combineReducers } from 'redux';
import loginReducer from '../Login/loginReducer';
import routerReducer from '../Login/routerReducer';
export default combineReducers({
    login: loginReducer,
    router: routerReducer,
});