import { fetchApi } from ".";
import { removeExtraWhitespaces } from "../helper/removeExtraWhitespaces";

/**
 * Post a solver request to Minizinc
 * @param {string} modelStr - The problem configuration
 * @param {Object} modelParams - Initial values for problem variables
 * @param {string|null} solverName - Optional solver name (defaults to "or-tools")
 * @returns {Promise<Object>} - Returns JobId or error object
 */
export async function postSolve(modelStr, modelParams = {}, solverName = null) {
  const query = solverName ? `?solver_name=${encodeURIComponent(solverName)}` : "";
  const requestBody = { 
    model_str: removeExtraWhitespaces(modelStr), 
    model_params: modelParams 
  };

  const endpoint = `/solve/minizinc${query}`;

  return await fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
}
