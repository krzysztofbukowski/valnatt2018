import * as actions from './types';

export const loadResultsAction = (areaId: string) => (
  {
    type: actions.LOAD_RESULTS,
    data: areaId
  }
);