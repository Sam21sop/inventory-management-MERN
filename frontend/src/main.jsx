import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// redux application level configuration
import { Provider } from "react-redux";
import store from './redux/store.jsx';

// toastconatiner for notification
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

// document root created by using react (virtual DOM)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
)
