import React, { useState, useEffect } from "react";
import { postSolve } from "../../../../../scripts/api/postSolve";
import { removeWhitespaces } from "../../../../../scripts/helper/removeWhitespaces";
import ErrorDisplay from "../../../../response/error/ErrorDisplay";
import ResultDisplay from "../../../../response/result/ResultDisplay";

function PostSolve({ solverName: selectedSolverName }) {
  const [modelStr, setModelStr] = useState("");
  const [solverName, setSolverName] = useState(null);
  const [parameters, setParameters] = useState([{ key: "", value: "" }]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedSolverName) setSolverName(selectedSolverName);
  }, [selectedSolverName]);

  const addParameter = () => setParameters([...parameters, { key: "", value: "" }]);
  const removeParameter = (index) => setParameters(parameters.filter((_, i) => i !== index));
  const handleParamChange = (index, field, value) => {
    const newParams = [...parameters];
    newParams[index][field] = value;
    setParameters(newParams);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const modelParams = {};
    for (const param of parameters) {
      if (param.key) {
        let key = param.key.trim()
        let value = param.value.trim();
        if (!isNaN(value) && value !== "") {
          modelParams[key] = String(value);
        } else {
          try {
            modelParams[key] = JSON.parse(value);
          } catch {
            modelParams[key] = value;
          }
        }
      }
    }

    let cleanedModelStr = removeWhitespaces(modelStr);
    const responseBody = {
      model_str: cleanedModelStr,
      model_params: modelParams,
    };

    const response = await postSolve(responseBody, solverName);

    if (response.error) {
      setError(response);
      setResult(null);
    } else {
      setError(null);
      setResult(response);
    }
  }

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Post Solve</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Solver Name</label>
          <input
            type="text"
            className="form-control"
            value={solverName}
            onChange={(e) => setSolverName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Model String</label>
          <textarea
            className="form-control"
            rows="4"
            value={modelStr}
            onChange={(e) => setModelStr(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Model Parameters</label>
          {parameters.map((param, index) => (
            <div className="d-flex gap-2 mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder="Parameter name"
                value={param.key}
                onChange={(e) => handleParamChange(index, "key", e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control"
                placeholder="Parameter value"
                value={param.value}
                onChange={(e) => handleParamChange(index, "value", e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeParameter(index)}
              >
                &times;
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-outline-primary" onClick={addParameter}>
            + Add Parameter
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Solve
        </button>
      </form>

      <ErrorDisplay error={error} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default PostSolve;
