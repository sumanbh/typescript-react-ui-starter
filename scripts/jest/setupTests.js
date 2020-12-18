import '@testing-library/jest-dom/extend-expect';

/**
 * Cookie mock of sorts...
 */
let cookie = '';

if (global.window) {
  global.window.scrollTo = jest.fn();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  Object.defineProperty(document, 'cookie', {
    get: () => cookie,
    set: (value) => {
      cookie += `${value};`;
    },
  });
}

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllTimers();
  cookie = '';
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
});

/**
 * Fail tests that log errors or warnings, because these can point to actual
 * bugs and once there are already a few of these the person writing new code
 * will start ignoring them.
 *
 * If a test is expected to log an error or a warning, mock it so the output
 * doesn’t actually show up.
 */
const logAndThrow = (loggerFn) => {
  function imp(message, ...optionalParams) {
    // Keep default logging behaviour
    loggerFn.call(console, message, ...optionalParams);
    if (message instanceof Error) {
      throw message;
    } else {
      const err = new Error(message);
      // Skip this frame in the stack to point to the actual log call-site
      Error.captureStackTrace(err, imp);
      throw err;
    }
  }
  return imp;
};
/* eslint-disable no-console */
const originalConsoleError = console.error;
const originalWarnError = console.warn;
console.error = logAndThrow(originalConsoleError);
console.warn = logAndThrow(originalWarnError);
/* eslint-enable no-console */
