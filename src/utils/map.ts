export enum AREA_LEVEL {
  NATIONAL = 'national',
  LAN = 'lan',
  KOMMUN = 'kommun',
  VALKRETS = 'valkrets',
  VALDISTRIKT = 'valdistrikt'
}

export interface Area {
  id: string;
  name: string;
}

export const mapAreaIdToAreaLevel = (areaId: string) => {
  if ('national' === areaId) {
    return 'national';
  }
  switch (areaId.length) {
    case 2: return AREA_LEVEL.LAN;
    case 4: return AREA_LEVEL.KOMMUN;
    case 6: return AREA_LEVEL.VALKRETS;
    default: return AREA_LEVEL.VALDISTRIKT;
  }
};

export const mapAreaLevelToNextAreaLevel = (areaLevel: AREA_LEVEL) => {
  switch (areaLevel) {
    case AREA_LEVEL.NATIONAL:
      return AREA_LEVEL.LAN;
    case AREA_LEVEL.LAN:
      return AREA_LEVEL.KOMMUN;
    case AREA_LEVEL.KOMMUN:
      return AREA_LEVEL.VALKRETS;
    default:
      return AREA_LEVEL.VALDISTRIKT;
  }
};

export const mapTopojsonToAreas = (results: any): Area[] => results.map((object: any) => ({
  name: object.properties.LAN_NAMN
    || object.properties.NAMN_KOM
    || object.properties.KVK_NAMN
    || object.properties.VD_NAMN,
  id: object.properties.ID
}));