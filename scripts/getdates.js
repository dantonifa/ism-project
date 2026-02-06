// getdates.js
export function getDates() {
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModifiedSpan = document.getElementById("lastModified");
  if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;
}
