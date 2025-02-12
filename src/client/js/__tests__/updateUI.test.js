import { updateUI, clearUI } from '../updateUI';

describe('updateUI', () => {
  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
      <div id="weather"></div>
      <div id="countdown"></div>
      <div id="trip-duration"></div>
      <div id="city-name"></div>
      <div id="country-name"></div>
      <div id="population"></div>
      <div id="country-flag"></div>
      <img id="image" />
    `;
  });

  it('updateUI should update the DOM with trip details', () => {
    const weather = { temp: 15, weather: { description: 'Cloudy' } };
    const image = 'https://example.com/image.jpg';
    const countdown = 10;
    const tripDuration = 5;
    const geoData = { name: 'Paris', countryName: 'France', population: 2161000 };
    const countryData = { flags: { png: 'https://example.com/flag.png' } };

    updateUI(weather, image, countdown, tripDuration, geoData, countryData);

    expect(document.getElementById('weather').innerHTML).toContain('15°C');
    expect(document.getElementById('image').src).toBe('https://example.com/image.jpg');
    expect(document.getElementById('country-flag').innerHTML).toContain('https://example.com/flag.png');
  });

  it('clearUI should clear the DOM', () => {
    clearUI();
    expect(document.getElementById('weather').innerText).toBe('');
    expect(document.getElementById('image').style.display).toBe('none');
  });
});