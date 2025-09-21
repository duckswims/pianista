/**
 * Convert a key string to a more readable format
 * - Replaces underscores with spaces
 * - Capitalizes the first letter of each word
 * @param {string} key
 * @returns {string}
 */
export function formatKey(key) {
  if (!key) return "";
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
