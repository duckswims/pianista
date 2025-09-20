import { fetchApi } from "./index";

/**
 * Call the API to generate PDDL from natural language
 * @param {string} pddl_type - "domain" | "problem"
 * @param {Object} prompt - { text: string, domain?: string }
 * @param {boolean} generate_both - whether to generate both domain and problem
 * @param {number} attempts - number of attempts
 */
export async function postGeneratePddl(pddl_type, prompt, generate_both = false, attempts = 1) {
  const url = `/convert/natural_language/${pddl_type}?generate_both=${generate_both}&attempts=${attempts}`;
  
  return await fetchApi(url, {
    method: "POST",
    body: JSON.stringify(prompt),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
