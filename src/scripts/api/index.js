const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

/**
 * Generic API fetcher
 * @param {string} path - API endpoint path (e.g. "/", "/planners")
 * @param {Object} options - Fetch options (method, body, headers)
 * @returns {Promise<Object>} - Parsed JSON data or an error object
 */
export async function fetchApi(path = "/", options = {}) {
  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey,
        ...options.headers, // allow override
      },
    });

    // Try parsing JSON (fallback to empty object)
    const data = await response.json().catch(() => ({}));
    console.log("response:", data);

    // If response is not OK -> normalize error format
    if (!response.ok) {
      return {
        error: true,
        status: response.status,
        message: data.detail || response.statusText || "Unknown error",
        details: Array.isArray(data.detail) ? data.detail : undefined,
      };
    }


    return data;
  } catch (err) {
    // Network or fetch-level errors
    return {
      error: true,
      // type: "NetworkError",
      message: err?.message, //"Network error. Please check your connection.",
      detail: err?.message || null,
    };
  }
}
