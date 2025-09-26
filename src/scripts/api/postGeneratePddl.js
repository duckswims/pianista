import { fetchApi } from ".";

/**
 * Call the API to generate PDDL from natural language
 * @param {string} pddl_type - "domain" | "problem"
 * @param {Object} requestBody - Already processed body { text, domain }
 * @param {boolean} generate_both - whether to generate both domain and problem
 * @param {number} attempts - number of attempts
 */
export async function postGeneratePddl(pddl_type, requestBody, generate_both = false, attempts = 1) {
  const endpoint = `/convert/natural_language/${pddl_type}?generate_both=${generate_both}&attempts=${attempts}`;

  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
