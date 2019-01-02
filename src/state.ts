import { AREA_LEVEL, Area } from './utils/map';

export interface MessageState {
  isError: boolean;
  content: string;
}

export default interface AppState {
  area: string;
  areaLevel: AREA_LEVEL;
  nextAreaLevel: AREA_LEVEL;
  kommun: Area[];
  lan: Area[];
  message: MessageState;
  valkrets: Area[];
  valdistrikt: Area[];
  results: any;
  currentElections: any[];
  pastElections: any[];
  election: string;
}