import { ACTIONS } from './types';
import { AnyAction, Dispatch } from 'redux';
import { AREA_LEVEL } from '../utils/map';

export interface SetAreaAction extends AnyAction {
  areaId: string;
}

export interface ReceiveElectionResultsAction extends AnyAction {
  results: any;
}

export interface ReceiveGeodataAction extends AnyAction {
  topojson: any;
}

export interface ResetSelectAction extends AnyAction {
  areaLevel: AREA_LEVEL;
}

export type ReceiveDataAction = ReceiveElectionResultsAction & ReceiveGeodataAction;

export const setAreaId = (areaId: string): SetAreaAction => (
  {
    type: ACTIONS.SET_AREA_ID,
    areaId
  }
);

export const requestElectionResults = (areaId: string) => ({
  type: ACTIONS.REQUEST_ELECTION_RESULTS,
  areaId
});

export const receiveElectionResults = (results: any): ReceiveElectionResultsAction => (
  {
    type: ACTIONS.RECEIVE_ELECTION_RESULTS,
    results
  }
);

export const loadElectionResults = (areaId: string) =>
  (dispatch: Dispatch) => {
    dispatch(requestElectionResults(areaId));

    return fetch(`http://localhost:5000/api/election/val2014R/${areaId}?slutresultat_r`)
      .then((res: Response) => res.json())
      .then((data: any) => {
        dispatch(receiveElectionResults(data));
        return data;
      }).catch(e => console.log(e));
  };

export const loadGeoData = (areaId: string) =>
  (dispatch) => {
    dispatch(requestGeoData(areaId));

    let level = 100;
    if (areaId.length === 2) {
      level = 10;
    } else if (areaId.length > 2) {
      level = areaId === 'national' ? 100 : 1;
    }

    return fetch(`http://localhost:5000/api/topojson/val2014/${areaId}/${level}`)
      .then((res: Response) => res.json())
      .then((data: any) => {
        dispatch(receiveGeoData(data));
        return data;
      }).catch(e => console.log(e));
  };

const requestGeoData = (areaId: string) => ({
  type: ACTIONS.REQUEST_GEODATA,
  areaId
});

export const receiveGeoData = (topojson) => (
  {
    type: ACTIONS.RECEIVE_GEODATA,
    topojson
  }
);

export const loadDataForArea = (areaId: string) => 
  (dispatch) => Promise.all([
    dispatch(loadElectionResults(areaId)),
    dispatch(loadGeoData(areaId))
  ]).then(
    values => {
      dispatch(receiveDataForArea(values[0], values[1]));
    }
  );

export const receiveDataForArea = (results: any, topojson: any) => ({
  type: ACTIONS.RECEIVE_DATA_FOR_AREA,
  results,
  topojson
});

export const resetSelect = (areaLevel: AREA_LEVEL) => ({
  type: ACTIONS.RESET_SELECT,
  areaLevel
});

export type AnyAction = SetAreaAction
  | ReceiveElectionResultsAction
  | ReceiveGeodataAction
  | ReceiveDataAction
  | ResetSelectAction;