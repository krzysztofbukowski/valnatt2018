import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppState from './state';
import valnattAppReducers from './reducers';
import { AREA_LEVEL } from './utils/map';

const initialState: AppState = {
  areaId: 'national',
  areaLevel: AREA_LEVEL.NATIONAL,
  nextAreaLevel: AREA_LEVEL.LAN,
  lan: [],
  kommun: [],
  valkrets: [],
  valdistrikt: [],
  results: undefined,
  currentElections: [
    {
      id: 'election_val2018R',
      name: 'Riksdagsval 2018'
    },
    {
      id: 'election_val2018K',
      name: 'Landstingsval 2018'
    },
    {
      id: 'election_val2018L',
      name: 'Kommunalval 2018'
    }
  ],
  pastElections: [
    {
      id: 'election_val2014R',
      name: 'Riksdagsval 2014'
    },
    {
      id: 'election_val2014K',
      name: 'Landstingsval 2014'
    },
    {
      id: 'election_val2014L',
      name: 'Kommunalval 2014'
    }
  ]
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

export default store;