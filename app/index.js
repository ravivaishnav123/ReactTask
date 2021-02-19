// Imports: Dependencies
import React from 'react';
import {Provider} from 'react-redux';

// Imports: Screens
import App from './app.container';
// Imports: Redux Store
import {store} from './redux/store';

// React Native App
export default function ReactNaiveTemplate() {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <App />
    </Provider>
  );
}
