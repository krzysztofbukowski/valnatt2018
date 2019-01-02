import { ACTIONS } from './types';
import { AnyAction, Dispatch } from 'redux';
import { AREA_LEVEL, mapAreaIdToMapResolution, mapElectionToTopojson, mapAreaToAreaLevel } from '../utils/map';
import { MessageState } from '../state';

export interface SetAreaAction extends AnyAction {
  area: string;
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

export const setArea = (area: string): SetAreaAction => (
  {
    type: ACTIONS.SET_AREA,
    area
  }
);

export const setMessage = (message: MessageState): SetMessageAction => (
  {
    type: ACTIONS.SET_MESSAGE,
    message
  }
);

export const requestElectionResults = (area: string) => ({
  type: ACTIONS.REQUEST_ELECTION_RESULTS,
  area
});

export const receiveElectionResults = (results: any): ReceiveElectionResultsAction => (
  {
    type: ACTIONS.RECEIVE_ELECTION_RESULTS,
    results
  }
);

export const loadElectionResults = (area: string, election: string) =>
  (dispatch: Dispatch): Promise<{}> => {
    dispatch(requestElectionResults(area));

    return fetch(`//valnattapi.aftonbladet.se/api/election/${election}/${area}?slutresultat_r`)
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

export const loadGeoData = (area: string, election: string) =>
  (dispatch) => {
    dispatch(requestGeoData(area));

    const level = mapAreaIdToMapResolution(area);
    election = mapElectionToTopojson(election);

    return fetch(`//valnattapi.aftonbladet.se/api/topojson/${election}/${area}/${level}`)
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

const requestGeoData = (area: string) => ({
  type: ACTIONS.REQUEST_GEODATA,
  area
});

export const receiveGeoData = (topojson) => (
  {
    type: ACTIONS.RECEIVE_GEODATA,
    topojson
  }
);

export const loadDataForArea = (area: string, election: string) =>
  (dispatch) => Promise.all([
    dispatch(loadElectionResults(area, election)),
    dispatch(loadGeoData(area, election))
  ])
  .then(values => dispatch(receiveDataForArea(values[0], values[1], mapAreaToAreaLevel(area) as AREA_LEVEL)))
  .catch((e) => {
    console.log(e);
    dispatch(setMessage({ isError: true, content: `Error loading data for ${area}` }));
  });

export const receiveDataForArea = (results: any, topojson: any, areaLevel: AREA_LEVEL) => ({
  type: ACTIONS.RECEIVE_DATA_FOR_AREA,
  results,
  topojson,
  areaLevel
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