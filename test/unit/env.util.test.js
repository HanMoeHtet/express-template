const { getValueFromEnvOrFail } = require('@src/utils/env.util');

test('getValueFromEnvOrFail', () => {
  expect(getValueFromEnvOrFail('NODE_ENV')).toBe('test');

  expect(getValueFromEnvOrFail('PORT')).toBe('8085');

  expect(() => {
    getValueFromEnvOrFail(new Date().toString());
  }).toThrow(Error);
});
