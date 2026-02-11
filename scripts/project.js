// scripts/project.js
import { loadFooter } from "./modules_handler.mjs";
import { initializeFullCalendar } from "./calendarEvents.mjs";
import { getDates } from "./getdates.js"; // <-- AÑADE ESTA LÍNEA

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", async () => {
  const navLinks = document.querySelectorAll("#nav-container ul li a");

  // location.href obtiene la URL completa
  const currentUrl = window.location.href;

  navLinks.forEach((link) => {
    // link.href (sin getAttribute) devuelve la URL absoluta completa del enlace
    if (currentUrl === link.href) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ... rest of your code ...

  // --- Navigation Menu Logic ---
  const hamburgerButton = document.getElementById("menu");
  const navMenu = document.querySelector("#nav-container");
  hamburgerButton.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
    hamburgerButton.classList.toggle("open");
  });

  // --- Footer Loading Logic ---
  const footerContainer = document.getElementById("footer-placeholder");

  if (footerContainer) {
    await loadFooter(); // Esperamos a que cargue el HTML del footer
    getDates(); // ¡AHORA llamamos a getDates para que encuentre los IDs!
  } else {
    console.error("Footer placeholder #footer-placeholder not found!");
  }
  // --- Modal Logic ---
  const calendarModal = document.getElementById("calendarModal");
  const openCalendarBtn = document.getElementById("show-calendar-button");
  const closeCalendarBtn = document.getElementById("close-calendar-modal");

  let calendarInitialized = false;

  // Si los elementos existen, activamos la lógica. Si no, no pasa nada.
  if (openCalendarBtn && calendarModal && closeCalendarBtn) {
    openCalendarBtn.onclick = function () {
      calendarModal.style.display = "block";
      if (!calendarInitialized) {
        initializeFullCalendar("calendar-container");
        calendarInitialized = true;
      }
    };

    closeCalendarBtn.onclick = function () {
      calendarModal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == calendarModal) {
        calendarModal.style.display = "none";
      }
    };
  }
  // Eliminamos el bloque 'else' para que la consola esté 100% limpia

  /*Code to display books after clicking search button using Open Library API*/
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  // ADD THIS IF STATEMENT TO PREVENT CRASHING
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
        )
          .then((response) => response.json())
          .then((data) => {
            resultsContainer.innerHTML = "";
            const books = data.docs.slice(0, 10);
            books.forEach((book) => {
              const bookDiv = document.createElement("div");
              bookDiv.classList.add("book");
              const title = book.title || "No title available";
              const author = book.author_name
                ? book.author_name.join(", ")
                : "Unknown author";
              const firstPublishYear = book.first_publish_year || "N/A";
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
  }
  /*End of code to display books*/
  // --- Registration Form Logic ---
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault(); // stop default navigation

      const user = {
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        grade: document.getElementById("grade").value,
      };

      // Save to localStorage
      let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      users.push(user);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Update counter dynamically
      const formMessage = document.getElementById("formmessage");
      if (formMessage) {
        let counter = formMessage.querySelector(".user-count");
        if (!counter) {
          counter = document.createElement("p");
          counter.classList.add("user-count");
          formMessage.appendChild(counter);
        }
        counter.textContent = `Number of registered users: ${users.length}`;
      }

      // Redirect to thanks page if you want
      window.location.href = "thanks.html";
    });
  }
}); // This closes the DOMContentLoaded event listener
