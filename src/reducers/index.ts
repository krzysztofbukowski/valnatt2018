import AppState from '../state';
import { ACTIONS } from '../actions/types';
import { AnyAction, SetAreaAction, ReceiveDataAction, ResetSelectAction, SetMessageAction } from '../actions';
import * as MapUtils from '../utils/map';

export default (prevState: AppState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SET_AREA:
      const setAreaAction = action as SetAreaAction;
      const areaLevel = MapUtils.mapAreaToAreaLevel(setAreaAction.area) as MapUtils.AREA_LEVEL;

      return {
        ...prevState,
        area: setAreaAction.area,
        areaLevel,
        nextAreaLevel: MapUtils.mapAreaLevelToNextAreaLevel(areaLevel)
      };
    case ACTIONS.SET_MESSAGE:
      const setMessageAction = action as SetMessageAction;
      return {
        ...prevState,
        message: setMessageAction.message
      };
    case ACTIONS.RECEIVE_ELECTION_RESULTS:
      return prevState;
    case ACTIONS.RECEIVE_GEODATA:
      return prevState;
    case ACTIONS.RECEIVE_DATA_FOR_AREA:
      const receiveGeodataAction = action as ReceiveDataAction;
      const key = receiveGeodataAction.topojson.key;
      const geometries = receiveGeodataAction.topojson.objects[key].geometries;
      
      switch (action.areaLevel) {
        case MapUtils.AREA_LEVEL.NATIONAL:
          return {
            ...prevState,
            lan: withSort(MapUtils.mapTopojsonToAreas(geometries))
          };
        case MapUtils.AREA_LEVEL.LAN:
          return {
            ...prevState,
            kommun: withSort(MapUtils.mapTopojsonToAreas(geometries))
          };
        case MapUtils.AREA_LEVEL.KOMMUN:
          if (Object.keys(receiveGeodataAction.results.kommun_kretsar).length === 1) {
            return {
              ...prevState,
              valkrets: prevState.kommun.filter((area) => area.id === prevState.area),
              valdistrikt: withSort(MapUtils.mapTopojsonToAreas(geometries))
            };
          } else {
            return {
              ...prevState,
              valkrets: withSort(MapUtils.mapTopojsonToAreas(geometries))
            };
          }
        case MapUtils.AREA_LEVEL.VALKRETS:
          return {
            ...prevState,
            valdistrikt: withSort(MapUtils.mapTopojsonToAreas(geometries))
          };
        default:
          return prevState;
      }
    case ACTIONS.RESET_SELECT:
      const resetSelectAction = action as ResetSelectAction;
      let kommun = prevState.kommun;
      let valkrets = prevState.valkrets;
      let valdistrikt = prevState.valdistrikt;

      // fall throughs are intentional here - we want to reset all subsequent levels for a given level
      // lan -> kommun -> valkrets -> valdistrikt

      // tslint:disable:no-switch-case-fall-through
      switch (resetSelectAction.areaLevel) {
        case MapUtils.AREA_LEVEL.LAN:
          kommun = [];
        case MapUtils.AREA_LEVEL.KOMMUN:
          valkrets = [];
        case MapUtils.AREA_LEVEL.VALKRETS:
          valdistrikt = [];
        default:
          return { ...prevState, kommun, valdistrikt, valkrets };
      }
    default:
      return prevState;
  }
};

const withSort = (areas: MapUtils.Area[]) =>
  areas.sort((a: MapUtils.Area = {name: '', id: ''}, b: MapUtils.Area = {name: '', id: ''}) => {
    const aName = a.name.toLocaleLowerCase();
    const bName = b.name.toLocaleLowerCase();
    if (aName > bName) {
      return 1;
    }

    if (aName < bName) {
      return -1;
    }
    return 0;
  });