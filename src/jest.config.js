module.exports = {
  /*  Path to a module which exports an async fucntion
     *  that is triggered once before all test suites
     */
  globalSetup: '<rootDir>/tests/setup.js',

  /* Path to a module which exports an async function
     * that is triggered once after all test suites
     */
  globalTeardown: '<rootDir>/tests/teardown.js',

  /* A list of paths to modules that run some code
     * to configure or setup the testing before each test
     */
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.js'],

  /* Test environment used for testing
     */
  testEnvironment: '<rootDir>/tests/environment.js',
  testMatch: ['**/tests/**/*.test.js'],
};
