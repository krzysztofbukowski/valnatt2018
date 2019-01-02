import { 
  mapAreaToAreaLevel, 
  AREA_LEVEL, 
  mapAreaIdToMapResolution, 
  mapAreaLevelToNextAreaLevel, 
  mapElectionToTopojson,
  mapTopojsonToAreas } from './map';

describe('map', () => {
  describe('mapAreaIdToAreaLevel', () => {
    it('should return national for area national', () => {
      const result = mapAreaToAreaLevel('national');
      expect(result).toBe(AREA_LEVEL.NATIONAL);
    });

    it('should return lan for area ids 2 chars long', () => {
      const result = mapAreaToAreaLevel('10');
      expect(result).toBe(AREA_LEVEL.LAN);
    });

    it('should return kommun for area ids 4 chars long', () => {
      const result = mapAreaToAreaLevel('1010');
      expect(result).toBe(AREA_LEVEL.KOMMUN);
    });

    it('should return valkrets for area ids 6 chars long', () => {
      const result = mapAreaToAreaLevel('101010');
      expect(result).toBe(AREA_LEVEL.VALKRETS);
    });

    it('should return valdistrikt for other areas', () => {
      const result = mapAreaToAreaLevel('10101010');
      expect(result).toBe(AREA_LEVEL.VALDISTRIKT);
    });    
  });

  describe('mapAreaIdToMapResolution', () => {
    it('should return 10 for area ids 2 chars long', () => {
      const result = mapAreaIdToMapResolution('10');
      expect(result).toBe(10);
    });

    it('should return 1 for other areas', () => {
      let result = mapAreaIdToMapResolution('1010');
      expect(result).toBe(1);

      result = mapAreaIdToMapResolution('101010');
      expect(result).toBe(1);

      result = mapAreaIdToMapResolution('10101010');
      expect(result).toBe(1);      
    });

    it('should return 100 for area national', () => {
      const result = mapAreaIdToMapResolution('national');
      expect(result).toBe(100);
    });    
  });

  describe('mapAreaLevelToNextAreaLevel', () => {
    it('should return lan for national', () => {
      const result = mapAreaLevelToNextAreaLevel(AREA_LEVEL.NATIONAL);
      expect(result).toBe(AREA_LEVEL.LAN);
    });

    it('should return kommun for lan', () => {
      const result = mapAreaLevelToNextAreaLevel(AREA_LEVEL.LAN);
      expect(result).toBe(AREA_LEVEL.KOMMUN);
    });

    it('should return valkrets for kommun', () => {
      const result = mapAreaLevelToNextAreaLevel(AREA_LEVEL.KOMMUN);
      expect(result).toBe(AREA_LEVEL.VALKRETS);
    });

    it('should return valdistrikt for valkrets', () => {
      const result = mapAreaLevelToNextAreaLevel(AREA_LEVEL.VALKRETS);
      expect(result).toBe(AREA_LEVEL.VALDISTRIKT);
    });
  });

  describe('mapElectionToTopojson', () => {
    it('should return correct name', () => {
      const data = {
        'val2018R': 'val2018',
        'val2018K': 'val2018',
        'val2018L': 'val2018',

        'val2014R': 'val2014',
        'val2014K': 'val2014',
        'val2014L': 'val2014',

        'ep2014E': 'ep2014'
      };

      Object.entries(data).map((entry: [string, string]) => {
        const result = mapElectionToTopojson(entry[0]);
        expect(result).toBe(entry[1]);
      });
    });
  });

  describe(`${mapTopojsonToAreas.name}`, () => {
    const properties = [
      'VD_NAMN',
      'KVK_NAMN',
      'NAMN_KOM',
      'LAN_NAMN',
      'VDNAMN',
    ].forEach((name: string) => {
      it(`should return array of objects for ${name}`, () => {
        const result = mapTopojsonToAreas([{
          properties: {
            [name]: 'test',
            ID: '10'
          }
        }]);
  
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(1);
  
        expect(result[0]).toEqual({
          name: 'test',
          id: '10'
        });
      });
    });
  });
});