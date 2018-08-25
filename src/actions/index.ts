import * as actions from './types';

export const loadResultsAction = (areaId: string) => (
  {
    type: actions.ACTION_LOAD_RESULTS,
    data: areaId
  }
);