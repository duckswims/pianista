import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";

/**
 * Converts Mermaid code to PDDL via the API.
 * 
 * @param {Object} mermaidRequest - Object with text and optional domain.
 * @param {number} attempts - Number of conversion attempts (default 1).
 * @returns {Promise<Object>} - API response
 */
export async function postConvertMermaidToPddl(text, domain, attempts = 1) {

  const requestBody = {
    text: removeExtraWhitespaces(text),
    domain: removeExtraWhitespaces(domain)
  }

  const endpoint = `/convert/mermaid?attempts=${attempts}`;

  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
