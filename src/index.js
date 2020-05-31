import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Common/Header';
import HomePage from './containers/HomePage';
import Benefit from './components/Common/Benefit';
import Footer from './components/Common/Footer/Footer';


import NotFound from './containers/NotFound';
import ProductPage from './containers/ProductPage';
import SinglePage from './containers/SinglePage';
import CartPage from './containers/CartPage';
import ContactPage from './containers/ContactPage';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
