import AppState from '../state';
import { AnyAction } from 'redux';
import { LOAD_RESULTS } from '../actions/types';

export default (prevState: AppState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_RESULTS:
      return {...prevState, areaId: action.data as string};
    default:
      return prevState;
  }
};