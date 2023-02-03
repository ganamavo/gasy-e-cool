import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import store from './store';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
