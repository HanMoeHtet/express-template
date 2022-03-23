import { getValueFromEnvOrFail } from '@src/utils/env.util';
import {
  removeAnsiEscapeCodes,
  removeTrailingForwardSlash,
} from '../../src/utils/string.util';

test('removeTrailingForwardSlash', () => {
  expect(removeTrailingForwardSlash('/')).toBe('');

  expect(removeTrailingForwardSlash('http://example.com/')).toBe(
    'http://example.com'
  );

  expect(removeTrailingForwardSlash('http://example.com')).toBe(
    'http://example.com'
  );
});

test('getValueFromEnvOrFail', () => {
  expect(getValueFromEnvOrFail('NODE_ENV')).toBe('test');

  expect(getValueFromEnvOrFail('PORT')).toBe('8085');

  expect(() => {
    getValueFromEnvOrFail(new Date().toString());
  }).toThrow(Error);
});

test('removeAnsiEscapeCodes', () => {
  expect(removeAnsiEscapeCodes('\x1B[32mhello\x1B[39m')).toEqual('hello');

  expect(removeAnsiEscapeCodes('\x1B[32mhello\x1B[39m')).not.toEqual(
    '\x1B[32mhello\x1B[39m'
  );
});
