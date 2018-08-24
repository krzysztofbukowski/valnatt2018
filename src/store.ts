import { createStore } from 'redux';
import AppState from './state';
import valnattAppReducers from './reducers';

const initialState: AppState = {

};

const store = createStore(valnattAppReducers, initialState);

export default store;