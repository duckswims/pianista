import { fetchApi } from "./index";

/**
 * Post a solver request to Minizinc
 * @param {string} modelStr - The problem configuration
 * @param {Object} modelParams - Initial values for problem variables
 * @param {string|null} solverName - Optional solver name (defaults to "or-tools")
 * @returns {Promise<Object>} - Returns JobId or error object
 */
export async function postSolve(modelStr, modelParams = {}, solverName = null) {
  const query = solverName ? `?solver_name=${encodeURIComponent(solverName)}` : "";
  const body = { model_str: modelStr, model_params: modelParams };

  return await fetchApi(`/solve/minizinc${query}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}
