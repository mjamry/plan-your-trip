import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './root/App';
import * as serviceWorker from './serviceWorker';
import ErrorBoundary from './root/ErrorBoundary';

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
