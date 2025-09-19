/**
 * Remove extra whitespaces and line breaks from a string
 * @param {string} str - Input string
 * @returns {string} Cleaned string
 */
export function removeExtraWhitespaces(str) {
  if (!str) return "";
  
  // Replace all sequences of whitespace (space, tab, newline) with a single space
  return str.replace(/\s+/g, " ").trim();
}
