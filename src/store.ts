import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import ReduxQuerySync from 'redux-query-sync';
import AppState from './state';
import valnattAppReducers from './reducers';
import { AREA_LEVEL } from './utils/map';
import { setArea } from './actions';

const initialState: AppState = {
  area: 'national',
  areaLevel: AREA_LEVEL.NATIONAL,
  nextAreaLevel: AREA_LEVEL.LAN,
  message: null,
  lan: [],
  kommun: [],
  valkrets: [],
  valdistrikt: [],
  results: null,
  election: 'val2018R',
  currentElections: [
    {
      id: 'val2018R',
      name: 'Riksdagsval 2018'
    },
    {
      id: 'val2018K',
      name: 'Landstingsval 2018'
    },
    {
      id: 'val2018L',
      name: 'Kommunalval 2018'
    }
  ],
  pastElections: [
    {
      id: 'val2014R',
      name: 'Riksdagsval 2014'
    },
    {
      id: 'val2014K',
      name: 'Landstingsval 2014'
    },
    {
      id: 'val2014L',
      name: 'Kommunalval 2014'
    }
  ],
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
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
);
const store = createStore(valnattAppReducers, initialState, enhancer);

ReduxQuerySync({
  store,
  params: {
    area: {
      selector: state => state.area,
      action: value => setArea(value),
      defaultValue: initialState.area,
      stringToValue: value => value || initialState.area
    }
  },
  // Initially set the store's state to the current location.
  initialTruth: 'location',
  replaceState: true
});

export default store;