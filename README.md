Travel App
Project Overview:
The Travel App is a web application that helps users plan and organize their trips. It integrates with multiple APIs to fetch location, weather, and image data for the destination city. Users can save their trips and view details such as weather forecasts, trip countdowns, and destination images.

Table of Contents
Features

Technologies Used

APIs Used

Installation

Usage

Testing

Project Structure

Contributing

License

Acknowledgements

Features
Trip Planning:

Enter a destination city, start date, and end date to plan a trip.

View weather forecasts for the destination.

See a countdown to the trip start date and the trip duration.

Destination Details:

Display images of the destination city or country.

Show country information, including flag and population.

Trip Storage:

Save trips to localStorage for easy access.

Remove trips from the list.

Technologies Used
Frontend:

HTML, CSS (SCSS), JavaScript

Webpack (for bundling)

Babel (for JavaScript transpilation)

Backend:

Node.js with Express.js (for API proxying)

Testing:

Jest (for unit testing)

APIs:

Geonames (location data)

Weatherbit (weather data)

Pixabay (destination images)

REST Countries (country data)

APIs Used
Geonames:

Fetches latitude, longitude, and country information for the destination city.

Weatherbit:

Provides current weather data or forecasts for the destination.

Pixabay:

Retrieves images of the destination city or country.

REST Countries:

Fetches country details, such as flag and population.

Installation
Follow these steps to set up the Travel App locally:

Clone the Repository:

git clone https://github.com/your-username/travel-app.git
cd travel-app

Install Dependencies:

npm install
Set Up Environment Variables:

Create a .env file in the root directory.

Add your API keys:

.env

GEONAMES_API_KEY=your_geonames_api_key
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key

Build for Production:

npm run build

Start the Production Server:
npm start
The app will be available at http://localhost:3000.

Usage
Plan a Trip:

Enter the destination city, start date, and end date in the form.

Click "Plan Trip" to view trip details.

View Trip Details:

The app will display:

Weather forecast for the destination.

Countdown to the trip start date.

Trip duration.

Destination image and country information.

Save and Remove Trips:

Trips are automatically saved to localStorage.

To remove a trip, enter the city name and click "Remove Trip."

Testing
The project includes unit tests written with Jest. To run the tests:

Run All Tests:

npm test

Project Structure
Copy
Travel-App/
├── dist/ # Production build files
├── node_modules/ # Installed dependencies
├── src/ # Source files
│ ├── client/ # Frontend code
│ │ ├── js/ # JavaScript files
│ │ │ ├── app.js # Main app logic
│ │ │ ├── fetchData.js # API fetching logic
│ │ │ ├── formHandler.js # Form handling logic
│ │ │ ├── updateUI.js # UI update logic
│ │ │ └── **tests**/ # Test files
│ │ ├── media/ # Media files (e.g., images)
│ │ └── styles/ # SCSS styles
│ ├── server/ # Backend server code
│ │ └── server.js # Express server for API proxying
├── .babelrc # Babel configuration
├── .env # Environment variables
├── .gitignore # Files to ignore in Git
├── jest.config.js # Jest configuration
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
└── webpack.config.js # Webpack configuration

Dependencies

Runtime Dependencies

node.js: v20.17.0

cors: ^2.8.5

dotenv: ^16.4.0

express: ^4.18.3

fast-text-encoding: ^1.0.6

node-fetch: ^2.7.0

util: ^0.12.5

whatwg-url: ^14.1.0

Development Dependencies
@babel/core: ^7.26.8

@babel/plugin-syntax-import-meta: ^7.10.4

@babel/preset-env: ^7.26.8

@types/jest: ^29.5.14

babel-jest: ^29.7.0

babel-loader: ^9.1.2

css-loader: ^6.8.1

html-webpack-plugin: ^5.5.3

identity-obj-proxy: ^3.0.0

jest: ^29.7.0

jest-environment-jsdom: ^29.7.0

jest-environment-node: ^29.7.0

jsdom: ^26.0.0

mini-css-extract-plugin: ^2.7.2

sass: ^1.75.0

sass-loader: ^13.3.2

supertest: ^7.0.0

webpack: ^5.89.0

webpack-cli: ^5.1.4

webpack-dev-server: ^4.15.0

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix:

git checkout -b feature-name
Commit your changes:

git commit -m "Add feature-name"
Push to the branch:

git push origin feature-name
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Udacity for providing the Front End Nanodegree program.

Geonames, Weatherbit, Pixabay, and REST Countries for their APIs.

Webpack, Jest, and Babel for their amazing tools.

Contact
If you have any questions or feedback, feel free to reach out:

Email: raed.hammami@gmail.com

GitHub: raedalh

LinkedIn: https://www.linkedin.com/in/raed-hammami-549b7b65/
