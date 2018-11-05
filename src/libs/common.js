/**
 * Simple wrapper function to keep async/await code try/catch free. It can also act as a simple container
 * to wrap 3rd partij library promises.
 * @param {promise} promiseFunc A function that returns a promise
 * @returns {Object} If successful it returns an object with two properties: success true and a data object, otherwise
 *          an object with: success false and an error object
 */
export function handlePromise(promiseFunc) {
  return promiseFunc
    .then(data => {
      return unwrapHandlePromise(data);
    })
    .catch(err => {
      return { success: false, err };
    });
}

/**
 * If we have chained promises that use handlePromise, then errors can be passed back as data with success set to true.
 * To avoid this, this method unwraps chained handlePromises.
 * @param {Object} response The response to check for an error.
 * @returns {Object} If successful it returns an object with two properties: success true and a data object, otherwise
 *          an object with: success false and an error object
 */
function unwrapHandlePromise(response) {
  if (response && response.err) {
    return { success: false, err: response.err };
  }
  return { success: true, data: response };
}

/**
 * Convience function that rethrows an error that has a name that indicates it's function.
 * @param {Error} err The error object that must be rethrown
 */
export function rethrow(err) {
  throw err;
}

/**
 * Convience function that converts a value to an array.
 * @param {Any} value The value to convert to an array
 * @returns A value converted to an array, if the value is already an array it is returned unchanged
 */
export function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}
