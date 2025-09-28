import React from "react";
import { formatKey } from "../../scripts/helper/formatKey";

export default function ErrorDisplay({ error }) {
  if (!error) return null;

  const { status, message, details, invalid_responses } = error;
  console.log(error);

  // Helper to capitalize keys
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="alert alert-danger mt-3">
      <strong>Error {status || ""}:</strong> {message || "Validation error"}

      {/* Details */}
      {details && Array.isArray(details) && details.length > 0 && (
        <div className="mt-2">
          <strong>Details:</strong>
          {details.map((d, i) => (
            <div key={i} style={{ marginTop: "0.25rem", marginBottom: "0.5rem" }}>
              {Object.entries(d).map(([key, value]) => (
                <div key={key}>
                  <strong>{formatKey(key)}:</strong>{" "}
                  {typeof value === "object" ? JSON.stringify(value, null, 2) : value?.toString()}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Invalid responses */}
      {invalid_responses && Array.isArray(invalid_responses) && (
        <div className="mt-2">
          <strong>Invalid Responses:</strong>
          <pre>{JSON.stringify(invalid_responses, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
