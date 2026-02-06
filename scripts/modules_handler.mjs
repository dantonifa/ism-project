// scripts/modules_handler.mjs
import { fetchHtmlPartial } from "./fetch.mjs";
import { updateFooterContent } from "./utils.mjs"; // Import the exported function

export async function loadFooter() {
  // Target the placeholder div we defined in HTML
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) {
    console.error("Footer placeholder #footer-placeholder not found!");
    return;
  }

  try {
    const footerHTML = await fetchHtmlPartial("footer.html");
    // Insert the fetched HTML
    placeholder.innerHTML = footerHTML;

    // NOW that elements exist in the DOM, run the update function
    updateFooterContent(); 

  } catch (error) {
    placeholder.innerHTML = "<p>Error loading footer content.</p>";
  }
}
