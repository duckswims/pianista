import { fetchApi } from "./index";

/**
 * Get a previously requested Minizinc solution
 * @param {string} jobId - ID of the solution being requested
 * @returns {Promise<Object>} - Returns solution or error object
 */
export async function getSolution(jobId) {
  const endpoint = `/solve/minizinc?id=${encodeURIComponent(jobId)}`
  return await fetchApi(endpoint);
}
