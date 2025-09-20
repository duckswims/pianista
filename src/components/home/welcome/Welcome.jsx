import { useEffect, useState } from "react";
import { fetchApi } from "../../../scripts/api/index.js";
import { removeExtraWhitespaces } from "../../../scripts/functions.js";

function Welcome() {
  const [apiResult, setApiResult] = useState(null);

  // Get API Result
  useEffect(() => {
    async function getData() {
      const result = await fetchApi();
      setApiResult(result);
    }
    getData();
  }, []);

  // Determine what to display
  let displayMessage = "Loading...";
  if (apiResult) {
    displayMessage = removeExtraWhitespaces(apiResult.message);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <main>
        <h2>API Response</h2>
        <p style={{ color: apiResult?.error ? "red" : "black" }}>
          {displayMessage}
        </p>
      </main>
    </div>
  );
}

export default Welcome;
