import { initializeApp } from '../app'; // Import the initializeApp function
import { handleSubmit } from '../formHandler';

// Mock formHandler
jest.mock('../formHandler', () => ({
  handleSubmit: jest.fn(),
}));

describe('app', () => {
  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
      <form id="travel-form">
        <input id="city" value="Paris" />
        <input id="date" value="2023-12-25" />
        <input id="end-date" value="2023-12-30" />
      </form>
    `;
  });

  it('should add an event listener to the form', () => {
    initializeApp(); // Manually initialize the app

    const form = document.getElementById('travel-form');
    form.dispatchEvent(new Event('submit'));

    expect(handleSubmit).toHaveBeenCalled();
  });
});