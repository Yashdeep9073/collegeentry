/**
 * UTM Tracking Module for Vue.js
 * 
 * Instructions:
 * 1. Copy this file to your Vue.js project (e.g., src/utils/utmTracking.js).
 * 2. In your main.js or App.vue (mounted hook), call `initUTMTracking()`.
 * 3. When submitting a form (e.g., in your LeadForm.vue), call `getUTMParams()` 
 *    and merge the result into your payload.
 */

const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content'
];

/**
 * Captures UTM parameters from the URL query string and stores them in localStorage.
 * Call this function once when the application initializes or when the router navigates.
 */
export function initUTMTracking() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let updated = false;

        UTM_KEYS.forEach(key => {
            const value = urlParams.get(key);
            if (value) {
                // Store existing value to localStorage
                localStorage.setItem(key, value);
                // Remove the parameter from the URL search params object
                urlParams.delete(key);
                updated = true;
            }
        });

        if (updated) {
            // Construct the clean URL
            const newSearch = urlParams.toString();
            const newRelativePathQuery = window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash;

            // Update the browser URL without reloading
            window.history.replaceState(window.history.state, '', newRelativePathQuery);

            console.log('UTM parameters captured and removed from URL:', getUTMParams());
        }
    } catch (error) {
        console.warn('Error capturing UTM parameters:', error);
    }
}

/**
 * Retrieves the stored UTM parameters as an object.
 * Keys are converted to camelCase to match the backend API expectation.
 * Example: { utmSource: 'google', utmMedium: 'cpc' }
 */
export function getUTMParams() {
    const params = {};

    UTM_KEYS.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            // Convert snake_case (utm_source) to camelCase (utmSource)
            const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            params[camelKey] = value;
        }
    });

    return params;
}

/**
 * Clears the stored UTM parameters from localStorage.
 * Useful if you want to reset tracking after a successful submission.
 */
export function clearUTMParams() {
    UTM_KEYS.forEach(key => {
        localStorage.removeItem(key);
    });
}
