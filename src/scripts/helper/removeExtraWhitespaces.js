/**
 * Remove extra whitespaces and line breaks from a string
 * @param {string} str - Input string
 * @returns {string} Cleaned string
 */
export function removeExtraWhitespaces(str) {
  if (!str) return "";

  return str
    .replace(/\\n|\s+/g, " ")
    .trim();
}
