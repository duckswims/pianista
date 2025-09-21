import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";

/**
 * Post a planning request
 * @param {Object} requestBody - PlanningRequest { domain, problem }
 * @param {string} [planner_id] - Optional planner ID
 * @param {boolean} [convert_real_types=true] - Whether to convert real types
 * @returns {Promise<Object>} Response { id } or error object
 */
export async function postPlan(domain, problem, planner_id = null, convert_real_types = true) {
  const queryParams = new URLSearchParams();
  if (planner_id) queryParams.append("planner_id", planner_id);
  queryParams.append("convert_real_types", convert_real_types);

  // Clean up domain and problem using removeExtraWhitespaces
  const requestBody = {
    domain: removeExtraWhitespaces(domain),
    problem: removeExtraWhitespaces(problem),
  };

  // Call the generic API wrapper
  const endpoint = `/solve/pddl?${queryParams.toString()}`;

  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
