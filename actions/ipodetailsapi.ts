'use server'

let nseCookies; // Store cookies here
const url_oc = "https://www.nseindia.com/"; // URL to get cookies
const apiUrl = "https://www.nseindia.com/api/ipo-detail"; // API URL
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
export const getIPODetailsCookiesForNSE = async (symbol: string, series: string) => {
    try {
        console.log("getCookies IPO Details =========> Fetching cookies...");
        const response = await fetch(url_oc, { headers });
        const cookies = response.headers.get('set-cookie');
        console.log("Cookies retrieved IPO Details :", cookies);
        nseCookies = cookies;
        const nseResponse = await getIPODetailsDataForNSE(nseCookies, symbol, series);
        console.log("NSE Response IPO Details :", nseResponse);
        return nseResponse
    } catch (error:any) {
        if (error.status === 403) {
            console.log("getCookies IPO Details =========> error.status === 403. Retrying...");
            await getIPODetailsCookiesForNSE(symbol, series); // Retry on 403
        } else {
            console.log("getCookies IPO Details =========> error", error.message);
        }
    }
};

/**
 * Fetches API data from NSE using the provided cookies.
 * Retries fetching cookies if a 401 error occurs.
 * @param {any} nseCookies - The cookies to be used for the API request.
 * @returns {Promise<any>} The API response data.
 */
const getIPODetailsDataForNSE = async (nseCookies:any, symbol: string, series: string) => {
    try {
        const ipoDetailsUrl = `${apiUrl}?symbol=${symbol}&series=${series}`;
        console.log("ipo url IPO Details", ipoDetailsUrl);
        console.log("Cookie inside method IPO Details", nseCookies);
        const response = await fetch(ipoDetailsUrl, {
            headers: { ...headers, Cookie: nseCookies }
        });
        // console.log("response IPO Details text", await response.text());
        const data = await response.json();
        console.log("got response IPO Details", data);
        return data;
    } catch (error:any) {
        if (error.status === 401) {
            console.log("getAPIData IPO Details =========> error.status === 401. Fetching cookies...");
            if (!nseCookies) {
                console.log("getAPIData IPO Details =========> Cookie not found");
                await getIPODetailsCookiesForNSE(symbol, series); // Fetch cookies
            }
        } else {
            console.log("getAPIData IPO Details =========> error", error.message);
        }
    }
};


// getCookiesForNSE();