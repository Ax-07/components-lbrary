document.addEventListener("DOMContentLoaded", () => {
    // Simule une liste de données
    const data = [
      "Accueil",
      "Articles",
      "Contact",
      "Dashboard",
      "Documentation",
      "Forums",
      "Galerie",
      "Guides",
      "Images",
      "Profil",
      "Recherche avancée",
      "Support",
      "Tutoriels",
      "Utilisateurs",
    ];
  
    const searchInput = document.getElementById("search-input");
    const resultsList = document.getElementById("search-results");
  
    // Au focus, on affiche la liste si l'input n'est pas vide
    searchInput.addEventListener("focus", () => {
      if (searchInput.value.trim() !== "") {
        resultsList.style.display = "block";
      }
    });
  
    // Quand on tape au clavier
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      // Si pas de saisie, on masque la liste
      if (!query) {
        resultsList.innerHTML = "";
        resultsList.style.display = "none";
        return;
      }
  
      // Filtrage simple
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(query)
      );
  
      // Met à jour la liste
      updateResults(filtered);
    });
  
    // Masquer la liste si on clique en dehors
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        resultsList.style.display = "none";
      }
    });
  
    // Fonction d'affichage des résultats
    function updateResults(items) {
      // Vide la liste
      resultsList.innerHTML = "";
      if (items.length === 0) {
        // Aucun résultat
        const li = document.createElement("li");
        li.textContent = "Aucun résultat";
        li.style.color = "#999";
        resultsList.appendChild(li);
      } else {
        // Crée un <li> pour chaque item
        items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          li.addEventListener("click", () => {
            // Exemple : afficher le texte dans la console ou rediriger
            console.log("Vous avez cliqué sur :", item);
            // On renseigne l'input et ferme la liste
            searchInput.value = item;
            resultsList.style.display = "none";
          });
          resultsList.appendChild(li);
        });
      }
      // Affiche la liste
      resultsList.style.display = "block";
    }
  });
  