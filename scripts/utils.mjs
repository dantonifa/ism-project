// scripts/utils.mjs (Renamed from getdates.js for clarity)

// Function to update dynamic dates and review count *after* insertion
// utils.mjs
export async function updateFooterContent() {
    try {
        // Fetch the JSON data
        const response = await fetch('data/school-info.json');
        const data = await response.json();

        // Target elements inside the footer.html partial
        const nameEl = document.querySelector("#footer-school-name");
        const addrEl = document.querySelector("#footer-address");

        if (nameEl) nameEl.textContent = data.schoolName;
        if (addrEl) addrEl.textContent = data.address;
        
    } catch (error) {
        console.error("Could not update footer from JSON:", error);
    }
}


// Function that should be triggered *only* on the review form submission page
export function incrementReviewCounter() {
    let reviewCounter = localStorage.getItem("reviewCounter");
    if (reviewCounter) {
        reviewCounter = parseInt(reviewCounter) + 1;
    } else {
        reviewCounter = 1;
    }
    localStorage.setItem("reviewCounter", reviewCounter);
    // Note: The display part happens in the updateFooterContent() function
}

// Keep your book search logic here as well if you want to use it elsewhere
// ... (Your Open Library API code for search button event listener) ...
