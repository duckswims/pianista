import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";

/**
 * Convert PDDL to Mermaid.
 * @param {string} pddlType - "domain" or "problem"
 * @param {string} pddl - PDDL string to convert
 * @returns {Promise<object>} - API response
 */
export async function postConvertPddlToMermaid(pddlType, pddl) {
  const requestBody = {
    pddl: removeExtraWhitespaces(pddl)
  }

  const endpoint = `/convert/mermaid/${pddlType}`;
  
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
