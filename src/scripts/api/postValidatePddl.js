import { fetchApi } from ".";

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
