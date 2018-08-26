import { applyMiddleware, createStore } from 'redux';
import AppState from './state';
import valnattAppReducers from './reducers';
import logger from 'redux-logger';

const initialState: AppState = {
  areaId: 'national'
};

const store = createStore(valnattAppReducers, initialState, applyMiddleware(logger));

export default store;