import { handleSubmit } from './formHandler.js';
import '../styles/styles.scss';

// Function to initialize the app
export const initializeApp = () => {
  document.getElementById('travel-form').addEventListener('submit', handleSubmit);
};

// Initialize the app only if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  initializeApp();
}