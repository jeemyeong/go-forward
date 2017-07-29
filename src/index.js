import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import Layout from './src/Layout';
import { Provider } from 'mobx-react';
import quizStore from './src/stores/quizStore';

ReactDOM.render(
  <Provider
    quizStore={quizStore}
  >
    <div>
        <Layout />

    </div>
  </Provider>
, document.getElementById('root'));
