import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { Provider } from 'mobx-react';
import fourQuizStore from './stores/quizStore';

ReactDOM.render(
  <Provider 
    fourQuizStore={fourQuizStore} 
  >
    <App />
  </Provider>
, document.getElementById('root'));
