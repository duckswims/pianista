import React from "react";
import { formatKey } from "../../../scripts/helper/formatKey";

function renderValue(value, key) {
  // Skip empty/null generated_domain or generated_problem
  if ((key === "generated_domain" || key === "generated_problem") && !value) {
    return null;
  }

  // For generated or converted result
  if (key === "generated_domain" || key === "generated_problem" || key === "conversion_result") {
    return <pre className="bg-light p-2 mt-1">{value}</pre>;
  }

  if (typeof value === "object" && value !== null) {
    return Object.entries(value)
      .map(([k, v]) => `${formatKey(k)}: ${renderValue(v, k)}`)
      .join(" | ");
  }

  return value?.toString();
}

export default function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="alert alert-success mt-3">
      <strong>Response Success!</strong>
      <div className="mt-2">
        {Object.entries(result).map(([key, value]) => {
          const rendered = renderValue(value, key);
          if (!rendered) return null; // skip if nothing to render
          return (
            <div key={key}>
              <strong>{formatKey(key)}:</strong>{" "}
              {rendered}
            </div>
          );
        })}
      </div>
    </div>
  );
}
