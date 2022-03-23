/**
 * @param {string} key
 */
export const getValueFromEnvOrFail = (key) => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`${key} environment variable is not set.`);
  }

  return value;
};
