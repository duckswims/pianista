import { fetchApi } from ".";

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
