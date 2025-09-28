import { fetchApi } from ".";

/** 
 * Get Solution
 * Get a previously requested Minizinc solution.
 * @param {string} jobId - ID of the solution being requested
 * @returns {Promise<Object>} - Returns solution or error object
 */
export async function getSolution(jobId) {
  const endpoint = `/solve/minizinc?id=${encodeURIComponent(jobId)}`
  return await fetchApi(endpoint);
}

/**
 * Post Solve
 * Post a solver request to Minizinc.
 * @param {Object} requestBody - Must contain { model_str, model_params }
 * @param {string|null} solverName - Optional solver name (defaults to "or-tools")
 * @returns {Promise<Object>} - Returns JobId or error object
 */
export async function postSolve(requestBody, solverId = null) {
  const query = solverId ? `?solver_name=${encodeURIComponent(solverId)}` : "";
  const endpoint = `/solve/minizinc${query}`;

  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
