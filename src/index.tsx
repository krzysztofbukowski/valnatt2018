import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import App from './App';
import { Provider } from 'react-redux';
import appStore from './store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(
  <Provider store={appStore}>
    <ErrorBoundary fallbackUI={''}>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root') as HTMLElement
);