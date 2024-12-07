'use server'

let nseCookies; // Store cookies here
const url_oc = "https://www.nseindia.com/"; // URL to get cookies
const apiUrl = "https://www.nseindia.com/api/ipo-current-issue"; // API URL
const headers = {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "https://www.nseindia.com/market-data/all-upcoming-issues-ipo"
};

/**
 * Fetches cookies from NSE and uses them to get API data.
 * Retries fetching cookies if a 403 error occurs.
 * @returns {Promise<any>} The API response data.
 */
export const getCookiesForNSE = async () => {
    try {
        console.log("getCookies =========> Fetching cookies...");
        const response = await fetch(url_oc, { headers });
        const cookies = response.headers.get('set-cookie');
        console.log("Cookies retrieved:", cookies);
        nseCookies = cookies;
        const nseResponse = await getAPIDataForNSE(nseCookies);
        console.log("NSE Response:", nseResponse);
        return nseResponse
    } catch (error:any) {
        if (error.status === 403) {
            console.log("getCookies =========> error.status === 403. Retrying...");
            await getCookiesForNSE(); // Retry on 403
        } else {
            console.log("getCookies =========> error", error.message);
        }
    }
};

/**
 * Fetches API data from NSE using the provided cookies.
 * Retries fetching cookies if a 401 error occurs.
 * @param {any} nseCookies - The cookies to be used for the API request.
 * @returns {Promise<any>} The API response data.
 */
const getAPIDataForNSE = async (nseCookies:any) => {
    try {
        console.log("Cookie inside method", nseCookies);
        const response = await fetch(apiUrl, {
            headers: { ...headers, Cookie: nseCookies }
        });
        const data = await response.json();
        console.log("got response", data);
        return data;
    } catch (error:any) {
        if (error.status === 401) {
            console.log("getAPIData =========> error.status === 401. Fetching cookies...");
            if (!nseCookies) {
                console.log("getAPIData =========> Cookie not found");
                await getCookiesForNSE(); // Fetch cookies
            }
        } else {
            console.log("getAPIData =========> error", error.message);
        }
    }
};


// getCookiesForNSE();