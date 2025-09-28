import { fetchApi } from ".";

/**
 * Get Planners
 * Get available planners.
 * @param {string|null} plannerId - optional planner ID
 * @returns {Promise<Array|Object>} List of planners or single planner object
 */
export async function getPlanners(plannerId = null) {
  const endpoint = plannerId ? `/planners/${plannerId}` : "/planners";
  return await fetchApi(endpoint);
}