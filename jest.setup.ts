import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import 'whatwg-fetch'

import { afterAll, afterEach, beforeAll } from '@jest/globals';

import { server } from './mocks/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});



