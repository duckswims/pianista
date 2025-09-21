import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";


/**
 * Post Validate PDDL
 * @param {string} pddl - The PDDL content to validate
 * @param {"domain"|"problem"|null} pddlType - Optional PDDL type
 * @returns {Promise<Object>} - Validation response or error object
 */
export async function postValidatePddl(pddl, pddlType = null) {
  const query = pddlType ? `?pddl_type=${encodeURIComponent(pddlType)}` : "";
  const requestBody = { 
    pddl: removeExtraWhitespaces(pddl)
  };

  const endpoint = `/validate/pddl${query}`;

  return fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
