// scripts/modules_handler.mjs
import { fetchHtmlPartial } from "./fetch.mjs";
import { updateFooterContent } from "./utils.mjs"; // Import the exported function

// modules_handler.mjs
// modules_handler.mjs
export async function loadFooter() {
  const footerContainer = document.getElementById("footer-placeholder");

  try {
    const footerHTML = await fetchHtmlPartial("footer.html");
    footerContainer.innerHTML = footerHTML;

    // Use await here because updateFooterContent now fetches JSON
    await updateFooterContent();
  } catch (error) {
    footerContainer.innerHTML = "<p>Error loading footer content.</p>";
  }
}
