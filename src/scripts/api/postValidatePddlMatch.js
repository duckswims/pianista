import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";

/**
 * Post Validate PDDL Match
 * @param {string} domain - Domain PDDL string
 * @param {string} problem - Problem PDDL string
 * @returns {Promise<Object>} API response
 */
export async function postValidatePddlMatch(domain, problem) {
  const requestBody = {
      domain: removeExtraWhitespaces(domain),
      problem: removeExtraWhitespaces(problem)
    }

  const endpoint = "/validate/match/pddl";
  
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}

