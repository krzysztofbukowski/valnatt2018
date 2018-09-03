import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import App from './App';
import { Provider } from 'react-redux';
import appStore from './store';

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);