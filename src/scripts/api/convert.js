import { fetchApi } from ".";

/**
 * Post Generate Pddl
 * Generate PDDL domain or problem from a prompt, with GPT.
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

/**
 * Post Convert Pddl To Mermaid
 * Post PDDL to convert to Mermaid-style code.
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

/**
 * Post Convert Mermaid To Pddl
 * Post Mermaid-style code to convert to PDDL.
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

