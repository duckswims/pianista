import { fetchApi } from "./index";

/**
 * Post Validate PDDL
 * @param {string} pddl - The PDDL content to validate
 * @param {"domain"|"problem"|null} pddlType - Optional PDDL type
 * @returns {Promise<Object>} - Validation response or error object
 */
export async function postValidatePddl(pddl, pddlType = null) {
  const query = pddlType ? `?pddl_type=${encodeURIComponent(pddlType)}` : "";
  const body = { pddl };

  return fetchApi(`/validate/pddl${query}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}
