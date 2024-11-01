// Increase timeout for all tests
jest.setTimeout(10000);

// Add custom matchers
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
    };
  },
});

// Global test cleanup
afterEach(() => {
  jest.clearAllMocks();
});
