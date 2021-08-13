import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode'
import './index.css';
import App from './Component/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store/index'
import * as Types from '../src/store/actions/types';
import authToken from './util/authToken';

const token =localStorage.getItem('Auth_token')
if (token) {
  let decoded = jwtDecode(token)
  authToken(token)
  store.dispatch({
    type:Types.SET_USERS,
    payload:{
      user:decoded
    }
  })
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
