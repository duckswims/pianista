import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";

/**
 * Call the API to generate PDDL from natural language
 * @param {string} pddl_type - "domain" | "problem"
 * @param {Object} prompt - { text: string, domain?: string }
 * @param {boolean} generate_both - whether to generate both domain and problem
 * @param {number} attempts - number of attempts
 */
export async function postGeneratePddl(pddl_type, text, domain, generate_both = false, attempts = 1) {
  const endpoint = `/convert/natural_language/${pddl_type}?generate_both=${generate_both}&attempts=${attempts}`;
  
  const requestBody = {
    text: removeExtraWhitespaces(text),
    domain: removeExtraWhitespaces(domain)
  }

  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
