document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("data-table");
    if (!table) return;
  
    // Sélectionne tous les th "sortable"
    const headers = table.querySelectorAll("th.sortable");
  
    // Écouteur sur chaque en-tête
    headers.forEach((th, index) => {
      th.addEventListener("click", () => {
        // Récupère le type de tri (string/number) via data-sort-type
        const sortType = th.dataset.sortType || "string";
  
        // Détermine l’ordre actuel (ascending/descending)
        const currentSort = th.getAttribute("aria-sort");
        let newSort = "ascending";
        if (currentSort === "ascending") {
          newSort = "descending";
        } else if (currentSort === "descending") {
          newSort = "ascending";
        }
  
        // Retire l’attribut aria-sort sur tous les th
        headers.forEach((h) => h.removeAttribute("aria-sort"));
        // Applique le nouveau tri sur le th cliqué
        th.setAttribute("aria-sort", newSort);
  
        // Tri des lignes
        sortTableByColumn(table, index, sortType, newSort === "ascending");
      });
    });
  
    /**
     * Tri des lignes d'un tableau selon la colonne et l'ordre donnés.
     * @param {HTMLTableElement} table - Le tableau à trier
     * @param {number} columnIndex - Index de la colonne
     * @param {string} type - "string" ou "number"
     * @param {boolean} ascending - true = tri ascendant
     */
    function sortTableByColumn(table, columnIndex, type, ascending) {
      const tBody = table.querySelector("tbody");
      if (!tBody) return;
  
      // Liste des <tr> sous forme de tableau
      const rowsArray = Array.from(tBody.querySelectorAll("tr"));
  
      rowsArray.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();
  
        // Conversion pour tri numérique vs alphabétique
        if (type === "number") {
          const numA = parseFloat(cellA) || 0;
          const numB = parseFloat(cellB) || 0;
          return ascending ? numA - numB : numB - numA;
        } else {
          // Tri alphabétique (localeCompare)
          return ascending
            ? cellA.localeCompare(cellB)
            : cellB.localeCompare(cellA);
        }
      });
  
      // On réinsère les lignes triées
      rowsArray.forEach((row) => tBody.appendChild(row));
    }
  });
  