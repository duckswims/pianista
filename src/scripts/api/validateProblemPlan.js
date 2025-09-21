import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";

/**
 * Validate a PDDL plan
 * @param {string} domain - The domain string
 * @param {string} problem - The problem string
 * @param {string} plan - The plan string
 * @returns {Promise<Object>} Validation response or error object
 */
export async function validateProblemPlan(domain, problem, plan) {
  const requestBody = {
    domain: removeExtraWhitespaces(domain),
    problem: removeExtraWhitespaces(problem),
    plan: removeExtraWhitespaces(plan)
  }

  const endpoint = "/validate/plan/pddl";
  
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
