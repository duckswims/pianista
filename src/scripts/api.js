const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

/**
 * Fetch data from the base API (no additional endpoint)
 */
export async function fetchApi() {
  try {
    const response = await fetch(baseUrl, {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey
      }
    });
    
    // HTTP error
    if (!response.ok) {
      return {
        error: response.status,
        message: `Error ${response.status}: ${response.statusText}. Please check if you have a valid API token.`,
      };
    }

    // Successful response
    const data = await response.json();
    return data;
  } catch (err) {
    // Network or other errors
    return {
        error: true, 
      message: "Network Error. Please check your internet connection.",
    };
  }
}
