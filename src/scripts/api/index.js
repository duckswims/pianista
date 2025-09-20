const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

/**
 * Generic API fetcher
 * @param {string} path - API endpoint path (e.g. "/", "/planners")
 * @param {Object} options - Fetch options (method, body, headers)
 */
export async function fetchApi(path = "/", options = {}) {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        ...options.headers, // merge instead of override
      },
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = { detail: response.statusText };
    }

    if (!response.ok) {
      let errorObj = {
        error: true,
        status: response.status,
        message: response.statusText,
      };

      // If validation error with structured details
      if (Array.isArray(data.detail)) {
        errorObj.details = data.detail;
      }
      // If generic error with string detail
      else if (typeof data.detail === "string") {
        errorObj.message = data.detail;
      }

      return errorObj;
    }


    // Successful response
    return data;
  } catch (err) {
    return {
      error: true,
      message: "Network Error. Please check your internet connection.",
      type: "NetworkError",
      detail: err?.message || null,
    };
  }
}
