import { ACTIONS } from './types';
import { AnyAction, Dispatch } from 'redux';

export interface SetAreaAction extends AnyAction {
  areaId: string;
}

export interface ReceiveElectionResults extends AnyAction {
  results: any;
}

export const setAreaId = (areaId: string): SetAreaAction => (
  {
    type: ACTIONS.SET_AREA_ID,
    areaId
  }
);

const requestElectionResults = (areaId: string) => ({
  type: ACTIONS.REQUEST_ELECTION_RESULTS,
  areaId
});

export const receiveElectionResults = (results: any): ReceiveElectionResults => (
  {
    type: ACTIONS.RECEIVE_ELECTION_RESULTS,
    results
  }
);

export const loadElectionResultsAction = (areaId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestElectionResults(areaId));
    
    return fetch(`http://localhost:5000/api/election/val2014R/${areaId}?slutresultat_r`)
      .then((res: Response) => res.json())
      .then((data: any) => {
        dispatch(receiveElectionResults(data));
      }).catch(e => console.log(e));
  }
};

export type AnyAction = SetAreaAction | ReceiveElectionResults;