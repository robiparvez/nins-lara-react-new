/**
 * default per page array.
 *
 * @export
 * @param {number} total
 * @returns {Array}
 */
export function getDefaultPerPage(total) {
    return [10, 20, 30, 40].filter(size => size <= total);
}

/**
 * Check if we have a validation
 * error for the specified input.
 *
 * @export
 * @param {Array} errors
 * @param {string} input
 * @returns {boolean}
 */
export function hasValidationError(errors, input) {
    if (errors[input] === undefined) {
        return false;
    }

    if (!errors[input].length) {
        return false;
    }

    return true;
}

/**
 * Get the first validation error from
 * the errors array by the specified input.
 *
 * @export
 * @param {Array} errors
 * @param {string} input
 * @returns {string|null}
 */
export function getFirstValidationError(errors, input) {
    if (errors[input] === undefined) {
        return null;
    }

    if (!errors[input].length) {
        return null;
    }

    return errors[input][0];
}

/**
 * Limit the numbers of characters by length.
 *
 * @param {string} words
 * @param {number|30} len
 * @returns {string}
 */
export function limitString(words, len = 30) {
    if (!words) {
        return null;
    }

    if (words.length <= len) {
        return words;
    }

    return words
        .substr(0, len)
        .trim()
        .concat("...");
}
