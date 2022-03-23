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

test('removeAnsiEscapeCodes', () => {
  expect(removeAnsiEscapeCodes('\x1B[32mhello\x1B[39m')).toEqual('hello');

  expect(removeAnsiEscapeCodes('\x1B[32mhello\x1B[39m')).not.toEqual(
    '\x1B[32mhello\x1B[39m'
  );
});
