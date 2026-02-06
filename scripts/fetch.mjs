// fetch.mjs
export async function fetchHtmlPartial(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}
