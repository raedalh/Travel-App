// Fetch location data from your server's API (proxying Geonames)
export const fetchLocationData = async (city) => {
  const response = await fetch(`/fetch-location?city=${city}`);
  const data = await response.json();
  return data.geonames[0];
};

// Fetch weather data from your server's API (proxying Weatherbit)
export const fetchWeatherData = async (lat, lon, date) => {
  const response = await fetch(`/fetch-weather?lat=${lat}&lon=${lon}&date=${date}`);
  const data = await response.json();
  return data.data[0];
};

// Fetch image from your server's API (proxying Pixabay)
export const fetchImage = async (city) => {
  const response = await fetch(`/fetch-image?city=${city}`);
  const data = await response.json();
  return data.hits[0]?.webformatURL || 'https://via.placeholder.com/600x400';
};

// Fetch country image from your server's API (proxying Pixabay)
export const fetchCountryImage = async (country) => {
  const response = await fetch(`/fetch-image?q=${country}`);
  const data = await response.json();
  return data.hits[0]?.webformatURL || 'https://via.placeholder.com/600x400';
};

// Fetch country data from your server's API (proxying REST Countries)
export const fetchCountryData = async (countryCode) => {
  const response = await fetch(`/fetch-country?code=${countryCode}`);
  const data = await response.json();
  return data[0];
};