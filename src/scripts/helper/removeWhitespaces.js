/**
 * Remove extra whitespaces and line breaks from a string
 * @param {string} str - Input string
 * @returns {string} Cleaned string
 */
export function removeWhitespaces(str) {
  if (!str) return "";

  return str
    .replace(/\\n|\s+/g, " ")
    .trim();
}
