import AppState, { AREA_LEVEL } from '../state';
import { ACTIONS } from '../actions/types';
import { AnyAction, SetAreaAction, ReceiveElectionResults } from '../actions';

export default (prevState: AppState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SET_AREA_ID:
      return { ...prevState, areaId: (action as SetAreaAction).areaId };
    case ACTIONS.RECEIVE_ELECTION_RESULTS:
      const results = (action as ReceiveElectionResults).results;

      if (results.hasOwnProperty('alla_lan')) {
        return {
          ...prevState,
          lan: mapElectionResultsToAreas(results, 'alla_lan'),
        };
      }
    default:
      return prevState;
  }
};

const mapElectionResultsToAreas = (results: any, keyName: string) =>
  Object.keys(results[keyName]).map((key: string) => ({
    name: results[keyName][key].NAMN,
    id: results[keyName][key].ID
  }));