import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { Provider } from 'mobx-react';
import quizStore from './stores/quizStore';

ReactDOM.render(
  <Provider 
    quizStore={quizStore} 
  >
    <App />
  </Provider>
, document.getElementById('root'));
