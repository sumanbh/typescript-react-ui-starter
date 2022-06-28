import '@testing-library/jest-dom/extend-expect';

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
