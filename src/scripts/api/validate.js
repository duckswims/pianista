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


/**
 * Post Validate PDDL
 * @param {Object} requestBody - Must contain { pddl: "..." }
 * @param {"domain"|"problem"|null} pddlType - Optional PDDL type
 * @returns {Promise<Object>} - Validation response or error object
 */
export async function postValidatePddl(requestBody, pddlType = null) {
  const query = pddlType ? `?pddl_type=${encodeURIComponent(pddlType)}` : "";
  const endpoint = `/validate/pddl${query}`;

  console.log("requestBody:", requestBody);
  return fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}



/**
 * Post Validate PDDL Match
 * @param {Object} requestBody - Must contain { domain, problem }
 * @returns {Promise<Object>} API response
 */
export async function postValidatePddlMatch(requestBody) {
  const endpoint = "/validate/match/pddl";

  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
