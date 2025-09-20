import { fetchApi } from "./index";

/**
 * Validate a PDDL plan
 * @param {string} domain - The domain string
 * @param {string} problem - The problem string
 * @param {string} plan - The plan string
 * @returns {Promise<Object>} Validation response or error object
 */
export async function validateProblemPlan(domain, problem, plan) {
  const requestBody = { domain, problem, plan };

  const response = await fetchApi("/validate/plan/pddl", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  return response;
}
