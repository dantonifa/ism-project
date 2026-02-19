import { loadFooter } from "./modules_handler.mjs";
import { initializeFullCalendar } from "./calendarEvents.mjs";
import { getDates } from "./getdates.js";

document.addEventListener("DOMContentLoaded", async () => {
  // --- 1. HERO FADE-IN LOGIC ---
  const heroSection = document.querySelector("main #hero");
  if (heroSection) {
    setTimeout(() => {
      heroSection.classList.add("loaded");
    }, 150);
  }

  // --- 2. NAVIGATION LOGIC ---
  const navLinks = document.querySelectorAll("#nav-container ul li a");
  const currentUrl = window.location.href;

  navLinks.forEach((link) => {
    if (currentUrl === link.href) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // --- 3. SCROLL ANIMATION LOGIC (H2 & Charts) ---
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Triggers for H2 (dramatic) and .chart-fade (slow)
        if (entry.target.classList.contains("chart-fade")) {
          entry.target.classList.add("chart-visible");
        } else {
          entry.target.classList.add("is-visible");
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe the specific H2
  const targetH2 = document.querySelector("main .card-1 #card-1-text h2");
  if (targetH2) observer.observe(targetH2);

  // Observe all elements with .chart-fade class
  const charts = document.querySelectorAll(".chart-fade");
  charts.forEach((chart) => observer.observe(chart));

  // --- 4. NAVIGATION MENU LOGIC ---
  const hamburgerButton = document.getElementById("menu");
  const navMenu = document.querySelector("#nav-container");
  if (hamburgerButton && navMenu) {
    hamburgerButton.addEventListener("click", () => {
      navMenu.classList.toggle("is-open");
      hamburgerButton.classList.toggle("open");
    });
  }

  // --- 5. FOOTER LOADING LOGIC ---
  const footerContainer = document.getElementById("footer-placeholder");
  if (footerContainer) {
    await loadFooter();
    getDates();
  }

  // --- 6. MODAL LOGIC ---
  const calendarModal = document.getElementById("calendarModal");
  const openCalendarBtn = document.getElementById("show-calendar-button");
  const closeCalendarBtn = document.getElementById("close-calendar-modal");
  let calendarInitialized = false;

  if (openCalendarBtn && calendarModal && closeCalendarBtn) {
    openCalendarBtn.onclick = function () {
      calendarModal.style.display = "block";
      if (!calendarInitialized) {
        initializeFullCalendar("calendar-container");
        calendarInitialized = true;
      }
    };
    closeCalendarBtn.onclick = () => (calendarModal.style.display = "none");
    window.onclick = (event) => {
      if (event.target == calendarModal) calendarModal.style.display = "none";
    };
  }

  // --- 7. OPEN LIBRARY API LOGIC ---
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

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
            data.docs.slice(0, 10).forEach((book) => {
              const bookDiv = document.createElement("div");
              bookDiv.classList.add("book");
              bookDiv.innerHTML = `
                <h3>${book.title || "No title"}</h3>
                <p><strong>Author:</strong> ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                <p><strong>Year:</strong> ${book.first_publish_year || "N/A"}</p>`;
              resultsContainer.appendChild(bookDiv);
            });
          })
          .catch((err) => {
            resultsContainer.innerHTML = "<p>Error fetching data.</p>";
            console.error(err);
          });
      }
    });
  }

  // --- 8. REGISTRATION FORM LOGIC ---
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = {
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        email: document.getElementById("email").value.trim(),
      };
      let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      users.push(user);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      window.location.href = "thanks.html";
    });
  }
}); // THIS IS THE ONLY CLOSING BRACE FOR DOMContentLoaded
