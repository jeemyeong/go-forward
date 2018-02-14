import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import quizStore from './stores/quizStore';
import './css/animate.css';
import './css/bootstrap.min.css';
import './css/layout.css';

ReactDOM.render(
  <Provider
    quizStore={quizStore}
    >
    <App />
  </Provider>
, document.getElementById('root'));
