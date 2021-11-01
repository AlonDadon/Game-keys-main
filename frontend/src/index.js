import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './assets/styles/main.scss'
import { store } from './store/store'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


serviceWorkerRegistration.unregister();

reportWebVitals();
