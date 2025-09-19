import { fetchApi } from ".";

/**
 * Get available solvers, or a single solver by ID
 * @param {string|null} solverId - optional solver ID
 * @returns {Promise<Array|Object>} List of solvers or single solver object
 */
export async function getSolvers(solverId = null) {
  const endpoint = solverId ? `/solvers/${solverId}` : "/solvers";
  return await fetchApi(endpoint);
}
