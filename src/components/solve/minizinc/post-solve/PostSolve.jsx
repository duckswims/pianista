import React, { useState, useEffect } from "react";
import { postSolve } from "../../../../scripts/api/post_solve";

function PostSolve({ solverName: selectedSolverName }) {
  const [modelStr, setModelStr] = useState("");
  const [solverName, setSolverName] = useState("or-tools");
  const [parameters, setParameters] = useState([{ key: "", value: "" }]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Update solverName when selectedSolverName prop changes
  useEffect(() => {
    if (selectedSolverName) {
      setSolverName(selectedSolverName);
    }
  }, [selectedSolverName]);

  // Handle adding a new parameter row
  const addParameter = () => setParameters([...parameters, { key: "", value: "" }]);

  // Handle removing a parameter row
  const removeParameter = (index) => {
    const newParams = [...parameters];
    newParams.splice(index, 1);
    setParameters(newParams);
  };

  // Handle changing key or value
  const handleParamChange = (index, field, value) => {
    const newParams = [...parameters];
    newParams[index][field] = value;
    setParameters(newParams);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Convert key-value pairs into JSON object
    const modelParams = {};
    for (const param of parameters) {
      if (param.key) {
        try {
          modelParams[param.key] = JSON.parse(param.value);
        } catch {
          modelParams[param.key] = param.value; // fallback as string
        }
      }
    }

    const response = await postSolve(modelStr, modelParams, solverName);

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
        {/* Solver Name */}
        <div className="mb-3">
          <label className="form-label">Solver Name</label>
          <input
            type="text"
            className="form-control"
            value={solverName}
            onChange={(e) => setSolverName(e.target.value)}
          />
        </div>

        {/* Model String */}
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

        {/* Dynamic Parameters */}
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

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addParameter}
          >
            + Add Parameter
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Solve
        </button>
      </form>

      {/* Error / Result */}
      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error {error.status || ""}:</strong> {error.message || "Validation error"}
          {error.details && Array.isArray(error.details) && (
            <ul className="mt-2">
              {error.details.map((d, i) => (
                <li key={i}>
                  <strong>Loc:</strong> {d.loc?.join(" → ") || "unknown"} <br />
                  <strong>Msg:</strong> {d.msg} <br />
                  <strong>Type:</strong> {d.type}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {result && (
        <div className="alert alert-success mt-3">
          <strong>Job ID:</strong> {result.id}
        </div>
      )}
    </div>
  );
}

export default PostSolve;
