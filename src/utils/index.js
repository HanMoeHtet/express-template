/**
 * @param {string} str
 */
export const removeTrailingForwardSlash = (str) => {
  return str.replace(/\/$/, '');
};

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

/**
 * @param {string} str
 */
export const removeAnsiEscapeCodes = (str) => {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
};
