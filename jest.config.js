export default {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleDirectories: ['node_modules', 'src/client/js'],
  };