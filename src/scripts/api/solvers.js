import { fetchApi } from ".";

/**
 * Get Solvers
 * Get available solvers.
 * @param {string|null} solverId - optional solver ID
 * @returns {Promise<Array|Object>} List of solvers or single solver object
 */
export async function getSolvers(solverId = null) {
  const endpoint = solverId ? `/solvers/${solverId}` : "/solvers";
  return await fetchApi(endpoint);
}
