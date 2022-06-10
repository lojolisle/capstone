import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

// initialise redux, bind redux store with App
import { Provider }  from 'react-redux'; // to provide store to app component
import store from './redux/store';

ReactDOM.render(
   // <React.StrictMode> -- throwing errors
      <Provider store={store}>
         <App />
      </Provider>,
   // </React.StrictMode>,
   document.getElementById('root'));
