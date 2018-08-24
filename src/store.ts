import { createStore } from 'redux';
import AppState from './state';
import valnattAppReducers from './reducers';

const initialState: AppState = {
  areaId: 'national'
};

const store = createStore(valnattAppReducers, initialState);

export default store;