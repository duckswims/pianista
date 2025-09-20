import { fetchApi } from "./index";

/**
 * Converts Mermaid code to PDDL via the API.
 * 
 * @param {Object} mermaidRequest - Object with text and optional domain.
 * @param {number} attempts - Number of conversion attempts (default 1).
 * @returns {Promise<Object>} - API response
 */
export async function postConvertMermaidToPddl(mermaidRequest, attempts = 1) {
  const url = `/convert/mermaid?attempts=${attempts}`;
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(mermaidRequest),
  });
}
