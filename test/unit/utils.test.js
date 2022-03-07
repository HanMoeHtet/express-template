import chalk from 'chalk';
import {
  removeTrailingForwardSlash,
  getValueFromEnvOrFail,
  removeAnsiEscapeCodes,
} from '../../src/utils';

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
  expect(removeAnsiEscapeCodes(chalk.green('hello'))).toEqual('hello');

  expect(removeAnsiEscapeCodes(chalk.green('hello'))).not.toEqual(
    chalk.green('hello')
  );
});
