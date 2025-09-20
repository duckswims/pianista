import { fetchApi } from "./index";

/**
 * Get a previously requested plan by job ID
 * @param {string} id - ID of the plan being requested
 * @returns {Promise<Object>} Response plan or error object
 */
export async function getPlan(id) {
  if (!id) {
    return { error: true, message: "Plan ID is required." };
  }

  return await fetchApi(`/solve/pddl?id=${encodeURIComponent(id)}`);
}
