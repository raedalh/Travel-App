📌 Travel Planner App
A web application that helps users plan their trips by saving destination details, tracking trip countdowns, and displaying weather information.

📖 Table of Contents
Overview
Features
Technologies Used
Installation
Usage
Testing
Dependencies
Project Structure
Future Improvements
License
Contact
🌍 Overview
The Travel Planner App allows users to enter a travel destination, start and end dates, and receive useful information such as weather forecasts, destination details, and trip countdowns. The app stores trip data locally and enables easy trip management.

🚀 Features
✅ Trip Planning – Enter destination, start date, and end date.
✅ Weather Forecast – View real-time weather for your trip.
✅ Trip Countdown – Calculate how many days until your trip.
✅ Trip Duration Calculation – Automatically calculates trip duration.
✅ Destination Details – Displays country flag, population, and more.
✅ Image Display – Fetches and displays an image of the destination.
✅ Trip Management – Remove saved trips anytime.
✅ Local Storage – Ensures saved trips persist after page refresh.

🛠 Technologies Used
HTML – Structure of the web pages.
CSS – Styling for a responsive, visually appealing UI.
JavaScript – Handles user interactions and API requests.
Node.js & Express.js – Backend server for API calls.
Jest – Used for testing the application.

⚙️ Installation
Follow these steps to set up and run the project locally:

1️⃣ Clone the Repository

git clone https://github.com/raedalh/Travel-App.git
cd Travel-App
2️⃣ Install Dependencies

npm install
3️⃣ Run the Application

npm run start
This will start the server on http://localhost:8080/.

🖥 Usage
Enter a destination city and trip dates.
Click "Plan Trip" to fetch details like weather and images.
The app saves your trip information locally.
Click "Remove" to delete a saved trip.
🧪 Testing
The app includes unit tests to ensure proper functionality.

npm test

Testing Files:
tests/formHandler.test.js
tests/fetchData.test.js
tests/updateUI.test.js
tests/app.test.js

📦 Dependencies
Make sure you have Node.js v20.17.0 installed.

Project Dependencies (from package.json):

"dependencies": {
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"node-fetch": "^2.6.7"
},
"devDependencies": {
"@babel/core": "^7.23.9",
"@babel/preset-env": "^7.23.9",
"babel-jest": "^29.7.0",
"jest": "^29.7.0",
"webpack": "^5.91.0",
"webpack-cli": "^5.1.4",
"webpack-dev-server": "^4.15.1"
}

Future Improvements
🔹 User Authentication – Save trips to a personal account.
🔹 Enhanced UI – Add interactive animations.
🔹 Share Feature – Share planned trips with friends.
🔹 Offline Mode – Store data for offline access.

Contact
Raed Hamami
Email: raed.hammami@gmail.com
LinkedIn : https://www.linkedin.com/in/raed-hammami-549b7b65/
