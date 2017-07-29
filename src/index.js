import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import Layout from './src/Layout';
import { Provider } from 'mobx-react';
import fourQuizStore from './stores/fourQuizStore';
import lionQuizStore from './stores/lionQuizStore';
import nineQuizStore from './stores/nineQuizStore';
import randomQuizStore from './stores/randomQuizStore';

ReactDOM.render(
  <Provider 
    fourQuizStore={fourQuizStore} 
    lionQuizStore={lionQuizStore} 
    nineQuizStore={nineQuizStore} 
    randomQuizStore={randomQuizStore} 
  >
    <App />
  </Provider>
, document.getElementById('root'));
