document.addEventListener("DOMContentLoaded", () => {
    const progressContainer = document.getElementById("my-progress");
    const progressBar = document.getElementById("my-progress-bar");
    const goTo100Btn = document.getElementById("go-to-100");
    const resetBtn = document.getElementById("reset");
  
    let currentValue = 0;     // Valeur actuelle (0 -> 100)
    let intervalId = null;    // Pour stocker l'interval d'animation
  
    // Fonction utilitaire pour mettre à jour l'affichage
    function updateProgress(value) {
      // Mise à jour du style et du texte
      progressBar.style.width = value + "%";
      progressBar.textContent = value + "%";
  
      // Mise à jour des attributs ARIA
      progressContainer.setAttribute("aria-valuenow", value);
    }
  
    // Animation progressive de currentValue à targetValue
    function animateTo(targetValue) {
      // Si une animation est déjà en cours, on l'interrompt
      if (intervalId) clearInterval(intervalId);
  
      // Détermine si on augmente ou on diminue (au cas où)
      const step = targetValue > currentValue ? 1 : -1;
  
      intervalId = setInterval(() => {
        // On avance la valeur d'un pas
        currentValue += step;
  
        // Si on a atteint ou dépassé la cible, on arrête
        if ((step > 0 && currentValue >= targetValue) ||
            (step < 0 && currentValue <= targetValue)) {
          currentValue = targetValue; // Ajustement exact
          clearInterval(intervalId);
          intervalId = null;
        }
  
        // Mise à jour visuelle à chaque incrément
        updateProgress(currentValue);
      }, 20); // toutes les 20ms (ajustez la vitesse selon vos besoins)
    }
  
    // Bouton "Aller à 100%"
    goTo100Btn.addEventListener("click", () => {
      animateTo(100);
    });
  
    // Bouton "Réinitialiser"
    resetBtn.addEventListener("click", () => {
      animateTo(0);
    });
  
    // Initialisation à 0% (affichage correct au chargement)
    updateProgress(currentValue);
  });
  