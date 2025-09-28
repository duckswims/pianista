import { fetchApi } from ".";

/**
 * Get Plan
 * Get a previously requested plan.
 * @param {string} id - ID of the plan being requested
 * @returns {Promise<Object>} Response plan or error object
 */
export async function getPlan(id = null) {
  if (!id) {
    return { error: true, message: "Plan ID is required." };
  }

  const endpoint = `/solve/pddl?id=${encodeURIComponent(id)}`;

  return await fetchApi(endpoint);
}


/**
 * Post Plan
 * Post a planning request.
 * @param {Object} requestBody - Must contain { domain, problem }
 * @param {string|null} planner_id - Optional planner ID
 * @param {boolean} convert_real_types - Whether to convert real types
 * @returns {Promise<Object>} Response { id } or error object
 */
export async function postPlan(requestBody, planner_id = null, convert_real_types = true) {
  const queryParams = new URLSearchParams();
  if (planner_id) queryParams.append("planner_id", planner_id);
  queryParams.append("convert_real_types", convert_real_types);

  const endpoint = `/solve/pddl?${queryParams.toString()}`;

  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}