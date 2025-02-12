import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

// Configure dotenv
dotenv.config();

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files
const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

// Root route serving index.html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(distPath, 'index.html'));
});

// Function to safely import node-fetch
async function fetchModule() {
    const fetch = (await import('node-fetch')).default;
    return fetch;
}

// Fetch location data
app.get('/fetch-location', async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: 'City is required' });
    if (!process.env.GEONAMES_API_KEY) return res.status(500).json({ error: 'API key missing' });

    const geonamesUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.GEONAMES_API_KEY}`;
    try {
        const fetch = await fetchModule();
        const response = await fetch(geonamesUrl);
        const data = await response.json();

        if (!data.geonames || data.geonames.length === 0) {
            return res.status(404).json({ error: 'No location data found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});

// Fetch weather data
app.get('/fetch-weather', async (req, res) => {
    const { lat, lon, date } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude are required' });
    if (!process.env.WEATHERBIT_API_KEY) return res.status(500).json({ error: 'API key missing' });

    const daysDiff = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
    const weatherbitUrl = daysDiff <= 7
        ? `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`
        : `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`;

    try {
        const fetch = await fetchModule();
        const response = await fetch(weatherbitUrl);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            return res.status(404).json({ error: 'No weather data found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Fetch image
app.get('/fetch-image', async (req, res) => {
    const { city, q } = req.query;
    const query = city || q;
    if (!query) return res.status(400).json({ error: 'Query parameter is required' });
    if (!process.env.PIXABAY_API_KEY) return res.status(500).json({ error: 'API key missing' });

    const pixabayUrl = `https://pixabay.com/api/?q=${query}&key=${process.env.PIXABAY_API_KEY}`;
    try {
        const fetch = await fetchModule();
        const response = await fetch(pixabayUrl);
        const data = await response.json();

        if (!data.hits || data.hits.length === 0) {
            return res.status(404).json({ error: 'No image found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

// Fetch country data
app.get('/fetch-country', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: 'Country code is required' });

    const restCountriesUrl = `https://restcountries.com/v3.1/alpha/${code}`;
    try {
        const fetch = await fetchModule();
        const response = await fetch(restCountriesUrl);
        const data = await response.json();

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No country data found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch country data' });
    }
});

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app; // Export the app for testing