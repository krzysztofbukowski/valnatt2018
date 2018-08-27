export enum AREA_LEVEL {
  'national',
  'lan',
  'kommun',
  'valkrets'
}

export default interface AppState {
  areaId: string;
  areaLevel: AREA_LEVEL;
  lan: any[];
  results: any;
}