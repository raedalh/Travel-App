import { fetchLocationData, fetchWeatherData, fetchImage, fetchCountryImage, fetchCountryData } from './fetchData.js';
import { updateUI, clearUI } from './updateUI.js';

// Calculate countdown to trip date
export const calculateCountdown = (date) => {
  const tripDate = new Date(date);
  const today = new Date();
  return Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));
};

// Calculate trip duration
export const calculateTripDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

// Save trip data to local storage
export const saveTripToLocalStorage = (tripData) => {
  const trips = JSON.parse(localStorage.getItem('trips')) || [];
  trips.push(tripData);
  localStorage.setItem('trips', JSON.stringify(trips));
};

// Remove trip from local storage and update UI
export const removeTripFromLocalStorage = (city) => {
  let trips = JSON.parse(localStorage.getItem('trips')) || [];

  // Ensure at least one trip exists
  if (trips.length === 0) {
    alert('No trips found to remove.');
    return;
  }

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  // Filter out the selected trip
  const updatedTrips = trips.filter((trip) => trip.city.toLowerCase() !== city.toLowerCase());

  if (trips.length === updatedTrips.length) {
    alert('Trip not found! Please enter a correct city name.');
    return;
  }

  // Update localStorage with filtered trips
  localStorage.setItem('trips', JSON.stringify(updatedTrips));

  // If no trips left, clear local storage completely
  if (updatedTrips.length === 0) {
    localStorage.removeItem('trips');
  }

  // Clear UI and reload remaining trips
  clearUI();
  loadTripsFromLocalStorage();

  // Clear input field after removal
  const cityInput = document.getElementById('city');
  if (cityInput) {
    cityInput.value = '';
  }

  alert('Trip removed successfully!');
};

// Load trips from local storage
export const loadTripsFromLocalStorage = () => {
  clearUI(); // Ensure UI is clean before loading

  const trips = JSON.parse(localStorage.getItem('trips')) || [];

  if (trips.length === 0) {
    console.log('No saved trips. UI remains clear.');
    return;
  }

  trips.forEach((trip) => {
    updateUI(trip.weather, trip.image, trip.countdown, trip.tripDuration, trip.location, trip.countryData);
  });
};

// Handle form submission
export const handleSubmit = async (event) => {
  event.preventDefault();

  const city = document.getElementById('city').value.trim();
  const startDate = document.getElementById('date').value;
  const endDate = document.getElementById('end-date').value;

  if (!city || !startDate || !endDate) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const location = await fetchLocationData(city);
    const weather = await fetchWeatherData(location.lat, location.lng, startDate);
    let image = await fetchImage(city);

    if (!image || image === 'https://via.placeholder.com/600x400') {
      image = await fetchCountryImage(location.countryName);
    }

    const countdown = calculateCountdown(startDate);
    const tripDuration = calculateTripDuration(startDate, endDate);

    const countryData = location.countryCode ? await fetchCountryData(location.countryCode) : {};

    const tripData = {
      city,
      startDate,
      endDate,
      weather,
      image,
      countdown,
      tripDuration,
      location,
      countryData,
    };

    saveTripToLocalStorage(tripData);
    updateUI(weather, image, countdown, tripDuration, location, countryData);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch trip details. Please try again.');
  }
};

// Initialize event listeners
export const initializeEventListeners = () => {
  // Load saved trips on page load
  document.addEventListener('DOMContentLoaded', () => {
    loadTripsFromLocalStorage();
  });

  // Ensure remove button works correctly
  const removeTripButton = document.getElementById('remove-trip');
  if (removeTripButton) {
    removeTripButton.addEventListener('click', () => {
      const cityInput = document.getElementById('city');
      if (!cityInput) {
        alert('City input field not found!');
        return;
      }

      const city = cityInput.value.trim();
      if (!city) {
        alert('Please enter a city name.');
        return;
      }

      removeTripFromLocalStorage(city);
    });
  }
};

// Initialize the app
initializeEventListeners();