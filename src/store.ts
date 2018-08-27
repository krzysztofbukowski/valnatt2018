import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppState, {AREA_LEVEL} from './state';
import valnattAppReducers from './reducers';
import logger from 'redux-logger';

const initialState: AppState = {
  areaId: 'national',
  areaLevel: AREA_LEVEL.national,
  lan: [],
  results: undefined
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(logger, thunkMiddleware),
  // other store enhancers if any
);
const store = createStore(valnattAppReducers, initialState, enhancer);

// const store = createStore(valnattAppReducers, initialState, 
//   applyMiddleware(

//   ));

export default store;