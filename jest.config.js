export default {
  testEnvironment: 'jsdom', // Use jsdom for browser-like environment
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  transform: {
    '^.+\\.js$': 'babel-jest', // Use Babel for JavaScript files
  },
  moduleDirectories: ['node_modules', 'src/client/js'], // Look for modules in these directories
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Output directory for coverage reports
  coverageReporters: ['html', 'text'], // Generate HTML and text reports
  collectCoverageFrom: [
    'src/client/js/**/*.js', // Include all JS files in src/client/js
    '!src/client/js/**/*.test.js', // Exclude test files
  ],
};