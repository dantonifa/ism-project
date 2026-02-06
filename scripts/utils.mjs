// scripts/utils.mjs (Renamed from getdates.js for clarity)

// Function to update dynamic dates and review count *after* insertion
export function updateFooterContent() {
    // 1. Update Current Year
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Update Last Modified Date
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified; 
    }
    
    // 3. Update Review Count from localStorage
    const reviewCountDisplay = document.getElementById("review-count");
    // Ensure we display whatever is in localStorage when the footer loads
    let reviewCounter = localStorage.getItem("reviewCounter") || 0; 
    if (reviewCountDisplay) {
        reviewCountDisplay.textContent = reviewCounter;
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
