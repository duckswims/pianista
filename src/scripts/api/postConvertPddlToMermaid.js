import { fetchApi } from ".";

/**
 * Convert PDDL to Mermaid.
 * @param {Object} requestBody - Already contains { pddl }
 * @param {string} pddlType - "domain" or "problem"
 * @returns {Promise<object>} - API response
 */
export async function postConvertPddlToMermaid(requestBody, pddlType) {
  const endpoint = `/convert/mermaid/${pddlType}`;
  
  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
