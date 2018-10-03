import { ACTIONS } from './types';
import { AnyAction, Dispatch } from 'redux';
import { AREA_LEVEL, mapAreaIdToMapResolution } from '../utils/map';
import { MessageState } from '../state';

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

export interface SetMessageAction extends AnyAction {
  message: MessageState;
}

export type ReceiveDataAction = ReceiveElectionResultsAction & ReceiveGeodataAction;

export const setAreaId = (areaId: string): SetAreaAction => (
  {
    type: ACTIONS.SET_AREA_ID,
    areaId
  }
);

export const setMessage = (message: MessageState): SetMessageAction => (
  {
    type: ACTIONS.SET_MESSAGE,
    message
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
  (dispatch: Dispatch): Promise<{}> => {
    dispatch(requestElectionResults(areaId));

    return fetch(`http://localhost:4000/api/election/val2018R/${areaId}?slutresultat_r`)
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('No response');
        }

        return res.json();
      })
      .then((data: {}) => {
        dispatch(receiveElectionResults(data));
        return data;
      });
  };

export const loadGeoData = (areaId: string) =>
  (dispatch) => {
    dispatch(requestGeoData(areaId));

    const level = mapAreaIdToMapResolution(areaId);

    return fetch(`http://localhost:4000/api/topojson/val2018/${areaId}/${level}`)
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('No response');
        }

        return res.json();
      })
      .then((data: {}) => {
        dispatch(receiveGeoData(data));
        return data;
      });
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
  ]).then(values => dispatch(receiveDataForArea(values[0], values[1]))).catch((e) => {
    dispatch(setMessage({ isError: true, content: `Error loading data for ${areaId}` }));
  });

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
  | SetMessageAction
  | ReceiveElectionResultsAction
  | ReceiveGeodataAction
  | ReceiveDataAction
  | ResetSelectAction;