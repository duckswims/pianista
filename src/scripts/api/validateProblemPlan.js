import { fetchApi } from ".";

/**
 * Validate a PDDL plan
 * @param {Object} requestBody - Must contain { domain, problem, plan }
 * @returns {Promise<Object>} Validation response or error object
 */
export async function validateProblemPlan(requestBody) {
  const endpoint = "/validate/plan/pddl";

  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
