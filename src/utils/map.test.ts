import { mapAreaIdToAreaLevel, AREA_LEVEL, mapAreaIdToMapResolution, mapAreaLevelToNextAreaLevel } from './map';

describe('map', () => {
  describe('mapAreaIdToAreaLevel', () => {
    it('should return national for area national', () => {
      const result = mapAreaIdToAreaLevel('national');
      expect(result).toBe(AREA_LEVEL.NATIONAL);
    });

    it('should return lan for area ids 2 chars long', () => {
      const result = mapAreaIdToAreaLevel('10');
      expect(result).toBe(AREA_LEVEL.LAN);
    });

    it('should return kommun for area ids 4 chars long', () => {
      const result = mapAreaIdToAreaLevel('1010');
      expect(result).toBe(AREA_LEVEL.KOMMUN);
    });

    it('should return valkrets for area ids 6 chars long', () => {
      const result = mapAreaIdToAreaLevel('101010');
      expect(result).toBe(AREA_LEVEL.VALKRETS);
    });

    it('should return valdistrikt for other areas', () => {
      const result = mapAreaIdToAreaLevel('10101010');
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
});