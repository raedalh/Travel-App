import {
    fetchLocationData,
    fetchWeatherData,
    fetchImage,
    fetchCountryImage,
    fetchCountryData,
  } from '../fetchData';
  
  describe('fetchData', () => {
    beforeEach(() => {
      // Mock the global fetch function
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
        })
      );
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('fetchLocationData should fetch location data', async () => {
      const mockData = { geonames: [{ name: 'Paris', lat: 48.8566, lng: 2.3522 }] };
      fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });
  
      const location = await fetchLocationData('Paris');
      expect(location).toEqual(mockData.geonames[0]);
      expect(fetch).toHaveBeenCalledWith('/fetch-location?city=Paris');
    });
  
    it('fetchWeatherData should fetch weather data', async () => {
      const mockData = { data: [{ temp: 15, weather: { description: 'Cloudy' } }] };
      fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });
  
      const weather = await fetchWeatherData(48.8566, 2.3522, '2023-12-25');
      expect(weather).toEqual(mockData.data[0]);
      expect(fetch).toHaveBeenCalledWith('/fetch-weather?lat=48.8566&lon=2.3522&date=2023-12-25');
    });
  
    it('fetchImage should fetch an image URL', async () => {
      const mockData = { hits: [{ webformatURL: 'https://example.com/image.jpg' }] };
      fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });
  
      const image = await fetchImage('Paris');
      expect(image).toBe('https://example.com/image.jpg');
      expect(fetch).toHaveBeenCalledWith('/fetch-image?city=Paris');
    });
  
    it('fetchCountryImage should fetch a country image URL', async () => {
      const mockData = { hits: [{ webformatURL: 'https://example.com/country.jpg' }] };
      fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });
  
      const image = await fetchCountryImage('France');
      expect(image).toBe('https://example.com/country.jpg');
      expect(fetch).toHaveBeenCalledWith('/fetch-image?q=France');
    });
  
    it('fetchCountryData should fetch country data', async () => {
      const mockData = [{ name: { common: 'France' }, flags: { png: 'https://example.com/flag.png' } }];
      fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });
  
      const countryData = await fetchCountryData('FR');
      expect(countryData).toEqual(mockData[0]);
      expect(fetch).toHaveBeenCalledWith('/fetch-country?code=FR');
    });
  });