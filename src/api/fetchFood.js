const BASE = "https://world.openfoodfacts.org";

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
}

export async function fetchFood(query, pageSize = 10) {
    const q = encodeURIComponent(query);

    const url = `${BASE}/cgi/search.pl?search_terms=${q}&search_simple=1&json=1&page_size=${pageSize}`;
    return fetchJSON(url);
}