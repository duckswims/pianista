import { fetchApi } from "./index";

/**
 * Post Validate PDDL Match
 * @param {string} domain - Domain PDDL string
 * @param {string} problem - Problem PDDL string
 * @returns {Promise<Object>} API response
 */
export async function postValidatePddlMatch(domain, problem) {
  return await fetchApi("/validate/match/pddl", {
    method: "POST",
    body: JSON.stringify({ domain, problem }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
