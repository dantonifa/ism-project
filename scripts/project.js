/* JavaScript for Responsive Navigation Menu and Main App Logic */

// scripts/project.js
import { loadFooter } from "./modules_handler.mjs"; 
import { initializeFullCalendar } from "./calendarEvents.mjs"; 

// 1. Wait until the entire HTML document is loaded
document.addEventListener("DOMContentLoaded", async () => { // Make the function ASYNC

  // --- Navigation Menu Logic ---
  const hamburgerButton = document.getElementById("menu");
  const navMenu = document.querySelector("#nav-container");
  hamburgerButton.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
    hamburgerButton.classList.toggle("open");
  });

  // --- Footer Loading Logic ---
  // Await the loading of the footer before trying to use elements within it
  await loadFooter(); 

  // --- Modal Logic ---
  // Ensure these IDs match the HTML structure you added earlier for the modal
  const calendarModal = document.getElementById("calendarModal");
  const openCalendarBtn = document.getElementById("show-calendar-button");
  const closeCalendarBtn = document.getElementById("close-calendar-modal");
  
  let calendarInitialized = false; 

  if (openCalendarBtn && calendarModal && closeCalendarBtn) {
      // When the user clicks the open button, open the modal and load the calendar
      openCalendarBtn.onclick = function() {
          calendarModal.style.display = "block";
          
          if (!calendarInitialized) {
              // Load the calendar only the first time the modal is opened
              initializeFullCalendar('calendar-container'); // Use the ID of the div *inside* the modal
              calendarInitialized = true;
          }
      }

      // When the user clicks on the close button (x), close the modal
      closeCalendarBtn.onclick = function() {
          calendarModal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal content, close it
      window.onclick = function(event) {
          if (event.target == calendarModal) {
              calendarModal.style.display = "none";
          }
      }
  } else {
      console.error("Modal elements (button, modal, or close button) not found in the DOM.");
  }

/*Code to display books after clicking search button
using Open Library API*/
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        resultsContainer.innerHTML = "";
        const books = data.docs.slice(0, 10);
        books.forEach((book) => {
          const bookDiv = document.createElement("div");
          bookDiv.classList.add("book");
          const title = book.title ? book.title : "No title available";
          const author = book.author_name
            ? book.author_name.join(", ")
            : "Unknown author";
          const firstPublishYear = book.first_publish_year
            ? book.first_publish_year
            : "N/A";
          bookDiv.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Author(s):</strong> ${author}</p>
            <p><strong>First Publish Year:</strong> ${firstPublishYear}</p>
          `;
          resultsContainer.appendChild(bookDiv);
        });
      })
      .catch((error) => {
        resultsContainer.innerHTML =
          "<p>Error fetching data. Please try again later.</p>";
        console.error("Error fetching data:", error);
      });
  }
});
/*End of code to display books after clicking search button
using Open Library API*/

}); // Close the DOMContentLoaded event listener


