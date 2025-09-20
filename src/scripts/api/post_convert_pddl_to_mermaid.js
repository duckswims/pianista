import { fetchApi } from "./index";

/**
 * Convert PDDL to Mermaid.
 * @param {string} pddlType - "domain" or "problem"
 * @param {string} pddl - PDDL string to convert
 * @returns {Promise<object>} - API response
 */
export async function postConvertPddlToMermaid(pddlType, pddl) {
  try {
    const response = await fetchApi(
      `/convert/mermaid/${pddlType}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pddl }),
      }
    );

    return response;
  } catch (err) {
    return { error: err.message };
  }
}
