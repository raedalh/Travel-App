// Update the UI with trip details
export const updateUI = (weather, image, countdown, tripDuration, geoData, countryData) => {
  if (!weather || !geoData) {
    console.error('Missing data for UI update');
    return;
  }

  document.getElementById('weather').innerHTML = `
    <span class="trip-detail">Weather:</span> ${weather.temp}°C, ${weather.weather.description}
  `;
  document.getElementById('countdown').innerHTML = `
    <span class="trip-detail">Trip in:</span> ${countdown} days
  `;
  document.getElementById('trip-duration').innerHTML = `
    <span class="trip-detail">Trip Duration:</span> ${tripDuration} days
  `;
  document.getElementById('city-name').innerHTML = `
    <span class="trip-detail">Destination City:</span> ${geoData.name || 'N/A'}
  `;
  document.getElementById('country-name').innerHTML = `
    <span class="trip-detail">Country:</span> ${geoData.countryName || 'N/A'}
  `;
  document.getElementById('population').innerHTML = `
    <span class="trip-detail">Population:</span> ${geoData.population || 'N/A'}
  `;
  document.getElementById('country-flag').innerHTML = `
    <span class="trip-detail">Flag:</span> <img src="${countryData.flags.png}" alt="${geoData.countryName} Flag" style="width: 50px;">
  `;

  // Select the image element
  const imageElement = document.getElementById('image');

  // Ensure image only appears if a valid one is found
  if (image) {
    imageElement.src = image;
    imageElement.style.display = 'block'; // Show image if available
  } else {
    imageElement.style.display = 'none'; // Hide image if none found
  }

  // Apply correct styles
  imageElement.style.width = '100%'; // Makes it responsive
  imageElement.style.maxWidth = '100vw'; // Prevents it from being too large
  imageElement.style.height = 'auto'; // Keeps aspect ratio
  imageElement.style.objectFit = 'cover'; // Ensures the image fits properly
  imageElement.style.margin = '0 auto'; // Centers the image
  imageElement.style.borderRadius = '0'; // Optional: Adds rounded corners
};

// Clear the UI
export const clearUI = () => {
  document.getElementById('weather').innerText = '';
  document.getElementById('countdown').innerText = '';
  document.getElementById('trip-duration').innerText = '';
  document.getElementById('city-name').innerText = '';
  document.getElementById('country-name').innerText = '';
  document.getElementById('population').innerText = '';
  document.getElementById('country-flag').innerHTML = '';

  // Hide the image when clearing UI
  const imageElement = document.getElementById('image');
  imageElement.style.display = 'none';
};
