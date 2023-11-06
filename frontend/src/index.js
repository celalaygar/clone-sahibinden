import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//import './bootstrap-override.scss';
import './components/FontawesomeIcons/FontawesomeIcons';
import './assets/css/checkbox.css';
import './assets/css/co-detail.css';
import './assets/css/general-button.css';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/dist/jquery.slim.js';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import { store } from './redux/redux-toolkit/ReduxStore';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";


//const store = configureStore();

createRoot(document.getElementById('root')).render(<Provider store={store}>
  <App />
</Provider>)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
