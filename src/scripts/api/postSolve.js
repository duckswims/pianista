import { fetchApi } from ".";
/**
 * Post a solver request to Minizinc
 * @param {Object} requestBody - Must contain { model_str, model_params }
 * @param {string|null} solverName - Optional solver name (defaults to "or-tools")
 * @returns {Promise<Object>} - Returns JobId or error object
 */
export async function postSolve(requestBody, solverName = null) {
  const query = solverName ? `?solver_name=${encodeURIComponent(solverName)}` : "";
  const endpoint = `/solve/minizinc${query}`;

  console.log("requestBody:", requestBody);
  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
