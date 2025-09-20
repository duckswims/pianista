import { fetchApi } from "./index";

/**
 * Get a previously requested Minizinc solution
 * @param {string} jobId - ID of the solution being requested
 * @returns {Promise<Object>} - Returns solution or error object
 */
export async function getSolution(jobId) {
  return await fetchApi(`/solve/minizinc?id=${encodeURIComponent(jobId)}`);
}
