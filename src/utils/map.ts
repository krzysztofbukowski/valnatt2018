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

export const mapAreaToAreaLevel = (areaId: string) => {
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

export const mapAreaIdToMapResolution = (areaId: string) => {
  let level;
  if (areaId.length === 2) {
    level = 10;
  } else if (areaId.length > 2) {
    level = areaId === 'national' ? 100 : 1;
  }

  return level || 100;
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

export const mapTopojsonToAreas = (results: any): Area[] => results.map(
  (object: any) => ({
    name: object.properties.VD_NAMN 
      || object.properties.KVK_NAMN
      || object.properties.NAMN_KOM
      || object.properties.LAN_NAMN
      || object.properties.VDNAMN,
    id: object.properties.ID
  }));

export const mapElectionToTopojson = (election) => election.slice(0, -1);

export const decodeArea = (area: string): {[key: string]: string} => {
  let lan = null;
  let kommun = null;
  let valkrets = null;
  let valdistrikt = null;

  if (area.length <= 6 && area !== 'national') {
    lan = area.length >= 2 ? area.slice(0, 2) : null;
    kommun = area.length >= 4 ? area.slice(0, 4) : null;
    valkrets = area.length >= 6 ? area.slice(0, 6) : null;
    valdistrikt = null;
  } else {
    // cover valdistrikt case somehow
    valdistrikt = area;
  }

  return {
    lan,
    kommun,
    valkrets,
    valdistrikt
  };
};