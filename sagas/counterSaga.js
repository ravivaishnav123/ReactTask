// Imports: Dependencies
import {Alert, YellowBox} from 'react-native';
import {
  delay,
  takeEvery,
  takeLatest,
  put,
  takeLeading,
  takeMaybe,
} from 'redux-saga/effects';

function* fetchDetails() {
  // yield delay(4000);
  const json = yield fetch(
    'https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&location=42.3675294,-71.186966&radius=10000&key=AIzaSyA9lxOyGt2KVrR3BLRRw4E_LbMbjc8WGCc',
  ).then((response) => response.json());
  console.log(json);
  yield put({type: 'LOCATION_GET', loading: true, json: json});
}
// function* actionWatcher() {
//   yield takeLatest('GET_NEWS', fetchDetails);
// }
// Increase Counter Async
function* increaseCounterAsync() {
  try {
    // Delay 4 Seconds
    yield delay(4000);

    // Dispatch Action To Redux Store
    yield put({
      type: 'INCREASE_COUNTER_ASYN',
      value: 1,
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}

export function* wactherGet() {
  yield takeLatest('GET_LOCATION', fetchDetails);
}
// Generator: Watch Increase Counter
export function* watchIncreaseCounter() {
  // // Take Every Action
  //yield takeEvery('INCREASE_COUNTER', increaseCounterAsync);

  // Take Last Action

  yield takeLatest('INCREASE_COUNTER', increaseCounterAsync);
}

// Decrease Counter Async
function* decreaseCounter() {
  try {
    // Delay 4 Seconds
    // yield delay(4000);
    //Alert.alert('de');
    // Dispatch Action To Redux Store
    yield put({
      type: 'DECREASE_COUNTER_ASYNC',
      value: 1,
    });
  } catch (error) {
    console.log(error);
  }
}

// Generator: Watch decrease Counter
export function* watchDecreaseCounter() {
  // // Take Every Action
  // yield takeEvery('DECREASE_COUNTER', decreaseCounter);

  // Take Last Action
  yield takeLatest('DECREASE_COUNTER', decreaseCounter);
}
