// Imports: Dependencies
import {createStore, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// Imports: Redux Root Reducer
import rootReducer from './reducer/index';

// Imports: Redux Root Saga
import {rootSaga} from './sagas/index';

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware,
    //createLogger(),
  ),
);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export {store};





// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from './reducer/index';

// // import { systemReducer } from "./system/reducers";
// // import { chatReducer } from "./chat/reducers";


// // const rootReducer = combineReducers({
// //   system: systemReducer,
// //   chat: chatReducer
// // });

// export type AppState = ReturnType<typeof rootReducer>;

// export default function configureStore() {
//   const middlewares = [thunkMiddleware];
//   const middleWareEnhancer = applyMiddleware(...middlewares);

//   const store = createStore(
//     rootReducer,
//     composeWithDevTools(middleWareEnhancer)
//   );

//   return store;
// }
