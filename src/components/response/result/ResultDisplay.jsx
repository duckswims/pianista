import React from "react";
import { formatKey } from "../../../scripts/helper/formatKey";

function renderValue(value, key) {
  // Skip empty/null values for certain keys
  if ((key === "generated_domain" || key === "generated_problem") && !value) {
    return null;
  }

  // Handle SVG string
  if (typeof value === "string" && value.trim().startsWith("<svg")) {
    return (
      <div
        className="d-flex justify-content-center my-2"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  // For other preformatted text results
  if (key === "generated_domain" || key === "generated_problem" || key === "conversion_result") {
    return <pre className="bg-light p-2 mt-1">{value}</pre>;
  }

  // For objects
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).map(([k, v]) => (
      <div key={k}>
        <strong>{formatKey(k)}:</strong> {renderValue(v, k)}
      </div>
    ));
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
          if (!rendered) return null;
          return (
            <div key={key} className="mb-2">
              <strong>{formatKey(key)}:</strong>{" "}
              {rendered}
            </div>
          );
        })}
      </div>
    </div>
  );
}
