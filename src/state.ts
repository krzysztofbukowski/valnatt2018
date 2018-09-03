import { AREA_LEVEL, Area } from './utils/map';

export default interface AppState {
  areaId: string;
  areaLevel: AREA_LEVEL;
  nextAreaLevel: AREA_LEVEL;
  lan: Area[];
  kommun: Area[];
  valkrets: Area[];
  valdistrikt: Area[];
  results: any;
  currentElections: any[];
  pastElections: any[];
}