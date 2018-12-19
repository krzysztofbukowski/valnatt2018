import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import App from './App';
import { Provider } from 'react-redux';
import appStore from './store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

ReactDOM.render(
  <Provider store={appStore}>
    <ErrorBoundary fallbackUI={<ErrorHandler/>}>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root') as HTMLElement
);