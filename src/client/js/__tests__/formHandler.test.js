// Mock window.alert
global.alert = jest.fn();

import {
  handleSubmit,
  calculateCountdown,
  calculateTripDuration,
  saveTripToLocalStorage,
  removeTripFromLocalStorage,
  initializeEventListeners,
} from '../formHandler';
import { updateUI, clearUI } from '../updateUI';

// Mock updateUI and clearUI
jest.mock('../updateUI', () => ({
  updateUI: jest.fn(),
  clearUI: jest.fn(),
}));

// Mock localStorage properly using jest.spyOn
beforeEach(() => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});

  document.body.innerHTML = `
    <form id="travel-form">
      <input id="city" value="Paris" />
      <input id="date" value="2023-12-25" />
      <input id="end-date" value="2023-12-30" />
    </form>
    <button id="remove-trip"></button>
  `;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('formHandler', () => {
  it('calculateCountdown should return the correct number of days', () => {
    const today = new Date();
    const tripDate = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    const countdown = calculateCountdown(tripDate.toISOString().split('T')[0]);
    expect(countdown).toBe(5);
  });

  it('calculateTripDuration should return the correct number of days', () => {
    const startDate = '2023-12-25';
    const endDate = '2023-12-30';
    const duration = calculateTripDuration(startDate, endDate);
    expect(duration).toBe(5);
  });

  it('saveTripToLocalStorage should save a trip to localStorage', () => {
    const tripData = { city: 'Paris', startDate: '2023-12-25' };
    
    // Mock getItem to return an empty array initially
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([]));

    saveTripToLocalStorage(tripData);

    // Verify localStorage.setItem was called correctly
    expect(localStorage.setItem).toHaveBeenCalledWith('trips', JSON.stringify([tripData]));
  });

  it('removeTripFromLocalStorage should remove a trip from localStorage', () => {
    const trips = [{ city: 'Paris' }, { city: 'London' }];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(trips));

    removeTripFromLocalStorage('Paris');

    // Verify localStorage.setItem was called correctly
    expect(localStorage.setItem).toHaveBeenCalledWith('trips', JSON.stringify([{ city: 'London' }]));
  });

  it('handleSubmit should call updateUI with trip data', async () => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          geonames: [{ lat: 48.8566, lng: 2.3522 }],
          data: [{ temp: 15 }],
          hits: [{ webformatURL: 'https://example.com/image.jpg' }],
        }),
      })
    );

    await handleSubmit({ preventDefault: jest.fn() });

    expect(updateUI).toHaveBeenCalled();
  });

  it('initializeEventListeners should add event listeners', () => {
    initializeEventListeners();

    // Simulate a click on the remove-trip button
    const removeTripButton = document.getElementById('remove-trip');
    removeTripButton.click();

    // Verify localStorage.getItem was called
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
