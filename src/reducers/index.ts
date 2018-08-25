import AppState from '../state';
import { AnyAction } from 'redux';
import { ACTION_LOAD_RESULTS } from '../actions/types';

export default (prevState: AppState, action: AnyAction) => {
  switch (action.type) {
    case ACTION_LOAD_RESULTS:
      return {...prevState, areaId: action.data as string};
    default:
      return prevState;
  }
};