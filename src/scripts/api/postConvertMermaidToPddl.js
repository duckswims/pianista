import { fetchApi } from ".";

/**
 * Converts Mermaid code to PDDL via the API.
 * 
 * @param {Object} requestBody - Must contain { text, domain }
 * @param {number} attempts - Number of conversion attempts (default 1)
 * @returns {Promise<Object>} - API response
 */
export async function postConvertMermaidToPddl(requestBody, attempts = 1) {
  const endpoint = `/convert/mermaid?attempts=${attempts}`;
  
  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
