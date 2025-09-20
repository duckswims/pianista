import { fetchApi } from "./index";

/**
 * Post a planning request
 * @param {Object} requestBody - PlanningRequest { domain, problem }
 * @param {string} [planner_id] - Optional planner ID
 * @param {boolean} [convert_real_types=true] - Whether to convert real types
 * @returns {Promise<Object>} Response { id } or error object
 */
export async function postPlan(requestBody, planner_id = null, convert_real_types = true) {
  const queryParams = new URLSearchParams();
  if (planner_id) queryParams.append("planner_id", planner_id);
  queryParams.append("convert_real_types", convert_real_types);

  // Call the generic API wrapper
  return await fetchApi(`/solve/pddl?${queryParams.toString()}`, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
