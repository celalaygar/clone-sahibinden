import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//import './bootstrap-override.scss';
import configureStore from './redux/configureStore';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import './components/FontawesomeIcons/FontawesomeIcons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/checkbox.css';
import './assets/css/co-detail.css';
import './assets/css/general-button.css';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore(); 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();