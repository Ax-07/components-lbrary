// google-map.js
document.addEventListener("DOMContentLoaded", () => {
    const addressInput = document.getElementById("address-input");
    const searchBtn = document.getElementById("search-btn");
    const feedbackEl = document.getElementById("feedback");
    const googleMapIframe = document.getElementById("google-map-iframe");
  
    // Au clic sur "Rechercher"
    searchBtn.addEventListener("click", () => {
      const address = addressInput.value.trim();
      if (!address) {
        feedbackEl.textContent = "Veuillez saisir une adresse ou un lieu.";
        return;
      }
  
      feedbackEl.textContent = "Chargement de la carte...";
      googleMapIframe.src =
        "https://www.google.com/maps?q="
        + encodeURIComponent(address)
        + "&output=embed";
    });
  });
  